import React, { useState } from "react";
import ModalContainer from "../../../../components/common/modal";
import { useMutation } from "@apollo/client";
import { INSERT_ENTERPRISE_DETAILS } from "../../../../schema/mutations";
import alerts from "../../../../constants/alerts";
import openNotification from "../../../../components/common/notification";
import _ from "lodash";

const CreateEnterprise = ({ showModal, closeModal }) => {
  const initialEnterpriseDetails = {
    enterpriseName: "",
    proprietorName: "",
    address: "",
    phone: "",
  };
  const [enterpriseDetails, setEnterpriseDetails] = useState(
    initialEnterpriseDetails
  );

  // mutation for slip insert
  const [insertEnterprise] = useMutation(INSERT_ENTERPRISE_DETAILS);

  // validate enterprise details
  const validateEnterpriseDetails = (enterpriseDetails) => {
    const { enterpriseName, proprietorName, address, phone } =
      enterpriseDetails;

    if (_.isEmpty(enterpriseName)) {
      openNotification(alerts.ERROR, "Please, provide valid merchant name.", 3);
      return false;
    } else if (_.isEmpty(proprietorName)) {
      openNotification(
        alerts.ERROR,
        "Please, provide valid proprietor name.",
        3
      );
      return false;
    } else if (_.isEmpty(address)) {
      openNotification(alerts.ERROR, "Please, provide valid address.", 3);
      return false;
    } else if (!/^\d{10}$/.test(phone)) {
      openNotification(alerts.ERROR, "Please, provide valid phone number.", 3);
      return false;
    } else {
      return true;
    }
  };
  // handler
  const handleOnSubmit = () => {
    const isEnterpriseDetailsValid =
      validateEnterpriseDetails(enterpriseDetails);

    if (!isEnterpriseDetailsValid) {
      return;
    } else {
      insertEnterprise({
        variables: {
          object: {
            label: enterpriseDetails.enterpriseName,
            proprietor: enterpriseDetails.proprietorName,
            phone: enterpriseDetails.phone,
            address: enterpriseDetails.address,
            organizationId: "195bb0b1-3b81-4435-ad2f-b1a051fce77b",
          },
        },
        onCompleted: () => {
          openNotification(alerts.SUCCESS, "Slip sent successfully.", 3);
          closeModal();
        },
        onError: (error) => {
          console.error("🚀 ~ handleOnSubmit ~ error:", error);
          openNotification(alerts.ERROR, "Something went wrong!", 3);
        },
      });
    }
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
      <div className="w-full h-96 gap-4 bg-white text-gray-600 flex flex-col">
        <h1 className="text-center font-bold">Create new Enterprise</h1>

        <div className="w-full flex justify-between gap-4">
          {["enterpriseName", "proprietorName"].map((field) => (
            <div key={field} className="w-1/2">
              <label htmlFor={field}>
                {field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                :
              </label>
              <input
                className="w-full text-black border-y-black bg-slate-500 px-2 rounded py-1"
                type="text"
                id={field}
                name={field}
                value={enterpriseDetails[field]}
                onChange={(e) =>
                  setEnterpriseDetails({
                    ...enterpriseDetails,
                    [field]: e.target.value,
                  })
                }
              />
            </div>
          ))}
        </div>

        {["phone", "address"].map((field) => (
          <div key={field} className="w-full">
            <label htmlFor={field}>
              {field
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              :
            </label>
            <input
              className="w-full text-black border-y-black bg-slate-500 px-2 rounded py-1"
              type="text"
              id={field}
              name={field}
              value={enterpriseDetails[field]}
              onChange={(e) =>
                setEnterpriseDetails({
                  ...enterpriseDetails,
                  [field]: e.target.value,
                })
              }
            />
          </div>
        ))}

        <div className="flex items-center justify-center gap-4">
          <button onClick={handleOnSubmit}>Save</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default CreateEnterprise;
