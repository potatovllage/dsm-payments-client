import { ChangeEvent, useCallback, useState } from "react";

const useValue = (defaultValue?: string) => {
  const [value, setValue] = useState<string>(defaultValue || "");

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  return { value, onChange };
};

export default useValue;
