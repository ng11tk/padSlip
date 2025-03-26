import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_SLIPS } from "../../schema/queries/index.js";
import ViewSlipModal from "../slip/modals/viewSlip/index.js";
import { EpochDateConverter } from "../../utils/dateConverter.js";

const Records = () => {
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

    const closeViewSlipModal = () => {
        setOpenViewSlipModal(false);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return (
        <div className="w-full h-full">
            <div className="text-left font-medium	">Records</div>

            <div className="mt-4">
                {slipData.length > 0 && (
                    <div
                        className="grid gap-4 cursor-pointer
                    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    >
                        {slipData.map((slip) => {
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
                                            <span>
                                                {slip.slip_enterprise.label}
                                            </span>
                                        </div>
                                        <div>
                                            <span>Total Amount :</span>&nbsp;
                                            <span>
                                                {slip?.totalAmount || 0}
                                            </span>
                                        </div>
                                        <div>
                                            <span>Received Amount :</span>&nbsp;
                                            <span>
                                                {slip?.receivedAmount || 0}
                                            </span>
                                        </div>
                                        <div>
                                            <span>Balance Amount :</span>&nbsp;
                                            <span>
                                                {slip?.balanceAmount || 0}
                                            </span>
                                        </div>
                                        <div>
                                            <span>Date :</span>&nbsp;
                                            <span>
                                                {EpochDateConverter(
                                                    slip.created_at
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {slipData.length === 0 && (
                    <div className="text-center">No Slip Found</div>
                )}
            </div>

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

export default Records;
