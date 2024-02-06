import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
// LIBS
import useMutation from "@/libs/client/useMutation";
import type { IProductList } from "@/pages/api/products";
// COMPONENTS
import Layout from "@/components/layout";
import Input from "@/components/input";
import Textarea from "@/components/textarea";
import Button from "@/components/button";

export interface IProductUploadForm {
  // TODO: Add 'image'
  name: string;
  price: string;
  description: string;
}

export default function ProductUpload() {
  const router = useRouter();
  const [uploadProduct, { isLoading, data }] =
    useMutation<IProductList>("/api/products");

  // <form>
  const { register, handleSubmit } = useForm<IProductUploadForm>();
  const onValid = (data: IProductUploadForm) => {
    if (isLoading) return alert("로딩 중 입니다.");
    uploadProduct(data);
  };

  // When finish uploading, Go to 'product detail' page
  useEffect(() => {
    if (data?.ok && data.product) {
      router.push(`/products/${data.product.id}`);
    }
  }, [data, router]);

  return (
    <Layout title="상품 등록" canGoBack>
      <form className="px-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <div>
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
            <input className="hidden" type="file" />
          </label>
        </div>
        <Input
          register={register("name", { required: true })}
          name="name"
          label="Name"
          type="text"
          required
          placeholder="Name"
        />
        <Input
          register={register("price", { required: true, min: 0 })}
          kind="price"
          name="price"
          label="Price"
          type="number"
          placeholder="0.00"
          required
        />
        <Textarea
          register={register("description", { required: true })}
          name="description"
          label="Description"
          required
        />
        <Button text={isLoading ? "Loading.." : "Upload item"} full />
      </form>
    </Layout>
  );
}
