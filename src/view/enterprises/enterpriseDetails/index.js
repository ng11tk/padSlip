import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GET_ENTERPRISE_SLIPS } from "../../../schema/queries";
import { useQuery } from "@apollo/client";
import ViewSlipModal from "../../dashboard/modals/slipDetails";

const EnterpriseDetails = () => {
  const { id } = useParams();
  const [enterpriseSlips, setEnterpriseSlips] = useState([]);
  const [openViewSlipModal, setOpenViewSlipModal] = useState(false);
  const [viewSlipData, setViewSlipData] = useState([]);

  //* fetch enterprise
  const { loading, error } = useQuery(GET_ENTERPRISE_SLIPS, {
    variables: {
      enterpriseId: id,
      organizationId: "195bb0b1-3b81-4435-ad2f-b1a051fce77b",
    },
    onCompleted: (data) => {
      const result = data?.enterpriseSlips || [];
      setEnterpriseSlips(result);
    },
  });

  // modals
  const closeViewSlipModal = () => {
    setOpenViewSlipModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="w-full h-full">
      <div
        className="grid gap-4 mt-4
                    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {enterpriseSlips.length > 0 &&
          enterpriseSlips.map((slip) => {
            return (
              <div
                key={slip.id}
                className="w-full bg-slate-400 p-2"
                onClick={() => {
                  setOpenViewSlipModal(true);
                  setViewSlipData(slip);
                }}
              >
                <div className="flex justify-between items-start flex-col">
                  {/* 
                  //todo: use date in card too
                  <div>
                    <span>Ent. Name :</span>&nbsp;
                    <span>{slip.label}</span>
                  </div> */}
                  <div>
                    <span>Amount:</span>&nbsp;
                    <span>{slip?.totalAmount || 0}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {openViewSlipModal && (
        <ViewSlipModal
          showModal={openViewSlipModal}
          closeModal={closeViewSlipModal}
          viewSlipData={viewSlipData}
        />
      )}
    </div>
  );
};

export default EnterpriseDetails;
