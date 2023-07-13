import React from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";

const ModalContainer = (props) => {
  return (
    <>
      <Modal
        destroyOnClose={props.destroyOnClose}
        className={props.className}
        bodyStyle={props.bodyStyle || { background: "#20293C" }}
        open={props.visible}
        width={props.width}
        onCancel={props.closeModal}
        closable={props.closable}
        maskClosable={props.maskClosable ? props.maskClosable : false}
        zIndex={props.zIndex || 1000}
        // closeIcon={
        //   <img
        //     className="mx-auto mt-2 focus:outline-none custom-modal-close"
        //     src={CancelIcon}
        //     width="25"
        //     height="25"
        //     alt="close"
        //   />
        // }
        footer={props.footer}
      >
        {props.children}
      </Modal>
    </>
  );
};
ModalContainer.defaultProps = {
  visible: false,
  width: "40%",
  footer: null,
  children: "",
  closable: true,
  className: "incident-modal-root",
  bodyStyle: null,
};

ModalContainer.propTypes = {
  closeModal: PropTypes.any.isRequired,
};

export default ModalContainer;
