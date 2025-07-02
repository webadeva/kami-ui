import { forwardRef, Ref } from "react";
import { ButtonWrapper } from "./styles";
import { ButtonProps } from "./types";

const ButtonWithoutRef = (
  { className }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) => {
  return (
    <ButtonWrapper className={className} ref={ref}>
      <div>hello</div>
    </ButtonWrapper>
  );
};

const Button = forwardRef(ButtonWithoutRef);
export default Button;

export type * from "./types";
