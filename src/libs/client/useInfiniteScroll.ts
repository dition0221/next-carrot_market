import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";

/*
  무한 스크롤: 데이터를 불러옴
  기본형 : const { data, ref, isLoading } - useInfiniteScroll<DATA제네릭>(URL주소);
  - data : 데이터[] | undefined
  - ref : 참조 요소의 ref 프로퍼티값 (해당 요소가 화면에 보이면, 동작 실행)
  - isLoading : 로딩여부

  <section>
    {데이터.map() ......}
    {isLoading ? <div>Loading..</div> : null}
    <div ref={ref} />
  </section>
*/

export default function useInfiniteScroll<T = any>(url: string) {
  const [isCanScroll, setIsCanScroll] = useState(false);

  // Prevent duplicate runs at the first time
  useEffect(() => {
    setTimeout(() => setIsCanScroll(true), 1000);
  }, []);

  // Fetch data
  const getKey = (pageIndex: number, prevData: T) => {
    if (prevData && !(prevData as any).ok) {
      return null; // if 'ok: false', Reached the end
    }
    return `${url}?page=${pageIndex}`;
  };
  const { data, setSize, isLoading, isValidating } = useSWRInfinite<T>(getKey);

  // Scroll fn.
  const { ref, inView } = useInView(); // Watch viewport
  useEffect(() => {
    if (inView && !isLoading && !isValidating && isCanScroll) {
      setIsCanScroll(false);
      setSize((prev) => prev + 1);
      setTimeout(() => setIsCanScroll(true), 1000); // Prevent duplicate runs
    }
  }, [inView, isLoading, isValidating, isCanScroll, setSize]);

  return { data, ref, isLoading: isLoading || isValidating };
}
