import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GET_ENTERPRISE_SLIPS } from "../../../schema/queries";
import { useQuery } from "@apollo/client";
import ViewSlipModal from "../../slip/modals/viewSlip";
import { InternationalRupeeFormat } from "../../../components/common/InternationalRupeeFormat";
import { EpochDateConverter } from "../../../utils/dateConverter";

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
      const result = data?.enterpriseSlips[0] || [];
      setEnterpriseSlips(result);
    },
  });

  const remainingBalance = (amountArray) => {
    const total = amountArray?.reduce(
      (prevValue, currentValue) => prevValue + currentValue?.balanceAmount ?? 0,
      0
    );
    return InternationalRupeeFormat(total);
  };

  const totalBusiness = (amountArray) => {
    const total = amountArray?.reduce(
      (prevValue, currentValue) => prevValue + currentValue?.totalAmount ?? 0,
      0
    );
    return InternationalRupeeFormat(total);
  };

  // modals
  const closeViewSlipModal = () => {
    setOpenViewSlipModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="w-full h-full">
      <div className="flex justify-between">
        <ol className="text-left font-medium">
          <li>
            <span>Enterprise Name : </span>
            <span>{enterpriseSlips?.label ?? "N/a"}</span>
          </li>
          <li>
            <span>Enterprise Address : </span>
            <span>{enterpriseSlips?.address ?? "N/a"}</span>
          </li>
          <li>
            <span>Phone : </span>
            <span>{enterpriseSlips?.phone ?? "N/a"}</span>
          </li>
          <li>
            <span>Proprietor : </span>
            <span>{enterpriseSlips?.proprietor ?? "N/a"}</span>
          </li>
        </ol>
        <ol className="text-end">
          <li>
            <span>Balance Amount : </span>
            <span>{remainingBalance(enterpriseSlips?.enterprise_slips)}</span>
          </li>
          <li>
            <span>Total Business Amount : </span>
            <span>{totalBusiness(enterpriseSlips?.enterprise_slips)}</span>
          </li>
        </ol>
      </div>

      {enterpriseSlips?.enterprise_slips?.length > 0 ? (
        <div
          className="grid gap-4 mt-4
                    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {enterpriseSlips?.enterprise_slips.map((slip) => {
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
                    <span>Amount:</span>&nbsp;
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
                    <span>Slip Date :</span>&nbsp;
                    <span>{EpochDateConverter(slip.created_at)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Yet to create first slip!</div>
      )}

      {openViewSlipModal && (
        <ViewSlipModal
          showModal={openViewSlipModal}
          closeModal={closeViewSlipModal}
          enterpriseLabel={enterpriseSlips.label}
          viewSlipData={viewSlipData}
        />
      )}
    </div>
  );
};

export default EnterpriseDetails;
