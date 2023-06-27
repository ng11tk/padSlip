import React, { useEffect, useState } from "react";
import RemoveComponent from "../assets/remove";

const Slip = () => {
  const itemObj = {
    itemName: "",
    rate: 0,
    quantity: 0,
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
    <div className="w-auto h-96 p-4 rounded-xl bg-white text-gray-600">
      <div>
        <input
          className="text-black border-y-black bg-slate-500 rounded px-2 py-1"
          value={merchantName}
          placeholder="Enter Merchant Name"
          onChange={(e) => setMerchantName(e.target.value)}
        />
      </div>
      <div
        className="m-4 inline-grid gap-2 justify-items-start 
                    h-4/6 justify-center overflow-scroll"
      >
        {itemList?.map((eachItem, index) => {
          return (
            <div key={index} className="flex items-center gap-2">
              <div>{`${index + 1}.`}</div>
              <div className="flex gap-2">
                <input
                  className="text-black border-y-black bg-slate-500 rounded px-2 py-1"
                  value={eachItem?.itemName}
                  placeholder="Enter Item Name"
                  onChange={(e) =>
                    handleOnChange(e, "itemName", eachItem, index)
                  }
                />
                <input
                  className="text-black border-y-black bg-slate-500 rounded px-2 py-1"
                  value={eachItem?.rate}
                  onChange={(e) => handleOnChange(e, "rate", eachItem, index)}
                />
                <input
                  className="text-black border-y-black bg-slate-500 rounded px-2 py-1"
                  value={eachItem?.quantity}
                  onChange={(e) =>
                    handleOnChange(e, "quantity", eachItem, index)
                  }
                />
              </div>
              <div className="cursor-pointer" onClick={() => removeItem(index)}>
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
      <div>
        <button>Print</button>
      </div>
    </div>
  );
};

export default Slip;
