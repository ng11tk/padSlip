import React from "react";
import axios from "axios";

const Settings = () => {
  const getData = async () => {
    const options = {
      method: "GET",
      url: "http://localhost:5000/getData",
      params: {},
    };

    const resData = await axios.request(options);
    console.log("🚀 ~ file: index.js:10 ~ getData ~ resData:", resData.data);
  };

  return (
    <div className="cursor-pointer" onClick={() => getData()}>
      Coming Soon
    </div>
  );
};

export default Settings;
