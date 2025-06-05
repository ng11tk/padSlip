import React from "react";
import { Link } from "react-router-dom";
import routes from "../../../../routes";

const SupplierHeader = () => {
    return (
        <header className="h-20 p-4 w-full flex justify-between items-center relative">
            <Link to={routes.dashboard} className="w-1/2 flex">
                PadSlip
            </Link>
            <nav className="w-1/2">
                <div>
                    <ul className="list-none flex gap-4">
                        <li>
                            <Link to={routes.purchaser}>Purchaser</Link>
                        </li>
                        <li>
                            <Link to={routes.supplier}>Supplier</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default SupplierHeader;
