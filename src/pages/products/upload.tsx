import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// LIBS
import useMutation from "@/libs/client/useMutation";
// COMPONENTS
import Layout from "@/components/layout";
import Input from "@/components/input";
import Textarea from "@/components/textarea";
import Button from "@/components/button";
import FormErrorMessage from "@/components/form-error-msg";
// INTERFACE
import type { IProductList } from "@/pages/api/products";
import type { ICloudflareUrl, IUploadImage } from "@/pages/api/files";
import useUser from "@/libs/client/useUser";

export interface IProductForm {
  photo?: FileList;
  name: string;
  price: string;
  description: string;
}

export default function ProductUpload() {
  const router = useRouter();
  const { user } = useUser();

  // <form>
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IProductForm>();

  // Change product's photo
  const [photoPreview, setPhotoPreview] = useState("");
  const photo = watch("photo");
  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  }, [photo]);

  // Submit form
  const [uploadProduct, { isLoading, data }] =
    useMutation<IProductList>("/api/products");
  const [isImgLoading, setIsImgLoading] = useState(false);
  const onValid = async ({ name, price, description, photo }: IProductForm) => {
    if (isLoading || isImgLoading) return;

    // If product image
    if (photo && photo.length > 0) {
      setIsImgLoading(true);

      try {
        // Ask for CF URL
        const cloudflareUrl = (await (
          await fetch("/api/files")
        ).json()) as ICloudflareUrl;
        if (!cloudflareUrl.ok) throw new Error();

        // Upload image file to Cloudflare
        const form = new FormData();
        form.append("file", photo[0], `/products/userId_${user?.id}/${name}`);
        const uploadImage = (await (
          await fetch(cloudflareUrl.url!, {
            method: "POST",
            body: form,
          })
        ).json()) as IUploadImage;
        if (!uploadImage.success) throw new Error();

        // Upload to DB
        return await uploadProduct({
          name,
          price,
          description,
          photoId: uploadImage.result?.id!,
        });
      } catch (error) {
        return alert("Fail to upload product image");
      } finally {
        setIsImgLoading(false);
      }
    }

    await uploadProduct({ name, price, description });
  };

  // When finish uploading, Go to 'product detail' page
  useEffect(() => {
    if (data?.ok && data.product) {
      router.replace(`/products/${data.product.id}`);
    }
  }, [data, router]);

  return (
    <Layout title="상품 등록" canGoBack seo="Upload product">
      <form className="px-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <div>
          {photoPreview ? (
            <div className="relative w-full h-48">
              <Image
                src={photoPreview}
                alt="product image"
                className="object-contain bg-slate-200 rounded-md"
                fill={true}
              />
            </div>
          ) : (
            <label className="w-full h-48 text-gray-600 hover:text-orange-500 flex justify-center items-center border-2 border-dashed border-gray-300 hover:border-orange-500 rounded-md cursor-pointer">
              <svg
                className="h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                {...register("photo", {
                  validate: {
                    isImage: (value) =>
                      value?.[0]
                        ? value[0].type.includes("image") || "Image file only"
                        : true,
                  },
                })}
                className="hidden"
                type="file"
                accept="image/*"
              />
            </label>
          )}
        </div>
        <Input
          register={register("name", {
            required: "Product's name is required",
            maxLength: {
              value: 50,
              message: "Product's name is less than 50 characters",
            },
          })}
          name="name"
          label="Name"
          type="text"
          placeholder="Name"
          required
          maxLength={50}
        />
        <Input
          register={register("price", {
            required: "Price is required",
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Price can be from 0",
            },
          })}
          kind="price"
          name="price"
          label="Price"
          type="number"
          placeholder="0.00"
          required
        />
        <Textarea
          register={register("description", {
            required: "Description is required",
            maxLength: {
              value: 1000,
              message: "Description is less than 1000 characters",
            },
          })}
          name="description"
          label="Description"
          required
          maxLength={1000}
        />

        {/* Form Error */}
        {errors.photo?.message ? (
          <FormErrorMessage text={errors.photo.message} />
        ) : null}
        {errors.name?.message ? (
          <FormErrorMessage text={errors.name.message} />
        ) : null}
        {errors.price?.message ? (
          <FormErrorMessage text={errors.price.message} />
        ) : null}
        {errors.description?.message ? (
          <FormErrorMessage text={errors.description.message} />
        ) : null}

        <Button
          text={isLoading || isImgLoading ? "Loading.." : "Upload item"}
          full
        />
      </form>
    </Layout>
  );
}
