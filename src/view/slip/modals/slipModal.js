import React from "react";
import ModalContainer from "../../../components/common/modal";

const SlipModal = ({ showModal, closeModal }) => {
  return (
    <ModalContainer
      bodyStyle={{ background: "#2F3B52" }}
      visible={showModal}
      width={"600px"}
      closeModal={closeModal}
      closable={false}
      destroyOnClose={true}
      maskClosable={true}
    >
      padSlip
    </ModalContainer>
  );
};

export default SlipModal;
