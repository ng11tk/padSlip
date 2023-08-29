import { gql } from "@apollo/client";

export const INSERT_SLIP_DETAILS = gql`
  mutation INSERT_SLIP_DETAILS($object: slips_slip_insert_input!) {
    insert_slips_slip_one(object: $object) {
      id
    }
  }
`;

export const INSERT_ENTERPRISE_DETAILS = gql`
  mutation INSERT_ENTERPRISE_DETAILS(
    $label: String!
    $organizationId: String!
  ) {
    insert_enterprises_enterprise_one(
      object: { label: $label, organizationId: $organizationId }
    ) {
      id
    }
  }
`;
