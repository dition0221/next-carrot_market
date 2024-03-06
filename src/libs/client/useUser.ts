import useSWR from "swr";
// INTERFACE
import type { User } from "@prisma/client";

/*
  로그인 사용자의 프로필을 가져오는 Hook (session storage로부터 가져옴)
  기본형 : const { user, isLoading } = useUser();
*/

export interface IUserResponse {
  ok: boolean;
  profile?: User;
  error?: string;
}

export default function useUser() {
  // Get user's profile from DB
  const { data, isLoading } = useSWR<IUserResponse>("/api/users/me");

  return { user: data?.profile, isLoading };
}
