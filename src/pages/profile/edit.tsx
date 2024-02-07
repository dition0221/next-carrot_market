import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/router";
// LIBS
import useUser from "@/libs/client/useUser";
import useMutation from "@/libs/client/useMutation";
// COMPONENTS
import Layout from "@/components/layout";
import Input from "@/components/input";
import Button from "@/components/button";
import FormErrorMessage from "@/components/form-error-msg";

export interface IEditProfileForm {
  name: string;
  email?: string;
  phone?: string;
}

interface IEditProfileResponse {
  ok: boolean;
  error?: string;
}

export default function EditProfile() {
  const router = useRouter();
  const { user } = useUser();

  // <form>
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IEditProfileForm>();
  useEffect(() => {
    setValue("name", user?.name!);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
  }, [setValue, user]);

  // Submit form
  const [editProfile, { data, isLoading }] =
    useMutation<IEditProfileResponse>("/api/users/me");
  const onValid = ({ name, email, phone }: IEditProfileForm) => {
    if (isLoading) return;
    if (email === "" && phone === "")
      return setError("root", {
        message: "이메일 또는 휴대폰 번호를 적어주세요.",
      });

    editProfile({ name, email, phone });
  };

  // Success: Redirect to profile-page
  useEffect(() => {
    if (data?.ok) router.push("/profile");
  }, [data?.ok, router]);

  // Error: Check duplication of email or phone
  useEffect(() => {
    if (data && !data.ok && data.error)
      setError("root", { message: data.error });
  }, [data, setError]);

  return (
    <Layout canGoBack title="프로필 수정">
      <form onSubmit={handleSubmit(onValid)} className="px-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 cursor-pointer"
          >
            Change
            <input
              id="picture"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>
        <Input
          register={register("name", {
            required: "name은 필수 입력 사항입니다.",
            maxLength: {
              value: 12,
              message: "name은 12자 이내로 작성해야 합니다.",
            },
          })}
          name="name"
          label="Name"
          type="text"
          required
          maxLength={12}
        />
        <Input
          register={register("email")}
          name="email"
          label="Email address"
          type="email"
          required={false}
        />
        <Input
          register={register("phone")}
          name="phone"
          label="Phone number"
          type="number"
          kind="phone"
          required={false}
        />

        {/* Form Error */}
        {errors.name?.message ? (
          <FormErrorMessage text={errors.name.message} />
        ) : null}
        {errors.root?.message ? (
          <FormErrorMessage text={errors.root.message} />
        ) : null}

        <Button text={isLoading ? "Loading.." : "Update profile"} full />
      </form>
    </Layout>
  );
}
