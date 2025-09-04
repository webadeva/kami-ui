import { forwardRef, MouseEventHandler, Ref, TouchEventHandler } from "react";
import { ButtonWrapper } from "./styles";
import { ButtonProps } from "./types";

const ButtonWithoutRef = (
  {
    children,
    type = "button",
    $variant = "filled",
    onMouseDown: onMouseDownProp,
    onTouchStart: onTouchStartProp,
    onMouseUp: onMouseUpProp,
    onTouchEnd: onTouchEndProp,
    ...props
  }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) => {
  const onMouseDown: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.currentTarget.setAttribute("data-down", "true");
    onMouseDownProp?.(e);
  };
  const onTouchStart: TouchEventHandler<HTMLButtonElement> = (e) => {
    e.currentTarget.setAttribute("data-down", "true");
    onTouchStartProp?.(e);
  };
  const onMouseUp: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.currentTarget.removeAttribute("data-down");
    onMouseUpProp?.(e);
  };
  const onTouchEnd: TouchEventHandler<HTMLButtonElement> = (e) => {
    e.currentTarget.removeAttribute("data-down");
    onTouchEndProp?.(e);
  };
  return (
    <ButtonWrapper
      type={type}
      ref={ref}
      $variant={$variant}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      {...props}
    >
      {children}
    </ButtonWrapper>
  );
};

const Button = forwardRef(ButtonWithoutRef);
export default Button;

export type * from "./types";
