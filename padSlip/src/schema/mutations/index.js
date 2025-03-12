import { gql } from "@apollo/client";

export const INSERT_SLIP_DETAILS = gql`
    mutation INSERT_SLIP_DETAILS($object: slips_slip_insert_input!) {
        orderDetails: insert_slips_slip_one(object: $object) {
            id
        }
    }
`;

export const INSERT_ENTERPRISE_DETAILS = gql`
    mutation INSERT_ENTERPRISE_DETAILS(
        $object: enterprises_enterprise_insert_input!
    ) {
        insert_enterprises_enterprise_one(object: $object) {
            id
            label
        }
    }
`;

export const INSERT_PAYMENT_DETAILS = gql`
    mutation INSERT_PAYMENT_DETAILS(
        $objects: [slips_receive_slip_insert_input!] = {}
    ) {
        insert_slips_receive_slip(objects: $objects) {
            affected_rows
        }
    }
`;

export const DELETE_SLIP_BY_PK = gql`
    mutation DELETE_SLIP_BY_PK($id: String = "") {
        deleteSlip: delete_slips_slip_by_pk(id: $id) {
            id
        }
    }
`;
