import React, { useEffect, useState } from "react";
import { FETCH_ENTERPRISE_LIST } from "../../schema/queries/index.js";
import { useQuery } from "@apollo/client";
import CreateEnterprise from "./modals/createEnterprise/index.js";
import { Link } from "react-router-dom";

const Enterprises = () => {
  const [enterpriseList, setEnterpriseList] = useState([]);
  const [openCreateEnterpriseModal, setOpenCreateEnterpriseModal] =
    useState(false);
  const [searchEnterprise, setSearchEnterprise] = useState("");
  const [filteredEnterpriseList, setFilteredEnterpriseList] = useState([]);
 
  //* fetch enterprise
  const { loading, error } = useQuery(FETCH_ENTERPRISE_LIST, {
    variables: {
      organizationId: "195bb0b1-3b81-4435-ad2f-b1a051fce77b",
    },
    onCompleted: (data) => {
      const result = data?.enterpriseDetails || [];
      setEnterpriseList(result);
      setFilteredEnterpriseList(result);
    },
  });

  // handler
  const RemainingBalance = (amountArray) => {
    const total = amountArray.reduce(
      (prevValue, currentValue) => prevValue + currentValue.balanceAmount,
      0
    );
    return total;
  };

  // modals
  const closeCreateEnterpriseModal = () => {
    setOpenCreateEnterpriseModal(false);
  };

  // handler
  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearchEnterprise(value);
  };

  // search function
  useEffect(() => {
    const filteredEnterprise = enterpriseList.filter((eachEnterprise) => {
      return eachEnterprise.label
        .toLowerCase()
        .includes(searchEnterprise.toLowerCase());
    });

    setFilteredEnterpriseList(filteredEnterprise);
  }, [enterpriseList, searchEnterprise]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="w-full h-full">
      <div>
        <div className="text-left font-medium">Enterprise</div>

        <input
          className="px-2"
          style={{ border: "2px solid lightslategrey" }}
          placeholder="Search Enterprise..."
          value={searchEnterprise}
          onChange={handleOnChange}
        />
      </div>

      <div
        className="bg-slate-400 p-2 mt-4 cursor-pointer"
        onClick={() => setOpenCreateEnterpriseModal(true)}
      >
        +{" "}
      </div>
      {!filteredEnterpriseList.length ? (
        <div className="mt-4">Data not found</div>
      ) : (
        <div
          className="grid gap-4 mt-4
                    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {filteredEnterpriseList.map((eachEnterprise) => {
            return (
              <Link
                to={`/enterprises/${eachEnterprise.id}`}
                key={eachEnterprise.id}
              >
                <div className="w-full bg-slate-400 p-2">
                  <div className="flex justify-between items-start flex-col">
                    <div>
                      <span>Ent. Name :</span>&nbsp;
                      <span>{eachEnterprise.label}</span>
                    </div>
                    <div>
                      <span>Remaining Balance :</span>&nbsp;
                      <span>
                        {RemainingBalance(eachEnterprise?.enterprise_slips)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

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
