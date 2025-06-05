import React from "react";
import routes from "../../../routes";
import { Link } from "react-router-dom";

const slips = () => {
    return (
        <div>
            <strong>Slips</strong>
            <ul>
                <li>
                    <Link to={routes.generateOrderSlip}>Generate Order</Link>
                </li>
                <li>
                    <Link to={routes.receivingOrderSlip}>Receiving Order</Link>
                </li>
                <li>
                    <Link to={routes.depositSlip}>Deposit Slip</Link>
                </li>
            </ul>
        </div>
    );
};

export default slips;