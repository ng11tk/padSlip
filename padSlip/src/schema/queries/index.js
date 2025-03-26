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

export const GET_RECEIVED_SLIPS = gql`
    query GET_RECEIVED_SLIPS(
        $filterRange: bigint_comparison_exp = {}
        $organizationId: String = ""
    ) {
        receivedSlip: slips_receive_slip(
            where: {
                org_id: { _eq: $organizationId }
                created_at: $filterRange
            }
            order_by: { created_at: desc_nulls_first }
        ) {
            id
            order_id
            amount_received
            enterprise_id
            payment_mode
            receipt_date
            return_item_amount
            created_at
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
    query GET_SLIPS_LIST($where: slips_slip_bool_exp = {}) {
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
