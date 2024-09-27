import React from "react";
import ModalContainer from "../../../../components/common/modal.js";
import { EpochDateConverter } from "../../../../utils/dateConverter.js";

const ViewSlipModal = ({
  showModal,
  closeModal,
  enterpriseLabel,
  viewSlipData,
}) => {
  // console.log("slip details", viewSlipData);

  return (
    <ModalContainer
      // bodyStyle={{ background: "#2F3B52" }}
      visible={showModal}
      width={"800px"}
      closeModal={closeModal}
      closable={false}
      destroyOnClose={true}
      maskClosable={true}
    >
      <div>
        <div className="text-center flex justify-between">
          <div className="font-bold">{enterpriseLabel || "Cash"}</div>
          <div>Date:&nbsp;{EpochDateConverter(viewSlipData.created_at)}</div>
        </div>
        <div className="mt-4">
          {viewSlipData?.slipData.length > 0 ? (
            <div className="flex flex-col">
              <section className="font-bold">
                <ul className="flex justify-between">
                  <li>Item</li>
                  <li>Rate</li>
                  <li>Quantity</li>
                  <li>Amount</li>
                </ul>
              </section>
              {viewSlipData?.slipData.map((eachItem) => {
                return (
                  <section
                    key={`${eachItem?.itemName}-${eachItem?.rate}-${eachItem?.quantity}`}
                  >
                    <ul className="flex justify-between">
                      <li>{eachItem?.itemName}</li>
                      <li>{eachItem?.rate}</li>
                      <li>{eachItem?.quantity}</li>
                      <li>{eachItem?.rate * eachItem?.quantity}</li>
                    </ul>
                  </section>
                );
              })}
            </div>
          ) : (
            "No data found"
          )}
        </div>
        <div className="flex justify-between mt-4">
          <div>
            <span>Total Amount:&nbsp;</span>
            <span>{viewSlipData?.totalAmount || 0}</span>
          </div>
          <div>
            <span>Received Amount:&nbsp;</span>
            <span>{viewSlipData?.receivedAmount || 0}</span>
          </div>
          <div>
            <span>Balance Amount:&nbsp;</span>
            <span>{viewSlipData?.balanceAmount || 0}</span>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ViewSlipModal;
