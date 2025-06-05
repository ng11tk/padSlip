import React from "react";
import { Link } from "react-router-dom";
import routes from "../../../../routes";

const PurchaserHeader = () => {
    return (
        <header className="h-20 p-4 w-full flex justify-between items-center relative">
            <Link to={routes.dashboard} className="w-1/2 flex">
                PadSlip
            </Link>
            <nav className="w-1/2">
                <div>
                    <ul className="list-none flex gap-4">
                        <li>
                            <Link to={routes.purchaser}>Home</Link>
                        </li>
                        <li>
                            <Link to={routes.enterprises}>Enterprises</Link>
                        </li>
                        <li>
                            <Link to={routes.records}>Records</Link>
                        </li>
                        <li>
                            <Link to={routes.statistics}>Statistics</Link>
                        </li>
                        <li>
                            <Link to={routes.settings}>Org</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default PurchaserHeader;
