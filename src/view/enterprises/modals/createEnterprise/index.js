import React, { useState } from "react";
import ModalContainer from "../../../../components/common/modal";
import { useMutation } from "@apollo/client";
import { INSERT_ENTERPRISE_DETAILS } from "../../../../schema/mutations";
import alerts from "../../../../constants/alerts";
import openNotification from "../../../../components/common/notification";

const CreateEnterprise = ({ showModal, closeModal }) => {
  const [enterpriseName, setEnterpriseName] = useState("");

  // mutation for slip insert
  const [insertEnterprise] = useMutation(INSERT_ENTERPRISE_DETAILS);

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
        <div className="text-center">Create new Enterprise</div>

        <input
          className="text-black border-y-black bg-slate-500 rounded px-2 py-1"
          value={enterpriseName}
          placeholder="Enter Enterprise Name"
          onChange={(e) => setEnterpriseName(e.target.value)}
        />

        <div className="flex items-center justify-center gap-4">
          <button onClick={handleOnSubmit}>Save</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default CreateEnterprise;
