import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/router";
// LIBS
import useMutation from "@/libs/client/useMutation";
import useCoords from "@/libs/client/useCoords";
// COMPONENTS
import Button from "@/components/button";
import Layout from "@/components/layout";
import Textarea from "@/components/textarea";
import FormErrorMessage from "@/components/form-error-msg";
// INTERFACE
import type { Post } from "@prisma/client";

interface IWriteForm {
  question: string;
}

interface IWriteResponse {
  ok: boolean;
  post?: Post;
  error?: any;
}

export default function CommunityWrite() {
  const router = useRouter();
  const { latitude, longitude } = useCoords();

  // <form>
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IWriteForm>();

  // Submit form
  const [post, { data, isLoading }] = useMutation<IWriteResponse>("/api/posts");
  const onValid = (formData: IWriteForm) => {
    if (isLoading) return alert("로딩 중 입니다.");
    post({ ...formData, latitude, longitude }); // DB
  };

  // Succeed post => Go this post
  useEffect(() => {
    if (data?.post) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data?.post, router]);

  return (
    <Layout title="질문 등록하기" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="px-4 space-y-4">
        <Textarea
          name="question"
          label="Question"
          register={register("question", {
            required: "질문을 적어주세요.",
            minLength: {
              value: 5,
              message: "질문을 5자 이상 적어주세요.",
            },
          })}
          placeholder="Ask a question!"
          required
        />
        <Button text={isLoading ? "Loading.." : "Submit"} full />
      </form>

      {errors.question?.message ? (
        <FormErrorMessage text={errors.question.message} />
      ) : null}
    </Layout>
  );
}
