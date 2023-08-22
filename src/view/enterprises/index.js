import React, { useState } from "react";
import { FETCH_ENTERPRISE_LIST } from "../../schema/queries";
import { useQuery } from "@apollo/client";
import CreateEnterprise from "./modals/createEnterprise";
import { Link } from "react-router-dom";

const Enterprises = () => {
  const [enterpriseList, setEnterpriseList] = useState([]);
  const [openCreateEnterpriseModal, setOpenCreateEnterpriseModal] =
    useState(false);

  //* fetch enterprise
  const { loading, error } = useQuery(FETCH_ENTERPRISE_LIST, {
    variables: {
      organizationId: "195bb0b1-3b81-4435-ad2f-b1a051fce77b",
    },
    onCompleted: (data) => {
      const result = data?.enterpriseDetails || [];
      setEnterpriseList(result);
    },
  });

  // modals
  const closeCreateEnterpriseModal = () => {
    setOpenCreateEnterpriseModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="w-full h-full">
      <div
        key={""}
        className="bg-slate-400 p-2 cursor-pointer"
        onClick={() => setOpenCreateEnterpriseModal(true)}
      >
        +{" "}
      </div>

      <div
        className="grid gap-4 mt-4
                    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {enterpriseList.length > 0 &&
          enterpriseList.map((eachEnterprise) => {
            return (
              <Link to={`/enterprises/${eachEnterprise.id}`}>
                <div
                  key={eachEnterprise.id}
                  className="w-full bg-slate-400 p-2"
                >
                  <div className="flex justify-between items-start flex-col">
                    <div>
                      <span>Ent. Name :</span>&nbsp;
                      <span>{eachEnterprise.label}</span>
                    </div>
                    <div>
                      <span>Remaining Balance :</span>&nbsp;
                      <span>{eachEnterprise?.totalAmount || 0}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>

      {openCreateEnterpriseModal && (
        <CreateEnterprise
          showModal={openCreateEnterpriseModal}
          closeModal={closeCreateEnterpriseModal}
        />
      )}
    </div>
  );
};

export default Enterprises;

//todo: add new enterprise
//todo: give search bar for enterprise
