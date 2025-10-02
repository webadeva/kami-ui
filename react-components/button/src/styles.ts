import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ButtonProps } from "src/types";

type VariantFnProps = Omit<ButtonProps, "$variant">;

const filledStyles = ({
  $color = "primary",
  $colorWeight = "400",
  $textColor = "text",
  $textColorWeight = "900",
}: VariantFnProps) => {
  return css`
    background-color: var(--color-${$color}-${$colorWeight});
    color: var(--color-${$textColor}-${$textColorWeight});
    border: 2px solid var(--color-${$color}-${$colorWeight});
  `;
};

const outlinedStyles = ({
  $color = "primary",
  $colorWeight = "500",
  $textColor,
  $textColorWeight,
}: VariantFnProps) => {
  return css`
    background-color: transparent;
    color: var(
      --color-${$textColor ?? $color}-${$textColorWeight ?? $colorWeight}
    );
    border: 2px solid var(--color-${$color}-${$colorWeight});
  `;
};

const textStyles = (_: VariantFnProps) => {
  return css``;
};

const sizeStyles = ({ $size = "md" }: ButtonProps) => {
  switch ($size) {
    case "sm":
      return css`
        font-size: var(--fs-2xs, 0.75rem);
        min-height: 2rem;
      `;
    case "md":
      return css`
        font-size: var(--fs-1xs, 0.875rem);
        min-height: 2.5rem;
      `;
    case "lg":
      return css`
        font-size: var(--fs-s, 1rem);
        min-height: 3rem;
      `;
  }
};

const variantStyles = ({ $variant = "filled", ...props }: ButtonProps) => {
  switch ($variant) {
    case "filled":
      return filledStyles(props);
    case "outlined":
      return outlinedStyles(props);
    case "text":
      return textStyles(props);
  }
};

const borderRadiusStyles = ({ $borderRadius = "md" }: ButtonProps) => {
  switch ($borderRadius) {
    case "full":
      return css`
        border-radius: var(--br-full, 999vw);
      `;
    case "lg":
      return css`
        border-radius: var(--space-3, 8px);
      `;
    case "md":
      return css`
        border-radius: var(--space-4, 12px);
      `;
    case "sm":
      return css`
        border-radius: var(--space-5, 16px);
      `;
    case "none":
      return css`
        border-radius: 0;
      `;
    default:
      return css`
        border-radius: ${$borderRadius};
      `;
  }
};

export const ButtonWrapper = styled.button<ButtonProps>`
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: ${({ $padding = "0 1em" }) => {
    return $padding;
  }};
  font-weight: ${({ $fontWeight = "500" }) => {
    return $fontWeight;
  }};
  ${borderRadiusStyles}
  ${sizeStyles}
  ${variantStyles};

  &[data-down] {
    scale: 0.95;
  }

  &:hover {
    opacity: 0.9;
  }
`;
