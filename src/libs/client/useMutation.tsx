import { useState } from "react";

interface IUseMutationState {
  isLoading: boolean;
  data?: object;
  error?: object;
}
type UseMutationResult = [(data: any) => void, IUseMutationState];

/*
  - <form>의 데이터를 Back-End로 POST하는 Hook
  - 사용법 : const [mutation, { loading, data, error }] = useMutation(API_ROUTE_URL);
*/

export default function useMutation(url: string): UseMutationResult {
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
