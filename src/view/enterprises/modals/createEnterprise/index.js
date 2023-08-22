import React from "react";
import ModalContainer from "../../../../components/common/modal";

const CreateEnterprise = ({ showModal, closeModal }) => {
  return (
    <ModalContainer
      bodyStyle={{ background: "#2F3B52" }}
      visible={showModal}
      width={"800px"}
      closeModal={closeModal}
      closable={false}
      destroyOnClose={true}
      maskClosable={true}
    >
      <div>CreateEnterprise</div>
    </ModalContainer>
  );
};

export default CreateEnterprise;
