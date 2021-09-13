import { ChangeEvent, useEffect, useState } from 'react';

export const useFormInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  },[initialValue]);
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }
  const handleReset = () => {
    setValue("");
  }
  return {
    value,
    onChange: handleChange,
    onReset: handleReset
  };
}