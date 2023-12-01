import React from "react";
import axios from "axios";

const Statistics = () => {
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
    <div className="h-full w-full">
      <div className="text-left font-medium	">Statistics</div>
      <div className="cursor-pointer mt-4" onClick={() => getData()}>
        Coming Soon
      </div>
    </div>
  );
};

export default Statistics;
