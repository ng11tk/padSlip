import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import SlipModal from "../slip/modals/slipModal";
import { GET_SLIPS } from "../../schema/queries";

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
  const [openSlipModal, setOpenSlipModal] = useState(false);
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
  const closeModal = () => {
    setOpenSlipModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div className="w-full h-full gap-3 flex">
      <div>
        {/* <Link to={routes.padSlip}> */}
        <div
          className="bg-slate-400 p-2 flex items-center cursor-pointer"
          onClick={() => setOpenSlipModal(true)}
        >
          +{" "}
        </div>
        {/* </Link> */}
      </div>

      <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
        {" "}
        {slipData.length > 0 &&
          slipData.map((each) => {
            return (
              <div key={each.id} className="bg-slate-400 p-2">
                <div className="flex justify-between items-start flex-col">
                  <div>
                    <span>Ent. Name :</span>&nbsp;
                    <span>{each.slip_enterprise.label}</span>
                  </div>
                  <div>
                    <span>Total amount :</span>&nbsp;
                    <span>{each.totalAmount}</span>
                  </div>
                  {/* <div>
                <span>Last slip :</span>&nbsp;<span>{each.lastUpdate}</span>
              </div> */}
                </div>
              </div>
             );
          })}
      </div>

      {openSlipModal && (
        <SlipModal showModal={openSlipModal} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Dashboard;
