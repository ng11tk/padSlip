import React from "react";
import ModalContainer from "../../../../components/common/modal";

const ViewSlipModal = ({
  showModal,
  closeModal,
  enterpriseLabel,
  viewSlipData,
}) => {
  console.log("slip details", viewSlipData);
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
        <div className="text-center">{enterpriseLabel || "Cash"}</div>
        <div>
          {viewSlipData?.slipData.length > 0 ? (
            <div className="flex flex-col">
              <section>
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
        <div className="flex justify-end gap-4">
          <span>Total Amount:&nbsp;</span>
          <span>{viewSlipData?.totalAmount || 0}</span>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ViewSlipModal;
