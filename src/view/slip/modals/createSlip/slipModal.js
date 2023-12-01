import React, { useEffect, useState } from "react";
import ModalContainer from "../../../../components/common/modal";
import RemoveComponent from "../../../../assets/remove";
import openNotification from "../../../../components/common/notification";
import alerts from "../../../../constants/alerts";
import { Select } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { INSERT_SLIP_DETAILS } from "../../../../schema/mutations";
import { FETCH_ENTERPRISE_LIST } from "../../../../schema/queries";
const { Option } = Select;

const SlipModal = ({ showModal, closeModal }) => {
  const itemObj = {
    itemName: "",
    rate: null,
    quantity: null,
  };

  const [merchantList, setMerchantList] = useState([]);
  const [merchantName, setMerchantName] = useState("");
  const [itemList, setItemList] = useState([itemObj]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [receivedAmount, setReceivedAmount] = useState(0);

  // fetch enterprise list
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
      const result = data.enterpriseDetails;
      setMerchantList(result);
    },
  });

  // mutation for slip insert
  const [
    insertSlip,
    {
      // eslint-disable-next-line no-unused-vars
      loading: slipInsetLoading,
      // eslint-disable-next-line no-unused-vars
      error: slipInsertError,
      // data: slipData,
    },
  ] = useMutation(INSERT_SLIP_DETAILS);

  // handle item values
  const handleOnChange = (e, field, eachItem, index) => {
    const value = e.target.value;
    let parseValue;
    if (field === "rate") {
      parseValue = parseFloat(value) || 0;
    } else if (field === "quantity") {
      parseValue = parseInt(value) || 0;
    } else {
      parseValue = value;
    }
    const updatedItem = { ...itemList[index], [field]: parseValue };
    const updatedItemList = [
      ...itemList.slice(0, index),
      updatedItem,
      ...itemList.slice(index + 1),
    ];
    setItemList(updatedItemList);
  };

  // handle adding new item
  const handleAddItem = () => {
    const fetchItemList = itemList;
    const lastItem = itemList[fetchItemList.length - 1];

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
  };

  // remove item from list
  const removeItem = (index) => {
    const fetchItemList = itemList;
    if (fetchItemList.length > 1) {
      setItemList([...itemList.slice(0, index), ...itemList.slice(index + 1)]);
      return openNotification(alerts.SUCCESS, "Item removed successfully.", 3);
    } else {
      console.error("Minimum 1 item should be in list.");
      return openNotification(
        alerts.ERROR,
        "Minimum 1 item should be in list.",
        3
      );
    }
  };

  // for calculating the total amount
  useEffect(() => {
    const total = itemList.reduce(
      (prevValue, currentValue) =>
        prevValue + currentValue.rate * currentValue.quantity,
      0
    );
    setTotalAmount(total);
  }, [itemList]);

  // handle onSubmit
  const handleOnSubmit = () => {
    const isMerchantValid = merchantName.length > 0;
    const isListValid = itemList.every((item) => {
      return (
        item.itemName.length > 0 && item.rate !== null && item.quantity !== null
      );
    });

    if (!isMerchantValid) {
      return openNotification(alerts.ERROR, "Please provide valid merchant", 3);
    }
    if (!isListValid) {
      return openNotification(alerts.ERROR, "Please fill all item details", 3);
    }

    const insertObject = {
      enterpriseId: merchantName,
      organizationId: "195bb0b1-3b81-4435-ad2f-b1a051fce77b",
      slipData: itemList,
      totalAmount: totalAmount,
      receivedAmount: receivedAmount,
      balanceAmount: totalAmount - receivedAmount,
    };

    insertSlip({
      variables: {
        object: insertObject,
      },
      onCompleted: closeModal,
    });
    openNotification(alerts.SUCCESS, "Slip sent successfully.", 3);
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
            // className="text-black border-y-black bg-slate-500 rounded px-2 py-1"
            value={merchantName}
            style={{
              marginTop: "0.25rem",
              width: 240,
              fontSize: "15px",
              // background: "#20293C",
              border: "0",
              borderRadius: "6px",
            }}
            size="large"
            onChange={(value) => setMerchantName(value)}
            placeholder="Enter Merchant Name"
          >
            {merchantList?.length > 0
              ? merchantList.map((item, index) => (
                  <React.Fragment key={index}>
                    <Option value={item.id}>{item.label}</Option>
                  </React.Fragment>
                ))
              : null}
          </Select>
        </div>
        <div
          className="w-full overflow-auto gap-2
                        flex flex-col"
        >
          {itemList?.map((eachItem, index) => {
            return (
              <div
                key={index}
                className="w-full flex flex-row items-center justify-between gap-3"
              >
                <div className="w-1/10">{`${index + 1}.`}</div>
                <div className="flex w-full gap-2">
                  <input
                    className="w-1/3 text-black border-y-black bg-slate-500 rounded px-2 py-1"
                    value={eachItem?.itemName || ""}
                    placeholder="Enter Item Name"
                    onChange={(e) =>
                      handleOnChange(e, "itemName", eachItem, index)
                    }
                  />
                  <input
                    className="w-1/3 text-black border-y-black bg-slate-500 rounded px-2 py-1"
                    value={eachItem?.rate || 0}
                    onChange={(e) => handleOnChange(e, "rate", eachItem, index)}
                    placeholder="Enter Item Rate"
                  />
                  <input
                    className="w-1/3 text-black border-y-black bg-slate-500 rounded px-2 py-1"
                    value={eachItem?.quantity || 0}
                    onChange={(e) =>
                      handleOnChange(e, "quantity", eachItem, index)
                    }
                    placeholder="Enter Item Quantity"
                  />
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => removeItem(index)}
                >
                  <RemoveComponent />
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => handleAddItem()}>
            + Add item
          </div>
          <div className="flex items-center gap-4">
            <div>Received Amount :</div>
            <input
              className="w-1/3 h-fit text-black border-y-black bg-slate-500 rounded px-2 py-1"
              type="number"
              value={receivedAmount}
              onChange={(e) => handleReceivedAmount(e)}
              // onKeyPress={(event) => {
              //   if (!/[0-9]/.test(event.key)) {
              //     event.preventDefault();
              //   }
              // }}
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
          {/* <Link to={routes.dashboard}>Cancel</Link> */}
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default SlipModal;
