import Image from "next/image";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// LIBS
import useUser from "@/libs/client/useUser";
import useMutation from "@/libs/client/useMutation";
import { deleteImage, getImage } from "@/libs/client/utils";
// COMPONENTS
import Layout from "@/components/layout";
import Input from "@/components/input";
import Button from "@/components/button";
import FormErrorMessage from "@/components/form-error-msg";
// INTERFACE
import type { IResponseType } from "@/libs/server/withHandler";
import type { ICloudflareUrl, IUploadImage } from "@/pages/api/files";

interface IEditProfileForm {
  avatar?: FileList;
  name: string;
  email?: string;
  phone?: string;
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
    watch,
  } = useForm<IEditProfileForm>({
    mode: "onBlur",
  });

  // Default <form>
  useEffect(() => {
    setValue("name", user?.name!);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
    if (user?.avatar) setAvatarPreview(getImage(user.avatar, "avatar"));
  }, [setValue, user]);

  // Change avatar image
  const [avatarPreview, setAvatarPreview] = useState("");
  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  // Submit <form>
  const [editProfile, { data, isLoading: isEditLoading }] =
    useMutation<IResponseType>("/api/users/me");
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const isLoading = isEditLoading || isAvatarLoading;
  const onValid = async ({ name, email, phone, avatar }: IEditProfileForm) => {
    // Error handling
    if (isLoading) return;
    if (email === "" && phone === "")
      return setError("root", {
        message: "Please write an email or phone number",
      });

    // If avatar changed
    if (avatar && avatar.length > 0 && user?.id) {
      setIsAvatarLoading(true);

      try {
        // Delete previous image
        await deleteImage(user.avatar);

        // Ask for CF URL
        const cloudflareUrl = (await (
          await fetch("/api/files")
        ).json()) as ICloudflareUrl;
        if (!cloudflareUrl.ok) throw new Error();

        // Upload avatar file to Cloudflare
        const form = new FormData();
        form.append("file", avatar[0], `/users/${user.id}`);
        const uploadAvatar = (await (
          await fetch(cloudflareUrl.url!, {
            method: "POST",
            body: form,
          })
        ).json()) as IUploadImage;
        if (!uploadAvatar.success) throw new Error();

        // Upload to DB
        return await editProfile({
          name,
          email,
          phone,
          avatarId: uploadAvatar.result?.id!,
        });
      } catch (error) {
        return alert("Fail to upload avatar image");
      } finally {
        setIsAvatarLoading(false);
      }
    }

    await editProfile({ name, email, phone });
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
    <Layout canGoBack title="프로필 수정" seo="Edit profile">
      <form onSubmit={handleSubmit(onValid)} className="px-4 space-y-4">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <Image
              src={avatarPreview}
              alt="avatar image"
              className="w-14 h-14 rounded-full"
              width={56}
              height={56}
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-500" />
          )}
          <label
            htmlFor="avatar"
            className="py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 cursor-pointer"
          >
            Change
            <input
              {...register("avatar", {
                validate: {
                  isImage: (value) =>
                    value?.[0]
                      ? value[0].type.includes("image") || "Image file only"
                      : true,
                },
              })}
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>
        <Input
          register={register("name", {
            required: "Name is required",
            maxLength: {
              value: 12,
              message: "Name is less than 12 characters",
            },
            validate: {
              isAdmin: (value) =>
                !value.toLowerCase().includes("admin") ||
                "You can't use name 'admin'",
            },
          })}
          name="name"
          label="Name"
          type="text"
          required
          maxLength={12}
        />
        <Input
          register={register("email", {
            validate: {
              allowAddress: (value) =>
                value
                  ? /^[A-Za-z0-9._%+-]+@naver\.com$/.test(value) ||
                    /^[A-Za-z0-9._%+-]+@daum\.net$/.test(value) ||
                    /^[A-Za-z0-9._%+-]+@hanmail\.net$/.test(value) ||
                    /^[A-Za-z0-9._%+-]+@kakao\.com$/.test(value) ||
                    "It is not allowed email address"
                  : true,
            },
          })}
          name="email"
          label="Email address"
          type="email"
          required={false}
        />
        <Input
          register={register("phone", {
            pattern: {
              value: /^010+\d{8}$/,
              message: "Only allow 11 numbers of phone",
            },
          })}
          name="phone"
          label="Phone number"
          type="number"
          kind="phone"
          required={false}
        />

        {/* Form Error */}
        {errors.avatar?.message ? (
          <FormErrorMessage text={errors.avatar.message} />
        ) : null}
        {errors.name?.message ? (
          <FormErrorMessage text={errors.name.message} />
        ) : null}
        {errors.email?.message ? (
          <FormErrorMessage text={errors.email.message} />
        ) : null}
        {errors.phone?.message ? (
          <FormErrorMessage text={errors.phone.message} />
        ) : null}
        {errors.root?.message ? (
          <FormErrorMessage text={errors.root.message} />
        ) : null}

        <Button text={isLoading ? "Loading.." : "Update profile"} full />
      </form>
    </Layout>
  );
}
