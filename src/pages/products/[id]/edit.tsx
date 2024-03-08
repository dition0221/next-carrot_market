import { useEffect, useState } from "react";
import { getIronSession } from "iron-session";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
// LIBS
import useUser from "@/libs/client/useUser";
import useMutation from "@/libs/client/useMutation";
import { deleteImage, getImage } from "@/libs/client/utils";
import prismaClient from "@/libs/server/prismaClient";
import {
  type IIronSessionData,
  sessionOptions,
} from "@/libs/server/getSession";
// COMPONENTS
import FormErrorMessage from "@/components/form-error-msg";
import Button from "@/components/button";
import Textarea from "@/components/textarea";
import Input from "@/components/input";
import Image from "next/image";
import Layout from "@/components/layout";
// INTERFACE
import type { GetServerSideProps } from "next";
import type { IProductForm } from "@/pages/products/upload";
import type { ICloudflareUrl, IUploadImage } from "@/pages/api/files";
import type { IProductList } from "@/pages/api/products";

interface IEditProductProps {
  product: {
    id: number;
    userId: number;
    imageUrl: string | null;
    name: string;
    price: number;
    description: string;
  };
}

export default function EditProduct({ product }: IEditProductProps) {
  const { user } = useUser();

  const router = useRouter();
  const { id } = router.query;

  // <form>
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IProductForm>();

  // Default <form>
  useEffect(() => {
    setValue("name", product.name);
    setValue("price", product.price + "");
    setValue("description", product.description);
    if (product.imageUrl) setPhotoPreview(getImage(product.imageUrl, "public"));
  }, [product, setValue]);

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
  const [editProduct, { isLoading, data }] = useMutation<IProductList>(
    `/api/products/${id}`
  );
  const [isImgLoading, setIsImgLoading] = useState(false);
  const onValid = async ({ name, price, description, photo }: IProductForm) => {
    if (isLoading || isImgLoading) return;

    // If product image
    if (photo && photo.length > 0) {
      setIsImgLoading(true);

      try {
        // delete previous image in CF
        deleteImage(product.imageUrl);

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

        // Edit to DB
        return editProduct({
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

    return editProduct({ name, price, description });
  };

  // When finish, Go to 'product detail' page
  useEffect(() => {
    // Success
    if (data?.ok && data.product)
      router.replace(`/products/${data.product.id}`);

    // Fail: Error handling
    if (data?.ok === false && data.error) alert(data.error);
  }, [data, router]);

  return (
    <Layout title="상품 수정" canGoBack>
      <form className="px-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <div>
          <label className="relative w-full h-48 text-gray-600 hover:text-orange-500 flex justify-center items-center border-2 border-dashed border-gray-300 hover:border-orange-500 rounded-md cursor-pointer">
            {photoPreview ? (
              <Image
                src={photoPreview}
                alt="product image"
                className="object-contain bg-slate-200 rounded-md"
                fill={true}
              />
            ) : (
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
            )}
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

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  res,
}) => {
  try {
    const id = params?.id;
    if (typeof id !== "string")
      throw new Error("Only one dynamic params allowed");

    // session
    const { user } = await getIronSession<IIronSessionData>(
      req,
      res,
      sessionOptions
    );

    // GET 'product'
    const product = await prismaClient.product.findUnique({
      where: {
        id: +id,
      },
      select: {
        id: true,
        userId: true,
        imageUrl: true,
        name: true,
        price: true,
        description: true,
      },
    });
    if (!product) throw new Error("Not found product");
    if (user?.id !== product.userId) throw new Error("No authorization");

    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
