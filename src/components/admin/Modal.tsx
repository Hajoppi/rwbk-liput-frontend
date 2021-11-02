import styled from "styled-components"
import { FC }from "react";
import { Button } from "../../styles/Styles";


type PropType = {
  close: () => void;
}



const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: hsla(0, 0%, 10%, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Container = styled.div`

`;

const CloseButton = styled(Button)`
  position: absolute;
  right: 64px;
  top: 32px;
`;

const SeatModal: FC<PropType> = ( {close, children} ) => {
  return (
    <ModalWrapper>
      <CloseButton onClick={close}> X </CloseButton>
      <Container>
        {children}
      </Container>
    </ModalWrapper>
  )
}

export default SeatModal;