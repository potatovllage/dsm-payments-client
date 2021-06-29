import { RefObject, useState } from "react";

const useMovePage = (divRef: RefObject<HTMLDivElement>, width: number) => {
  const [page, setPage] = useState<number>(1);

  const moveFirstPage = () => {
    setPage(1);
  };

  const moveSecondPage = () => {
    setPage(2);
  };

  const onClickMoveFirstPage = () => {
    if (!divRef.current) return;

    divRef.current.scrollTo({ left: -width, behavior: "smooth" });
  };

  const onClickMoveSecondPage = () => {
    if (!divRef.current) return;

    divRef.current.scrollTo({ left: width, behavior: "smooth" });
  };

  return {
    page,
    moveFirstPage,
    moveSecondPage,
    onClickMoveFirstPage,
    onClickMoveSecondPage,
  } as const;
};

export default useMovePage;
