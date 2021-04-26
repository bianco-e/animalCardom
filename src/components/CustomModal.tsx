import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { SMALL_RESPONSIVE_BREAK } from "../utils/constants";

const modalRoot = document.getElementById("modal-root");
interface IProps {
  closeModal: () => void;
  children?: JSX.Element;
  forSpinner?: boolean;
  withCloseButton?: boolean;
}

export default function SimpleModal({
  closeModal,
  children,
  forSpinner,
  withCloseButton = true,
}: IProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    if (contentRef.current) {
      const isClickingOut =
        clientX >
          contentRef.current.offsetLeft + contentRef.current.offsetWidth ||
        clientX < contentRef.current.offsetLeft ||
        clientY >
          contentRef.current.offsetTop + contentRef.current.offsetHeight ||
        clientY < contentRef.current.offsetTop;
      if (isClickingOut) {
        closeModal();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []); //eslint-disable-line

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []); //eslint-disable-line

  return (
    modalRoot &&
    ReactDOM.createPortal(
      <Wrapper>
        <Content forSpinner={forSpinner} ref={contentRef}>
          {children}
          {!forSpinner && withCloseButton && (
            <Button onClick={() => closeModal()}>Close</Button>
          )}
        </Content>
      </Wrapper>,
      modalRoot
    )
  );
}

interface ContentProps {
  forSpinner?: boolean;
}
const Wrapper = styled.div`
  background: rgba(50, 50, 50, 0.7);
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 29;
`;
const Content = styled.div`
  align-items: center;
  background: ${(p: ContentProps) => !p.forSpinner && "#d4a257"};
  border: ${(p: ContentProps) => !p.forSpinner && "2px solid #b9935a"};
  border-radius: 5px;
  box-shadow: ${(p: ContentProps) =>
    !p.forSpinner && "inset 0px 0px 10px black"};
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 600px;
  z-index: 30;
  @media (${SMALL_RESPONSIVE_BREAK}) {
    width: 80%;
  }
`;
const Button = styled.button`
  border: none;
  background: none;
  color: black;
  cursor: pointer;
  font-size: 10px;
  margin: 10px 0;
`;
