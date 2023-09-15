import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import CreateSlipModal from "../slip/modals/slipModal";
import { GET_SLIPS } from "../../schema/queries";
import ViewSlipModal from "./modals/slipDetails";
import moment from "moment";

const Dashboard = () => {
  const [openCreateSlipModal, setOpenCreateSlipModal] = useState(false);
  const [openViewSlipModal, setOpenViewSlipModal] = useState(false);
  const [viewSlipData, setViewSlipData] = useState([]);
  const [slipData, setSlipData] = useState([]);

  //* fetch slips
  const {
    loading,
    error,
    // data: slipData,
  } = useQuery(GET_SLIPS, {
    variables: {
      organizationId: "195bb0b1-3b81-4435-ad2f-b1a051fce77b",
    },
    onCompleted: (data) => {
      const result = data.getSlips;
      setSlipData(result);
    },
  });

  // handler
  const dateConverter = (date) => {
    var day = moment.unix(date);

    const dateFormat = day.format("ddd MMM Do YYYY, h:mm a");
    return dateFormat;
  };

  // modal close
  const closeCreateSlipModal = () => {
    setOpenCreateSlipModal(false);
  };

  const closeViewSlipModal = () => {
    setOpenViewSlipModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div className="w-full h-full">
      <div
        className="bg-slate-400 p-2 cursor-pointer"
        onClick={() => setOpenCreateSlipModal(true)}
      >
        +{" "}
      </div>

      <div
        className="grid gap-4 mt-4
                    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {slipData.length > 0 &&
          slipData.map((slip) => {
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
                  <div>
                    <span>Ent. Name :</span>&nbsp;
                    <span>{slip.slip_enterprise.label}</span>
                  </div>
                  <div>
                    <span>Total Amount :</span>&nbsp;
                    <span>{slip?.totalAmount || 0}</span>
                  </div>
                  <div>
                    <span>Received Amount :</span>&nbsp;
                    <span>{slip?.receivedAmount || 0}</span>
                  </div>
                  <div>
                    <span>Balance Amount :</span>&nbsp;
                    <span>{slip?.balanceAmount || 0}</span>
                  </div>
                  <div>
                    <span>Last Slip :</span>&nbsp;
                    <span>{dateConverter(slip.created_at)}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {openCreateSlipModal && (
        <CreateSlipModal
          showModal={openCreateSlipModal}
          closeModal={closeCreateSlipModal}
        />
      )}
      {openViewSlipModal && (
        <ViewSlipModal
          showModal={openViewSlipModal}
          closeModal={closeViewSlipModal}
          enterpriseLabel={viewSlipData.slip_enterprise.label}
          viewSlipData={viewSlipData}
        />
      )}
    </div>
  );
};

export default Dashboard;
