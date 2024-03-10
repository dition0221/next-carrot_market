import { useState } from "react";
import useSWRInfinite from "swr/infinite";

/*
  Pagination 골조구조

  * 기본형 (Front-End)
  const { data, size, mutate, isLoading, getMoreFn }
    = usePagination<데이터제네릭>({
      url: 경로,
      idParams: 파라미터 | null,
      fallback?: 초기데이터,
    });

  - data: 데이터[]
  - size: [number] 현제 패이지
  - mutate
  - isLoading
  - getMoreFn : 다음 페이지로 넘어가는 함수 (onClick 등 사용)

  * 기본형 (Back-End)
  const { page } = req.query;
    if (typeof page !== "string")
      return res
        .status(400)
        .json({ ok: false, error: "Only one 'page' parameter is allowed" });
  const offset = +page;
  
  - DB에서 'take: 갯수, skip: offset * 갯수' 사용하기
*/

interface IUsePaginationProps {
  url: string;
  idParams: string | string[] | undefined | null;
  fallback?: any;
}

export default function usePagination<T>({
  url,
  idParams,
  fallback,
}: IUsePaginationProps) {
  const [isMoreEnd, setIsMoreEnd] = useState(false);

  const getKey = (pageIndex: number, prevData: T) => {
    // if 'ok: false', Reached the end
    if (prevData && (prevData as any).ok === false) {
      setIsMoreEnd(true);
      return null;
    }

    if (idParams === null) return `${url}`;
    return idParams ? `${url}?page=${pageIndex}` : null;
  };

  const { data, size, setSize, isLoading, isValidating, mutate } =
    useSWRInfinite<T>(getKey, fallback ? { fallback } : undefined);

  // pagination
  const getMoreFn = () => {
    if (isLoading || isValidating || isMoreEnd) return;
    setSize((prev) => prev + 1);
  };

  return {
    data,
    size,
    getMoreFn,
    mutate,
    isLoading: isLoading || isValidating,
  };
}
