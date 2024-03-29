import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Head from "next/head";
// LIBS
import { cls } from "@/libs/client/utils";
import useMutation from "@/libs/client/useMutation";
// COMPONENTS
import Button from "@/components/button";
import Input from "@/components/input";
import FormErrorMessage from "@/components/form-error-msg";
// INTERFACE
import type { IResponseType } from "@/libs/server/withHandler";

export interface IEnterForm {
  email?: string;
  phone?: string;
}

interface ITokenForm {
  token: number;
}

interface IEnterRes {
  ok: boolean;
  email?: string;
  phone?: string;
}

export default function Enter() {
  const router = useRouter();

  // Log-in <form>
  const [enter, { isLoading, data, error }] =
    useMutation<IEnterRes>("/api/users/enter");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IEnterForm>();
  const onValid = async (validForm: IEnterForm) => {
    if (isLoading) return alert("로딩 중 입니다.");
    if (validForm.phone) return alert("휴대폰은 개발 중 입니다.");

    await enter(validForm); // Send form data to Back-End
    alert(`${validForm.email}로 토큰 메일이 발송되었습니다.`);
    reset();
  };

  // Change login method
  const [method, setMethod] = useState<"email" | "phone">("email");
  const onEmailClick = () => {
    reset();
    setMethod("email");
  };
  const onPhoneClick = () => {
    reset();
    setMethod("phone");
  };

  // Token <form>
  const [confirmToken, { isLoading: isTokenLoading, data: tokenData }] =
    useMutation<IResponseType>("/api/users/confirm");
  const {
    register: tokenRegister,
    handleSubmit: tokenHandleSubmit,
    reset: tokenReset,
    formState: { errors: tokenErrors },
  } = useForm<ITokenForm>();
  const onTokenValid = async ({ token }: ITokenForm) => {
    if (isTokenLoading) return;
    await confirmToken({ token, ...data });
    tokenReset();
  };
  useEffect(() => {
    if (tokenData?.ok) router.push("/");
    if (tokenData?.ok === false) return alert(tokenData.error);
  }, [tokenData, router]);

  // ! Social login
  const onSocialLogin = () => alert("Preparing..");

  return (
    <main className="mt-16 px-4">
      <Head>
        <title>Enter | Carrot-Market</title>
      </Head>

      <h3 className="text-3xl font-bold text-center mb-8">Enter to Carrot</h3>
      {data?.ok ? (
        <form
          onSubmit={tokenHandleSubmit(onTokenValid)}
          className="flex flex-col mt-8 space-y-4"
        >
          <Input
            register={tokenRegister("token", {
              required: true,
              pattern: { value: /^\d+$/, message: "" },
            })}
            name="token"
            label="Confirmation Token"
            type="number"
            required
          />
          <Button text={isTokenLoading ? "Loading.." : "Confirm token"} />
        </form>
      ) : (
        <>
          <section className="flex flex-col items-center">
            <h5 className="text-sm text-gray-500 font-medium">Enter using:</h5>
            <div className="grid border-b w-full mt-8 grid-cols-2 gap-16">
              <button
                className={cls(
                  "py-2 font-medium border-b-2",
                  method === "email"
                    ? "border-orange-500 text-orange-400"
                    : "border-transparent text-gray-500"
                )}
                onClick={onEmailClick}
              >
                Email
              </button>
              <button
                className={cls(
                  "py-2 font-medium border-b-2",
                  method === "phone"
                    ? "border-orange-500 text-orange-400"
                    : "border-transparent text-gray-500"
                )}
                onClick={onPhoneClick}
              >
                Phone
              </button>
            </div>
          </section>

          <form
            onSubmit={handleSubmit(onValid)}
            className="flex flex-col mt-8 space-y-4"
          >
            {method === "email" ? (
              <Input
                register={register("email", {
                  required: true,
                  validate: {
                    allowAddress: (value) =>
                      /^[A-Za-z0-9._%+-]+@naver\.com$/.test(value ?? "") ||
                      /^[A-Za-z0-9._%+-]+@daum\.net$/.test(value ?? "") ||
                      /^[A-Za-z0-9._%+-]+@hanmail\.net$/.test(value ?? "") ||
                      /^[A-Za-z0-9._%+-]+@kakao\.com$/.test(value ?? "") ||
                      "It is not allowed email address",
                  },
                })}
                name="email"
                label="Email address"
                type="email"
                required
              />
            ) : null}
            {method === "phone" ? (
              <Input
                register={register("phone", {
                  required: true,
                  pattern: {
                    value: /^010+\d{8}$/,
                    message: "Only allow 11 numbers of phone",
                  },
                })}
                name="phone"
                label="Phone number"
                type="number"
                kind="phone"
                required
              />
            ) : null}
            {method === "email" ? (
              <Button text={isLoading ? "Loading.." : "Get login link"} />
            ) : null}
            {method === "phone" ? (
              <Button
                text={isLoading ? "Loading.." : "Get one-time password"}
              />
            ) : null}

            {/* form error */}
            {errors.email?.message ? (
              <FormErrorMessage text={errors.email.message} />
            ) : null}
            {errors.phone?.message ? (
              <FormErrorMessage text={errors.phone.message} />
            ) : null}
            {tokenErrors.token?.message ? (
              <FormErrorMessage text={tokenErrors.token.message} />
            ) : null}
          </form>
        </>
      )}

      {/* Social Log-in */}
      <section className="mt-8">
        <div className="relative">
          <div className="absolute w-full border-t border-gray-300" />
          <div className="relative -top-3 text-center">
            <span className="bg-white px-2 text-sm text-gray-500">
              Or enter with
            </span>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <button
            onClick={onSocialLogin}
            className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </button>
          <button
            onClick={onSocialLogin}
            className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </section>
    </main>
  );
}
