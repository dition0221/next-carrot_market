import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
// INTERFACE
import type { IUserResponse } from "@/pages/api/users/me";

/*
  로그인 사용자의 프로필을 가져오는 Hook (session storage로부터 가져옴)
  기본형 : const 변수명 = useUser();
  - 로그인 사용자 -> 사용자 정보를 가져옴
  - 비로그인 사용자 -> 로그인페이지로 redirect
*/

export default function useUser() {
  const router = useRouter();
  const { data, isLoading } = useSWR<IUserResponse>("/api/users/me");

  // If no-login, Redirect to "/enter"
  useEffect(() => {
    if (data && !data.ok) router.replace("/enter");
  }, [data, router]);

  return { user: data?.profile, isLoading };
}
