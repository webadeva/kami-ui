import { forwardRef, Ref } from "react";
import { ButtonWrapper } from "./styles";
import { ButtonProps } from "./types";

const ButtonWithoutRef = (
  { children, type = "button", ...props }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) => {
  return (
    <ButtonWrapper type={type} ref={ref} {...props}>
      {children}
    </ButtonWrapper>
  );
};

const Button = forwardRef(ButtonWithoutRef);
export default Button;

export type * from "./types";
