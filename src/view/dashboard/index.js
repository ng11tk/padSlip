import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";

const customSlip = [
  {
    id: 0,
    orgName: "Jagdish Ent.",
    totalAmount: 232,
    lastUpdate: "jan 01, 2023",
  },
  {
    id: 1,
    orgName: "lokesh Ent.",
    totalAmount: 232,
    lastUpdate: "jan 01, 2023",
  },
];

const Dashboard = () => {
  return (
    <div className="w-full h-full gap-3 flex">
      <div>
        <Link to={routes.padSlip}>
          <div className="bg-slate-400 p-2 flex items-center "> + </div>
        </Link>
      </div>

      {customSlip.map((each) => {
        return (
          <div key={each.id} className="bg-slate-400 p-2">
            <div className="flex justify-between items-start flex-col">
              <div>
                <span>Org. Name :</span>&nbsp;<span>{each.orgName}</span>
              </div>
              <div>
                <span>Total amount :</span>&nbsp;
                <span>{each.totalAmount}</span>
              </div>
              <div>
                <span>Last slip :</span>&nbsp;<span>{each.lastUpdate}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
