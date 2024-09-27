import React from "react";
import axios from "axios";
import { CSVBoxButton } from "@csvbox/react";

const Settings = () => {
  const getData = async () => {
    const options = {
      method: "GET",
      url: "http://localhost:5000/getData",
      params: {},
    };

    const resData = await axios.request(options);
    console.log("🚀 ~ file: index.js:10 ~ getData ~ resData:", resData);
  };

  return (
    <div className="h-full w-full">
      <div className="text-left font-medium	">Organization</div>
      {/* <div className="cursor-pointer mt-4" onClick={getData}>
          Coming Soon...
        </div> */}
      <CSVBoxButton
        licenseKey="WMCj7R9oAqMqfgIeUpEtgUQOVbJUL9"
        user={{
          user_id: "default123",
        }}
        onImport={(result, data) => {
          if (result) {
            console.log("success");
            console.log(data.row_success + " rows uploaded");
            console.log("🚀 ~ Settings ~ data:", data);
            //custom code
          } else {
            console.log("fail");
            //custom code
          }
        }}
        render={(launch, isLoading) => {
          return (
            <button
              className="p-2 px-4 rounded bg-slate-300"
              disabled={isLoading}
              onClick={launch}
            >
              Upload file
            </button>
          );
        }}
      >
        Import
      </CSVBoxButton>
    </div>
  );
};

export default Settings;
