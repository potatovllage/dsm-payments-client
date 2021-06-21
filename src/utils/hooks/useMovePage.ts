import { RefObject, useEffect, useState } from "react";

const useMovePage = (divRef: RefObject<HTMLDivElement>, width: number) => {
  const [page, setPage] = useState<number>(1);

  const moveFirstPage = () => {
    setPage(1);
  };

  const moveSecondPage = () => {
    setPage(2);
  };

  useEffect(() => {
    if (!divRef.current) return;

    if (page === 1) {
      divRef.current.scrollTo({ left: -width, behavior: "smooth" });
    } else if (page === 2) {
      divRef.current.scrollTo({ left: width, behavior: "smooth" });
    } else {
      throw Error("page is not matched");
    }
  }, [page]);

  return { page, moveFirstPage, moveSecondPage } as const;
};

export default useMovePage;
