import styled from "@emotion/styled";

export const ButtonWrapper = styled.button`
  color: var(--color-text-900, rgba(0, 0, 0, 1));
  display: flex;
  gap: 0.25em;
  height: fit-content;
  width: fit-content;
  padding: 0.5em 1em;
  background-color: transparent;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.125);
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 10px;
  }
`;
