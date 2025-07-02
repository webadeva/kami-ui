import { forwardRef, Ref } from "react";
import { ButtonWrapper } from "./styles";
import { ButtonProps } from "./types";

const ButtonWithoutRef = (props: ButtonProps, ref: Ref<HTMLDivElement>) => {
  return (
    <ButtonWrapper ref={ref}>
      <div>hello</div>
    </ButtonWrapper>
  );
};

const Button = forwardRef(ButtonWithoutRef);
export default Button;

export type * from "./types";
