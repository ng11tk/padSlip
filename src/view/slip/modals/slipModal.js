import React, { useEffect, useState } from "react";
import ModalContainer from "../../../components/common/modal";
import RemoveComponent from "../../../assets/remove";
import openNotification from "../../../components/common/notification";
import alerts from "../../../constants/alerts";
import { Select } from "antd";
import { gql, useMutation, useQuery } from "@apollo/client";
const { Option } = Select;

const FETCH_ENTERPRISE_LIST = gql`
  query FETCH_ENTERPRISE_LIST($organizationId: String!) {
    enterpriseDetails: enterprises_enterprise(
      where: { organizationId: { _eq: $organizationId } }
    ) {
      id
      label
    }
  }
`;

const INSERT_SLIP_DETAILS = gql`
  mutation INSERT_SLIP_DETAILS(
    $enterpriseId: String!
    $organizationId: String!
    $slipData: jsonb!
    $totalAmount: Int!
  ) {
    insert_slips_slip_one(
      object: {
        enterpriseId: $enterpriseId
        organizationId: $organizationId
        slipData: $slipData
        totalAmount: $totalAmount
      }
    ) {
      id
    }
  }
`;

const SlipModal = ({ showModal, closeModal }) => {
  const itemObj = {
    itemName: "",
    rate: null,
    quantity: null,
  };

  const [merchantName, setMerchantName] = useState("");
  const [itemList, setItemList] = useState([itemObj]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [merchantList, setMerchantList] = useState([]);

  // fetch enterprise list
  const {
    loading,
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
      loading: slipInsetLoading,
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
    insertSlip({
      variables: {
        enterpriseId: merchantName,
        organizationId: "195bb0b1-3b81-4435-ad2f-b1a051fce77b",
        slipData: itemList,
        totalAmount: totalAmount,
      },
      onCompleted: closeModal,
    });
    openNotification(alerts.SUCCESS, "Slip sent successfully.", 3);
  };

  console.log("🚀 ~ file: index.js:12 ~ Slip ~ itemList:", itemList);

  return (
    <ModalContainer
      bodyStyle={{ background: "#2F3B52" }}
      visible={showModal}
      width={"600px"}
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
                    <Option
                      value={item.id}
                    >
                      {item.label}
                    </Option>
                  </React.Fragment>
                ))
              : null}
          </Select>
        </div>
        <div
          className="w-full overflow-scroll gap-2
                        flex flex-col"
        >
          {itemList?.map((eachItem, index) => {
            return (
              <div
                key={index}
                className="w-full flex flex-row items-center gap-3"
              >
                <div className="w-1/10">{`${index + 1}.`}</div>
                <div className="flex gap-2">
                  <input
                    className="w-1/3 text-black border-y-black bg-slate-500 rounded px-2 py-1"
                    value={eachItem?.itemName}
                    placeholder="Enter Item Name"
                    onChange={(e) =>
                      handleOnChange(e, "itemName", eachItem, index)
                    }
                  />
                  <input
                    className="w-1/3 text-black border-y-black bg-slate-500 rounded px-2 py-1"
                    value={eachItem?.rate}
                    onChange={(e) => handleOnChange(e, "rate", eachItem, index)}
                    placeholder="Enter Item Rate"
                  />
                  <input
                    className="w-1/3 text-black border-y-black bg-slate-500 rounded px-2 py-1"
                    value={eachItem?.quantity}
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
          <div className="w-full flex justify-between">
            <div className="cursor-pointer" onClick={() => handleAddItem()}>
              + Add item
            </div>
            {itemList.length > 0 && (
              <div>
                <span>Total :</span>
                <span>{totalAmount}</span>
              </div>
            )}
          </div>
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