import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GET_ENTERPRISE_SLIPS } from "../../../schema/queries";
import { useQuery } from "@apollo/client";

const EnterpriseDetails = () => {
  const { id } = useParams();
  const [enterpriseSlips, setEnterpriseSlips] = useState();

  //* fetch enterprise
  const { loading, error } = useQuery(GET_ENTERPRISE_SLIPS, {
    variables: {
      enterpriseId: id,
      organizationId: "195bb0b1-3b81-4435-ad2f-b1a051fce77b",
    },
    onCompleted: (data) => {
      const result = data?.enterpriseSlips || [];
      setEnterpriseSlips(result);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return <div>EnterpriseDetails</div>;
};

export default EnterpriseDetails;
