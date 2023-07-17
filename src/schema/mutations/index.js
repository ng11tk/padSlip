import { gql } from "@apollo/client";

export const INSERT_SLIP_DETAILS = gql`
  mutation INSERT_SLIP_DETAILS(
    $enterpriseId: String!
    $organizationId: String!
    $slipData: jsonb!
    $totalAmount: Int!
  ) {
    insert_slips_slip_one(
      object: {
        enterpriseId: $enterpriseId
        organizationId: $organizationId
        slipData: $slipData
        totalAmount: $totalAmount
      }
    ) {
      id
    }
  }
`;
