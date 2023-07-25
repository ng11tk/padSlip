import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import CreateSlipModal from "../slip/modals/slipModal";
import { GET_SLIPS } from "../../schema/queries";
import ModalContainer from "../../components/common/modal";

// const customSlip = [
//   {
//     id: 0,
//     orgName: "Jagdish Ent.",
//     totalAmount: 232,
//     lastUpdate: "jan 01, 2023",
//   },
//   {
//     id: 1,
//     orgName: "lokesh Ent.",
//     totalAmount: 232,
//     lastUpdate: "jan 01, 2023",
//   },
// ];

const Dashboard = () => {
  const [openCreateSlipModal, setOpenCreateSlipModal] = useState(false);
  const [openViewSlipModal, setOpenViewSlipModal] = useState(false);
  const [viewSlipData, setViewSlipData] = useState({});
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
    <div className="w-full h-full gap-3 flex">
      <div>
        {/* <Link to={routes.padSlip}> */}
        <div
          className="bg-slate-400 p-2 flex items-center cursor-pointer"
          onClick={() => setOpenCreateSlipModal(true)}
        >
          +{" "}
        </div>
        {/* </Link> */}
      </div>

      <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
        {slipData.length > 0 &&
          slipData.map((slip) => {
            return (
              <div
                key={slip.id}
                className="bg-slate-400 p-2"
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
                    <span>Total amount :</span>&nbsp;
                    <span>{slip.totalAmount}</span>
                  </div>
                  {/* <div>
                <span>Last slip :</span>&nbsp;<span>{slip.lastUpdate}</span>
              </div> */}
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
          viewSlipData={viewSlipData}
        />
      )}
    </div>
  );
};

export default Dashboard;

const ViewSlipModal = ({ showModal, closeModal, viewSlipData }) => {
  console.log("slip details", viewSlipData);
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
      nitin
    </ModalContainer>
  );
};
