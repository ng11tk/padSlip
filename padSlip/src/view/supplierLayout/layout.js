import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";

const layout = () => {
    return (
        <div>
            <strong>layout</strong>
            <ul>
                <li>
                    <Link to={routes.suppliersList}>Suppliers List</Link>
                </li>
                <li>
                    <Link to={routes.slipsBase}>Slips</Link>
                </li>
            </ul>
        </div>
    );
};

export default layout;
