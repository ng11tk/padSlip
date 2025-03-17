import { gql } from "@apollo/client";

export const GET_SLIPS = gql`
    query GET_SLIPS(
        $organizationId: String!
        $filterRange: bigint_comparison_exp = {}
    ) {
        getSlips: slips_slip(
            where: {
                organizationId: { _eq: $organizationId }
                created_at: $filterRange
            }
            order_by: { created_at: desc_nulls_first }
        ) {
            id
            organizationId
            slipData
            totalAmount
            receivedAmount
            balanceAmount
            created_at
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
            enterprise_slips {
                balanceAmount
            }
        }
    }
`;

export const GET_ENTERPRISE_SLIPS = gql`
    query GET_ENTERPRISE_SLIPS(
        $enterpriseId: String!
        $organizationId: String!
    ) {
        enterpriseSlips: enterprises_enterprise(
            where: {
                id: { _eq: $enterpriseId }
                organizationId: { _eq: $organizationId }
            }
        ) {
            id
            label
            address
            phone
            proprietor
            enterprise_slips(order_by: { created_at: desc_nulls_first }) {
                id
                slipData
                totalAmount
                receivedAmount
                balanceAmount
                created_at
            }
        }
    }
`;

export const GET_SLIPS_LIST = gql`
    query MyQuery($where: slips_slip_bool_exp = {}) {
        slips_slip(where: $where) {
            id
            balanceAmount
            receivedAmount
            totalAmount
            payment_status
            created_at
        }
    }
`;
