import { useState } from "react";

interface IUseMutationState<T> {
  isLoading: boolean;
  data?: T;
  error?: object;
}
type UseMutationResult<T> = [(data: any) => void, IUseMutationState<T>];

/*
  <form>의 데이터를 Back-End로 POST하는 Hook
  기본형 : const [mutation, { isLoading, data, error }] = useMutation(API_ROUTE_URL);
*/

export default function useMutation<T = object>(
  url: string
): UseMutationResult<T> {
  // state
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);

  // POST fetch fn.
  async function enter(data: any) {
    setIsLoading(true);
    try {
      const json = await (
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
      ).json();
      setData(json);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return [enter, { isLoading, data, error }];
}
