import React from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";

const ModalContainer = ({
  destroyOnClose,
  className = "incident-modal-root",
  visible = false,
  width = "40%",
  closeModal,
  closable = true,
  maskClosable = false,
  zIndex = 1000,
  footer = null,
  children = "",
  bodyStyle,
}) => {
  return (
    <>
      <Modal
        destroyOnClose={destroyOnClose}
        className={className}
        // bodyStyle={bodyStyle || { background: "#20293C" }}
        open={visible}
        width={width}
        onCancel={closeModal}
        closable={closable}
        maskClosable={maskClosable}
        zIndex={zIndex}
        // closeIcon={
        //   <img
        //     className="mx-auto mt-2 focus:outline-none custom-modal-close"
        //     src={CancelIcon}
        //     width="25"
        //     height="25"
        //     alt="close"
        //   />
        // }
        footer={footer}
      >
        {children}
      </Modal>
    </>
  );
};

ModalContainer.propTypes = {
  closeModal: PropTypes.any.isRequired,
};

export default ModalContainer;
