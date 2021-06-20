import { useCallback, useState } from "react";

const useToggle = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const onToggle = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);

  return { toggle, onToggle } as const;
};

export default useToggle;
