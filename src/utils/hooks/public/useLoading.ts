import { useCallback, useState } from "react";

const useLoading = (defaultValue?: boolean) => {
  const [loading, setLoading] = useState<boolean>(defaultValue || false);

  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const endLoading = useCallback(() => {
    setLoading(false);
  }, []);

  return { loading, startLoading, endLoading } as const;
};

export default useLoading;
