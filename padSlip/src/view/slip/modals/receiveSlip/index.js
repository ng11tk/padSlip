import React, { useState } from "react";
import ModalContainer from "../../../../components/common/modal";
import { Select, Table } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import {
    FETCH_ENTERPRISE_LIST,
    GET_SLIPS_LIST,
} from "../../../../schema/queries";
import openNotification from "../../../../components/common/notification";
import alerts from "../../../../constants/alerts";
import { INSERT_PAYMENT_DETAILS } from "../../../../schema/mutations";
import { promiseResolver } from "../../../../utils/promiseResolver";

const { Option } = Select;

const ReceivedModal = ({ showModal, closeModal }) => {
    const [merchantList, setMerchantList] = useState([]);
    const [merchantName, setMerchantName] = useState("");
    const [receivedAmount, setReceivedAmount] = useState(0);
    const [orderList, setOrderList] = useState([]);
    const [selectedOrders, setSelectedOrders] = useState([]);

    //* fetch enterprise list
    const {
        // eslint-disable-next-line no-unused-vars
        loading,
        // eslint-disable-next-line no-unused-vars
        error,
        // data: slipData,
    } = useQuery(FETCH_ENTERPRISE_LIST, {
        variables: {
            organizationId: "195bb0b1-3b81-4435-ad2f-b1a051fce77b",
        },
        onCompleted: (data) => {
            const result = data?.enterpriseDetails;
            setMerchantList(result);
        },
    });
    const {
        // eslint-disable-next-line no-unused-vars
        loading: slipListLoading,
        // eslint-disable-next-line no-unused-vars
        error: slipListError,
        // data: slipData,
    } = useQuery(GET_SLIPS_LIST, {
        variables: {
            where: {
                organizationId: { _eq: "195bb0b1-3b81-4435-ad2f-b1a051fce77b" },
                enterpriseId: { _eq: merchantName },
                payment_status: { _eq: "incomplete" },
            },
        },
        onCompleted: (data) => {
            const result = data?.slips_slip;
            setOrderList(result);
        },
    });

    //* insert payment
    const [
        insertPaymentsDetails,
        {
            // eslint-disable-next-line no-unused-vars
            loading: insertPaymentsDetailsLoading,
            // eslint-disable-next-line no-unused-vars
            error: insertPaymentsDetailsError,
            // data: slipData,
        },
    ] = useMutation(INSERT_PAYMENT_DETAILS);

    //* columns
    const columns = [
        {
            title: "Order Date",
            dataIndex: "created_at",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Total Amount",
            dataIndex: "totalAmount",
        },
        {
            title: "Received Amount",
            dataIndex: "receivedAmount",
        },
        {
            title: "Balance Amount",
            dataIndex: "balanceAmount",
        },
    ];
    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
            setSelectedOrders(selectedRows);
        },
        getCheckboxProps: (record) => ({
            // Column configuration not to be checked
            id: record.id,
        }),
    };

    //* handlers
    const handleReceivedAmount = (e) => {
        const value = e.target.value || 0;
        // if (!/[0-9]/.test(event.key)) {
        //     event.preventDefault();
        //   }
        setReceivedAmount(value);
    };
    const handleOnSubmit = async () => {
        // check selected order
        if (!selectedOrders.length) {
            return openNotification(alerts.ERROR, "Please select order", 3);
        }
        // received amount < = billed amount
        const billedAmount = selectedOrders.reduce(
            (acc, order) => acc + order.balanceAmount,
            0
        );
        const isValidAmount = billedAmount - receivedAmount >= 0 ?? false;
        if (!isValidAmount) {
            return openNotification(
                alerts.ERROR,
                "Please enter valid amount",
                3
            );
        }

        let remainingAmount = receivedAmount;

        const paymentDetails = selectedOrders.map((order) => {
            const received = Math.min(order.balanceAmount, remainingAmount);
            remainingAmount -= received;
            return {
                amount_received: received,
                enterprise_id: merchantName,
                org_id: "195bb0b1-3b81-4435-ad2f-b1a051fce77b",
                payment_mode: "cash",
                receipt_date: "2025-03-11",
                return_item_amount: 0,
                order_id: order.id,
            };
        });

        try {
            const [insertPaymentDetailsData, insertPaymentDetailsError] =
                await promiseResolver(
                    insertPaymentsDetails({
                        variables: {
                            objects: paymentDetails,
                        },
                        onCompleted: closeModal,
                    })
                );
            if (insertPaymentDetailsError) {
                throw new Error("payment failed");
            }
            openNotification(alerts.SUCCESS, "Slip sent successfully.", 3);
        } catch (error) {
            openNotification(alerts.ERROR, "Failed.", 3);
            throw new Error("Failed order creation.", error);
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
            <div
                className="w-full bg-white text-gray-600 
                        flex flex-col"
            >
                <div className="flex justify-center ">
                    <Select
                        value={merchantName}
                        style={{
                            marginTop: "0.25rem",
                            width: 240,
                            fontSize: "15px",
                            border: "0",
                            borderRadius: "6px",
                        }}
                        size="large"
                        onChange={(value) => setMerchantName(value)}
                        placeholder="Enter Merchant Name"
                    >
                        {merchantList?.length > 0
                            ? merchantList.map((item) => (
                                  <React.Fragment key={item.id}>
                                      <Option value={item.id}>
                                          {item.label}
                                      </Option>
                                  </React.Fragment>
                              ))
                            : null}
                    </Select>
                </div>
            </div>
            <div>
                <Table
                    rowKey={(record) => record.id}
                    rowSelection={{
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={orderList}
                />
            </div>
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <span>Total Amount :</span>
                    <span>
                        {selectedOrders.reduce(
                            (acc, order) => acc + order.balanceAmount,
                            0
                        )}
                    </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div>Received Amount :</div>
                    <input
                        className="w-1/3 h-fit text-black border-y-black bg-slate-500 rounded px-2 py-1"
                        type="number"
                        value={receivedAmount}
                        onChange={(e) => handleReceivedAmount(e)}
                    />
                </div>
            </div>
            <div className="flex items-center justify-center gap-4">
                <button onClick={handleOnSubmit}>Print</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </ModalContainer>
    );
};
export default ReceivedModal;
