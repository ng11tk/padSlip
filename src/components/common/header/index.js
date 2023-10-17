import React from "react";
import { NavLink } from "react-router-dom";
import routes from "../../../routes";

const Header = () => {
  return (
    <header
      className="h-20 p-4 w-full
                    flex justify-between items-center relative"
    >
      <NavLink to={routes.dashboard} className="w-1/2 flex">
        PadSlip
      </NavLink>
      <nav className="w-1/2">
        <div>
          <ul className="list-none flex gap-4">
            <li>
              <NavLink to={routes.dashboard}>Home</NavLink>
            </li>
            <li>
              <NavLink to={routes.enterprises}>Enterprises</NavLink>
            </li>
            <li>
              <NavLink to={routes.records}>Records</NavLink>
            </li>
            <li>
              <NavLink to={routes.statistics}>Statistics</NavLink>
            </li>
            <li>
              <NavLink to={routes.settings}>Org</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
