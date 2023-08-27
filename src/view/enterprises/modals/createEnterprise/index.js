import React, { useState } from "react";
import ModalContainer from "../../../../components/common/modal";
import { useMutation } from "@apollo/client";
import { INSERT_ENTERPRISE_DETAILS } from "../../../../schema/mutations";
import alerts from "../../../../constants/alerts";
import openNotification from "../../../../components/common/notification";

const CreateEnterprise = ({ showModal, closeModal }) => {
  const [enterpriseName, setEnterpriseName] = useState("");

  // mutation for slip insert
  const [
    insertEnterprise,
    {
      // eslint-disable-next-line no-unused-vars
      loading: slipInsetLoading,
      // eslint-disable-next-line no-unused-vars
      error: slipInsertError,
      // data: slipData,
    },
  ] = useMutation(INSERT_ENTERPRISE_DETAILS);

  // handler
  const handleOnSubmit = () => {
    console.log("enterprise Name", enterpriseName);

    const isEnterpriseValid = enterpriseName.length > 0;

    if (!isEnterpriseValid) {
      return openNotification(alerts.ERROR, "Please provide valid merchant", 3);
    }

    insertEnterprise({
      variables: {
        label: enterpriseName,
        organizationId: "195bb0b1-3b81-4435-ad2f-b1a051fce77b",
      },
      onCompleted: closeModal,
    });
    openNotification(alerts.SUCCESS, "Slip sent successfully.", 3);
  };

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
      <div
        className="w-full h-96 gap-4 bg-white text-gray-600 
                      flex flex-col"
      >
        <div
          className="w-full overflow-scroll gap-2
                        flex flex-col"
        >
          <div className="w-full flex flex-row items-center justify-between gap-3">
            <div className="flex w-full gap-2">
              <input
                className="w-1/3 text-black border-y-black bg-slate-500 rounded px-2 py-1"
                value={enterpriseName}
                placeholder="Enter Item Name"
                onChange={(e) => setEnterpriseName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button onClick={handleOnSubmit}>Print</button>
          {/* <Link to={routes.dashboard}>Cancel</Link> */}
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default CreateEnterprise;
