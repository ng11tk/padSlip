import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DatePicker, Segmented, Select } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import ModalContainer from "../../../../components/common/modal.js";
import { RemoveComponent } from "../../../../assets/remove.js";
import openNotification from "../../../../components/common/notification.js";
import alerts from "../../../../constants/alerts.js";
import {
    DELETE_SLIP_BY_PK,
    INSERT_PAYMENT_DETAILS,
    INSERT_SLIP_DETAILS,
} from "../../../../schema/mutations/index.js";
import { FETCH_ENTERPRISE_LIST } from "../../../../schema/queries/index.js";
import { promiseResolver } from "../../../../utils/promiseResolver.js";

const { Option } = Select;

const SlipModal = ({ showModal, closeModal }) => {
    const itemObj = {
        id: uuidv4(),
        itemName: "",
        rate: null,
        quantity: null,
    };

    const [merchantList, setMerchantList] = useState([]);
    const [merchantName, setMerchantName] = useState("");
    const [itemList, setItemList] = useState([itemObj]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [receivedAmount, setReceivedAmount] = useState(0);
    const [slipType, setSlipType] = useState();
    const [deliveryStatus, setDeliveryStatus] = useState();
    const [deliveryDate, setDeliveryDate] = useState();

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

    //* mutation for slip insert
    const [
        insertSlip,
        {
            // eslint-disable-next-line no-unused-vars
            loading: slipInsetLoading,
            // eslint-disable-next-line no-unused-vars
            error: slipInsertError,
        },
    ] = useMutation(INSERT_SLIP_DETAILS);
    const [
        insertPaymentDetails,
        {
            // eslint-disable-next-line no-unused-vars
            loading: insertPaymentDetailsLoading,
            // eslint-disable-next-line no-unused-vars
            error: insertPaymentDetailsError,
            // data: slipData,
        },
    ] = useMutation(INSERT_PAYMENT_DETAILS);
    const [deleteSlip] = useMutation(DELETE_SLIP_BY_PK);

    //* handle item values
    const parseFieldValue = (value, field) => {
        switch (field) {
            case "rate":
                return parseFloat(value) || 0;
            case "quantity":
                return parseInt(value, 10) || 0;
            default:
                return value;
        }
    };
    const handleOnChange = (e, field, eachItem) => {
        const { value } = e.target;
        const parseValue = parseFieldValue(value, field);

        const updatedItemList = itemList.map((item) =>
            item.id === eachItem.id ? { ...item, [field]: parseValue } : item
        );

        setItemList(updatedItemList);
    };

    //* handle adding new item
    const handleAddItem = useCallback(() => {
        // const fetchItemList = itemList;
        const lastItem = itemList[itemList.length - 1];

        if (lastItem?.itemName?.length > 0) {
            setItemList([...itemList, itemObj]);
        } else {
            console.error("Please fill all items in list");
            return openNotification(
                alerts.ERROR,
                "Please fill last item details.",
                3
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemList]);

    //* remove item from list
    const removeItem = (itemId) => {
        setItemList((prevList) => {
            if (prevList.length <= 1) {
                console.error("Minimum 1 item should be in list.");
                openNotification(
                    alerts.ERROR,
                    "Minimum 1 item should be in list.",
                    3
                );
                return prevList;
            }

            const updatedItemList = prevList.filter(
                (item) => item.id !== itemId
            );

            openNotification(alerts.SUCCESS, "Item removed successfully.", 3);
            return updatedItemList;
        });
    };

    //* for calculating the total amount
    useEffect(() => {
        const total = itemList.reduce(
            (prevValue, currentValue) =>
                prevValue + currentValue.rate * currentValue.quantity,
            0
        );
        setTotalAmount(total);
    }, [itemList]);

    //* handle onSubmit
    const handleOnSubmit = async () => {
        let orderId;
        const isMerchantValid = merchantName.length > 0;
        const isListValid = itemList.every((item) => {
            return (
                item.itemName.length > 0 &&
                item.rate !== null &&
                item.quantity !== null
            );
        });

        if (!isMerchantValid) {
            return openNotification(
                alerts.ERROR,
                "Please provide valid merchant",
                3
            );
        }
        if (!isListValid) {
            return openNotification(
                alerts.ERROR,
                "Please fill all item details",
                3
            );
        }

        const insertOrderDetails = {
            enterpriseId: merchantName,
            organizationId: "195bb0b1-3b81-4435-ad2f-b1a051fce77b",
            slipData: itemList,
            totalAmount: totalAmount,
            balanceAmount: totalAmount - receivedAmount,
            slip_type: slipType,
            delivery_date: deliveryDate,
            delivery_status: deliveryStatus,
        };
        const paymentDetails = {
            amount_received: receivedAmount,
            enterprise_id: merchantName,
            org_id: "195bb0b1-3b81-4435-ad2f-b1a051fce77b",
            payment_mode: "cash",
            receipt_date: "2025-03-11",
            return_item_amount: 0,
        };

        try {
            const [{ data }, insertSlipError] = await promiseResolver(
                insertSlip({
                    variables: {
                        object: insertOrderDetails,
                    },
                })
            );
            if (insertSlipError) {
                throw new Error("Order creation failed");
            }
            orderId = data?.orderDetails?.id;
            const [insertPaymentDetailsData, insertPaymentDetailsError] =
                await promiseResolver(
                    insertPaymentDetails({
                        variables: {
                            objects: {
                                ...paymentDetails,
                                order_id: orderId,
                            },
                        },
                        onCompleted: closeModal,
                    })
                );
            if (insertPaymentDetailsError) {
                throw new Error("payment failed");
            }
            openNotification(alerts.SUCCESS, "Slip sent successfully.", 3);
        } catch (error) {
            console.log("🚀 ~ handleOnSubmit ~ error:", error);
            openNotification(alerts.ERROR, "Failed.", 3);

            if (orderId) {
                // Rollback: Delete the created slip if payment update fails
                const [deleteSlipData, deleteSlipError] = await promiseResolver(
                    deleteSlip({
                        variables: {
                            id: orderId,
                        },
                    })
                );
                if (deleteSlipError) {
                    throw new Error("Rollback failed.");
                }
            }
            throw new Error("Failed order creation.");
        }
    };

    const handleReceivedAmount = (e) => {
        const value = e.target.value || 0;
        // if (!/[0-9]/.test(event.key)) {
        //     event.preventDefault();
        //   }
        setReceivedAmount(value);
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
                className="w-full h-96 gap-4 bg-white text-gray-600 
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
                <div className="flex justify-between">
                    <div>
                        <span>Slip Type: </span>
                        <Segmented
                            options={["Cash", "Order"]}
                            defaultValue="Cash"
                            onChange={(value) => {
                                console.log(value.toLowerCase()); // string
                                setSlipType(value.toLowerCase());
                            }}
                        />
                    </div>
                    <div>
                        <span>Delivery Date: </span>
                        <DatePicker
                            onChange={(date, dateString) => {
                                console.log(date, dateString);
                                setDeliveryDate(dateString);
                            }}
                        />
                    </div>

                    <div>
                        <span>Delivery Status: </span>
                        <Segmented
                            options={["Pending", "Completed"]}
                            defaultValue={"Completed"}
                            onChange={(value) => {
                                console.log(value.toLowerCase()); // string
                                setDeliveryStatus(value.toLowerCase());
                            }}
                        />
                    </div>
                </div>
                <div
                    className="w-full overflow-auto gap-2
                        flex flex-col"
                >
                    {itemList?.map((eachItem, index) => {
                        return (
                            <div
                                key={eachItem.id}
                                className="w-full flex flex-row items-center justify-between gap-3"
                            >
                                <div className="w-1/10">{`${index + 1}.`}</div>
                                <div className="flex w-full gap-2">
                                    <input
                                        className="w-1/3 text-black border-y-black bg-slate-500 rounded px-2 py-1"
                                        value={eachItem?.itemName || ""}
                                        placeholder="Enter Item Name"
                                        onChange={(e) =>
                                            handleOnChange(
                                                e,
                                                "itemName",
                                                eachItem
                                            )
                                        }
                                    />
                                    <input
                                        className="w-1/3 text-black border-y-black bg-slate-500 rounded px-2 py-1"
                                        value={eachItem?.rate || 0}
                                        onChange={(e) =>
                                            handleOnChange(e, "rate", eachItem)
                                        }
                                        placeholder="Enter Item Rate"
                                    />
                                    <input
                                        className="w-1/3 text-black border-y-black bg-slate-500 rounded px-2 py-1"
                                        value={eachItem?.quantity || 0}
                                        onChange={(e) =>
                                            handleOnChange(
                                                e,
                                                "quantity",
                                                eachItem
                                            )
                                        }
                                        placeholder="Enter Item Quantity"
                                    />
                                </div>
                                <div
                                    className="cursor-pointer"
                                    onClick={() => removeItem(eachItem.id)}
                                >
                                    <RemoveComponent />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="w-full flex justify-between items-center">
                    <div
                        className="cursor-pointer"
                        onClick={() => handleAddItem()}
                    >
                        + Add item
                    </div>
                    <div className="flex items-center gap-4">
                        <div>Received Amount :</div>
                        <input
                            className="w-1/3 h-fit text-black border-y-black bg-slate-500 rounded px-2 py-1"
                            type="number"
                            value={receivedAmount}
                            onChange={(e) => handleReceivedAmount(e)}
                        />
                    </div>
                    {itemList.length > 0 && (
                        <div>
                            <div>
                                <span>Total Amount :</span>
                                <span>{totalAmount}</span>
                            </div>
                            <div>
                                <span>Received Amount :</span>
                                <span>{receivedAmount}</span>
                            </div>
                            <div>
                                <span>Balance Amount :</span>
                                <span>{totalAmount - receivedAmount}</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-center gap-4">
                    <button onClick={handleOnSubmit}>Print</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </ModalContainer>
    );
};

export default SlipModal;
