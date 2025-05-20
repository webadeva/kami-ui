import { forwardRef, Ref } from "react";
import { ButtonWrapper } from "./styles";
import { ButtonProps } from "./types";

const ButtonWithoutRef = (
  { className }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) => {
  return (
    <ButtonWrapper ref={ref} className={className}>
      <div>hello</div>
    </ButtonWrapper>
  );
};

export const Button = forwardRef(ButtonWithoutRef);

export type * from "./types";
