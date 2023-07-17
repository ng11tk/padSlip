import React, { useEffect, useState } from "react";
import ModalContainer from "../../../components/common/modal";
import RemoveComponent from "../../../assets/remove";
import openNotification from "../../../components/common/notification";
import alerts from "../../../constants/alerts";

const SlipModal = ({ showModal, closeModal }) => {
  const itemObj = {
    itemName: "",
    rate: null,
    quantity: null,
  };

  const [merchantName, setMerchantName] = useState("");
  const [itemList, setItemList] = useState([itemObj]);
  const [totalAmount, setTotalAmount] = useState(0);

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
    }
  };

  // remove item from list
  const removeItem = (index) => {
    const fetchItemList = itemList;
    if (fetchItemList.length > 1) {
      setItemList([...itemList.slice(0, index), ...itemList.slice(index + 1)]);
    } else {
      console.error("Minimum 1 item should be in list.");
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
        <div className="flex justify-center">
          <input
            className="text-black border-y-black bg-slate-500 rounded px-2 py-1"
            value={merchantName}
            placeholder="Enter Merchant Name"
            onChange={(e) => setMerchantName(e.target.value)}
          />
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
          <button
            onClick={() => {
              openNotification(alerts.SUCCESS, "Slip sent successfully.", 3);
            }}
          >
            Print
          </button>
          {/* <Link to={routes.dashboard}>Cancel</Link> */}
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default SlipModal;
