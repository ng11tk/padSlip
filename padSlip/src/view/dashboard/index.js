import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import CreateSlipModal from "../slip/modals/createSlip/slipModal.js";
import { GET_RECEIVED_SLIPS, GET_SLIPS } from "../../schema/queries/index.js";
import ViewSlipModal from "../slip/modals/viewSlip/index.js";
import moment from "moment";
import { EpochDateConverter } from "../../utils/dateConverter.js";
import ReceivedModal from "../slip/modals/receiveSlip/index.js";

const Dashboard = () => {
    const [openCreateSlipModal, setOpenCreateSlipModal] = useState(false);
    const [openReceivedModal, setOpenReceivedModal] = useState(false);
    const [openViewSlipModal, setOpenViewSlipModal] = useState(false);
    const [viewSlipData, setViewSlipData] = useState([]);
    const [slipData, setSlipData] = useState([]);
    const [newlyCreatedOrder, setNewlyCreatedOrder] = useState(false);
    const [isPaymentReceived, setIsPaymentReceived] = useState(false);
    const [receivedSlipsData, setReceivedSlipsData] = useState([]);

    //* fetch slips
    const { loading, error } = useQuery(GET_SLIPS, {
        variables: {
            organizationId: "195bb0b1-3b81-4435-ad2f-b1a051fce77b",
            filterRange: {
                _lte: moment().unix(),
                _gte: moment().startOf("date").unix(),
            },
        },
        onCompleted: (data) => {
            const result = data.getSlips;
            setSlipData(result);
        },
    });
    const {
        loading: fetchReceivedSlipsLoading,
        error: fetchReceivedSlipsError,
    } = useQuery(GET_RECEIVED_SLIPS, {
        variables: {
            organizationId: "195bb0b1-3b81-4435-ad2f-b1a051fce77b",
            filterRange: {
                _lte: moment().unix(),
                _gte: moment().startOf("date").unix(),
            },
        },
        onCompleted: (data) => {
            const result = data.receivedSlip;
            setReceivedSlipsData(result);
        },
    });

    // modal close
    const closeCreateSlipModal = (isOrderGenerated) => {
        setOpenCreateSlipModal(false);

        if (isOrderGenerated) {
            console.log(
                "🚀 ~if closeCreateSlipModal ~ isOrderGenerated:",
                isOrderGenerated
            );
            setNewlyCreatedOrder(isOrderGenerated);
        } else {
            console.log(
                "🚀 ~else closeCreateSlipModal ~ isOrderGenerated:",
                isOrderGenerated
            );
            setNewlyCreatedOrder(false);
        }
    };
    const closeViewSlipModal = () => {
        setOpenViewSlipModal(false);
    };
    const closeReceivedModal = (isPaymentCompleted) => {
        setOpenReceivedModal(false);
        
        if (isPaymentCompleted) {
            setIsPaymentReceived(isPaymentCompleted);
        } else {
            setIsPaymentReceived(false);
        }
    };

    if (loading || fetchReceivedSlipsLoading) return <p>Loading...</p>;
    if (error || fetchReceivedSlipsError) return <p>Error : {error}</p>;
    return (
        <div className="w-full h-full">
            <div className="text-left font-medium">Dashboard</div>
            <div className="flex justify-between gap-1">
                <div
                    className="bg-slate-400 p-2 mt-4 cursor-pointer grow"
                    onClick={() => setOpenCreateSlipModal(true)}
                >
                    + Order Item
                </div>
                <div
                    className="bg-slate-400 p-2 mt-4 cursor-pointer grow"
                    onClick={() => setOpenReceivedModal(true)}
                >
                    + Received
                </div>
            </div>
            <div className="mt-4">
                {slipData?.length > 0 && (
                    <div
                        className="grid gap-4 cursor-pointer
                                    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    >
                        {slipData?.map((slip) => {
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

            {openCreateSlipModal && (
                <CreateSlipModal
                    showModal={openCreateSlipModal}
                    closeModal={closeCreateSlipModal}
                />
            )}
            {openReceivedModal && (
                <ReceivedModal
                    showModal={openReceivedModal}
                    closeModal={closeReceivedModal}
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
