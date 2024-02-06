import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
// INTERFACE
import type { User } from "@prisma/client";

/*
  로그인 사용자의 프로필을 가져오는 Hook (session storage로부터 가져옴)
  기본형 : const { user, isLoading } = useUser();
  - 로그인 사용자 -> 사용자 정보를 가져옴
  - 비로그인 사용자 -> 로그인페이지로 redirect
*/

interface IUserResponse {
  ok: boolean;
  profile?: User;
  error?: string;
}

export default function useUser() {
  const router = useRouter();

  // If no-login, Redirect to "/enter"
  const { data, isLoading } = useSWR<IUserResponse>("/api/users/me");
  useEffect(() => {
    if (data && !data.ok && router.pathname !== "/enter")
      router.replace("/enter");
    if (data?.ok && router.pathname === "/enter") router.replace("/profile");
  }, [data, router]);

  return { user: data?.profile, isLoading };
}
