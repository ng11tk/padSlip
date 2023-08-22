import { gql } from "@apollo/client";

export const GET_SLIPS = gql`
  query GET_SLIPS($organizationId: String!) {
    getSlips: slips_slip(where: { organizationId: { _eq: $organizationId } }) {
      id
      organizationId
      slipData
      totalAmount
      slip_enterprise {
        id
        label
      }
    }
  }
`;

export const FETCH_ENTERPRISE_LIST = gql`
  query FETCH_ENTERPRISE_LIST($organizationId: String!) {
    enterpriseDetails: enterprises_enterprise(
      where: { organizationId: { _eq: $organizationId } }
    ) {
      id
      label
    }
  }
`;
