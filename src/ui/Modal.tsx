import React from "react";
import styled from "styled-components";
import { ModalProps } from "../type";

const Modal: React.FC<ModalProps> = ({ photo, onClose }) => {
  if (!photo) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <StyledImage src={photo.urls.full} alt={photo.alt_description} />
        <Info>
          <p><strong>Views:</strong> {photo.views}</p>
          <p><strong>Downloads:</strong> {photo.downloads}</p>
          <p><strong>Likes:</strong> {photo.likes}</p>
        </Info>
      </ModalContent>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  text-align: center;
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 60vh;
  border-radius: 4px;

`;

const Info = styled.div`
  margin-top: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -10px;
  right: 2px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: black;
`;