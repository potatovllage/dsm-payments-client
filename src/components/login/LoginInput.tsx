import { InputHTMLAttributes, memo, RefObject } from "react";
import styled from "@emotion/styled";

type Props = {
  inputAttr: InputHTMLAttributes<HTMLInputElement>;
  inputRef: RefObject<HTMLLabelElement>;
  name: string;
};

const LoginInput = memo(({ inputAttr, name, inputRef }: Props) => {
  return (
    <InputWrap htmlFor={inputAttr.id} ref={inputRef}>
      <span>{name}</span>
      <input {...inputAttr} />
    </InputWrap>
  );
});

const InputWrap = styled.label`
  position: relative;
  display: block;
  width: 80%;
  max-width: 500px;
  margin-bottom: 30px;
  padding-top: 24px;
  border-bottom: 1px solid #e2e2e2;
  transition: all 300ms;
  &.error {
    border-bottom-color: #ff7272;
  }
  > span {
    position: absolute;
    top: 0;
    left: 0;
    color: #a6a5ac;
    font-size: 14px;
    font-weight: 500;
  }
  > input {
    width: 100%;
    border: 0;
    outline: none;
    &::placeholder {
      color: #e2e2e2;
    }
  }
`;

export default LoginInput;
