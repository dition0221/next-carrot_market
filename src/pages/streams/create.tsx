import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/router";
// LIBS
import useMutation from "@/libs/client/useMutation";
// COMPONENTS
import Layout from "@/components/layout";
import Input from "@/components/input";
import Button from "@/components/button";
import Textarea from "@/components/textarea";
import FormErrorMessage from "@/components/form-error-msg";
// INTERFACE
import type { Stream } from "@prisma/client";

export interface ICreateLiveForm {
  name: string;
  price: number;
  description: string;
}

interface ICreateLiveResponse {
  ok: boolean;
  stream?: Stream;
  error?: string;
}

export default function CreateStream() {
  const router = useRouter();

  // <form>
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateLiveForm>();

  // Submit form
  const [createLive, { data, isLoading }] =
    useMutation<ICreateLiveResponse>("/api/streams");
  const onValid = (formData: ICreateLiveForm) => {
    if (isLoading) return;
    createLive(formData); // DB
  };

  // Success: push to streaming page
  useEffect(() => {
    if (data?.ok) {
      router.replace(`/streams/${data.stream?.id}`);
    }
  }, [data?.ok, data?.stream?.id, router]);

  return (
    <Layout title="라이브 시작하기" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="px-4 space-y-4">
        <Input
          register={register("name", { required: "라이브 제목이 필요합니다." })}
          name="name"
          label="Name"
          type="text"
          required={false}
        />
        <Input
          register={register("price", {
            required: "가격이 필요합니다.",
            valueAsNumber: true,
          })}
          name="price"
          label="Price"
          type="number"
          placeholder="0.00"
          kind="price"
          required={false}
        />
        <Textarea
          register={register("description", { required: "설명이 필요합니다." })}
          name="description"
          label="Description"
          required={false}
        />

        {/* Form errors */}
        {errors.name?.message ? (
          <FormErrorMessage text={errors.name.message} />
        ) : null}
        {errors.price?.message ? (
          <FormErrorMessage text={errors.price.message} />
        ) : null}
        {errors.description?.message ? (
          <FormErrorMessage text={errors.description.message} />
        ) : null}

        <Button text={isLoading ? "Loading.." : "Go Live"} full />
      </form>
    </Layout>
  );
}
