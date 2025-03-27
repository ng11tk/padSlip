import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_SLIPS } from "../../schema/queries/index.js";
import ViewSlipModal from "../slip/modals/viewSlip/index.js";
import { EpochDateConverter } from "../../utils/dateConverter.js";
import { DatePicker, Radio } from "antd";
import moment from "moment";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const Records = () => {
    const [openViewSlipModal, setOpenViewSlipModal] = useState(false);
    const [viewSlipData, setViewSlipData] = useState([]);
    const [slipData, setSlipData] = useState([]);
    const [dateFilterValue, setDateFilterValue] = useState("week");
    const [queryFilters, setQueryFilters] = useState({
        organizationId: "195bb0b1-3b81-4435-ad2f-b1a051fce77b",
        filterRange: {
            _lte: moment().unix(),
            _gte: moment().subtract(7, "days").startOf("day").unix(),
        },
    });
    console.log("🚀 ~ Records ~ queryFilters:", queryFilters);

    //* fetch slips
    const {
        loading,
        error,
        // data: slipData,
    } = useQuery(GET_SLIPS, {
        variables: queryFilters,
        onCompleted: (data) => {
            const result = data.getSlips;
            setSlipData(result);
        },
    });

    // handle filter date
    const options = [
        { label: "Week", value: "week" },
        { label: "Month", value: "month" },
        { label: "Year", value: "year" },
    ];
    const handleDateFilter = (e) => {
        let filterRange = { _lte: moment().unix() };
        let value = e.target.value;

        if (e.target.value === "week") {
            filterRange = {
                ...filterRange,
                _gte: moment().subtract(7, "days").startOf("day").unix(),
            };
        } else if (e.target.value === "month") {
            filterRange = {
                ...filterRange,
                _gte: moment().subtract(1, "months").startOf("day").unix(),
            };
        } else {
            filterRange = {
                ...filterRange,
                _gte: moment().subtract(1, "years").startOf("day").unix(),
            };
        }
        setDateFilterValue(value);
        setQueryFilters({
            ...queryFilters,
            filterRange,
        });
    };
    const onChangeDatePicker = (date, dateString) => {
        console.log("🚀 ~ Selected Dates (String):", dateString);
        console.log("🚀 ~ Selected Dates (Dayjs):", date);
        let filterRange = { _lte: moment().unix() };

        if (date && date.length === 2) {
            // Get start and end of the day in epoch (milliseconds)
            const startDate = date[0].startOf("day").unix(); // Start of day
            const endDate = date[1].endOf("day").unix(); // End of day

            console.log("🚀 ~ Start Date (Epoch ms):", startDate);
            console.log("🚀 ~ End Date (Epoch ms):", endDate);
            filterRange = {
                _lte: endDate,
                _gte: startDate,
            };
            // Example: Set state or apply filter
            setDateFilterValue("custom");
            setQueryFilters({
                ...queryFilters,
                filterRange,
            });
        } else {
            console.log("🚀 ~ Date selection cleared or canceled");
            // Reset date filter if necessary
            filterRange = {
                ...filterRange,
                _gte: moment().subtract(7, "days").startOf("day").unix(),
            };
            setDateFilterValue("week");
            setQueryFilters({
                ...queryFilters,
                filterRange,
            });
        }
    };

    // close view slip modal
    const closeViewSlipModal = () => {
        setOpenViewSlipModal(false);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return (
        <div className="w-full h-full">
            <div className="flex justify-between items-center">
                <div className="text-left font-medium">Records</div>

                <div className="flex justify-end items-center">
                    <div className="mr-4">Filter By :</div>
                    {dateFilterValue !== "custom" && (
                        <div
                            className="mr-1"
                            onClick={() => setDateFilterValue("custom")}
                        >
                            Custom
                        </div>
                    )}
                    {dateFilterValue === "custom" && (
                        <RangePicker
                            onChange={onChangeDatePicker}
                            allowClear
                            format={"YYYY/MM/DD"}
                            // defaultValue={[
                            //     queryFilters?.filterRange?._gte
                            //         ? dayjs(
                            //               queryFilters.filterRange._gte
                            //           ).format("YYYY/MM/DD")
                            //         : null,
                            //     queryFilters?.filterRange?._lte
                            //         ? dayjs(
                            //               queryFilters.filterRange._lte
                            //           ).format("YYYY/MM/DD")
                            //         : null,
                            // ]}
                        />
                    )}

                    <Radio.Group
                        block
                        options={options}
                        defaultValue={"week"}
                        value={dateFilterValue}
                        optionType="button"
                        buttonStyle="solid"
                        onChange={handleDateFilter}
                    />
                </div>
            </div>
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
