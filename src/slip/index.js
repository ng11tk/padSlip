import React, { useState } from "react";
import RemoveComponent from "../assets/remove";

const Slip = () => {
  const [merchantName, setMerchantName] = useState("");
  const itemObj = {
    itemName: "",
    rate: 0,
    quantity: 0,
  };

  const [itemList, setItemList] = useState([]);

  const handleOnChange = (e, field, eachItem, index) => {
    const value = e.target.value;

    const updatedItem = { ...itemList[index], [field]: value };
    const updatedItemList = [
      ...itemList.slice(0, index),
      updatedItem,
      ...itemList.slice(index + 1),
    ];
    setItemList(updatedItemList);
  };

  const removeItem = (index) => {
    setItemList([...itemList.slice(0, index), ...itemList.slice(index + 1)]);
  };
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
            <div className="flex items-center gap-2">
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
        <div
          className="cursor-pointer"
          onClick={() => setItemList([...itemList, itemObj])}
        >
          + Add item
        </div>
      </div>
      <div>
        <button>Print</button>
      </div>
    </div>
  );
};

export default Slip;
