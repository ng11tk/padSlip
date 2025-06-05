import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Dashboard from "./view/dashboard/index.js";
import routes from "./routes.js";
import Enterprises from "./view/enterprises/index.js";
import {
    Header,
    PurchaserHeader,
    SupplierHeader,
} from "./components/common/header/index.js";
import EnterpriseDetails from "./view/enterprises/enterpriseDetails/index.js";
import Records from "./view/records/index.js";
import Statistics from "./view/statistics/index.js";
import Settings from "./view/settings/index.js";
import ErrorRoute from "./components/common/errorRoute.js";
import Login from "./view/login/index.js";

// Supplier Components
import SupplierLayout from "./view/supplierLayout/index.js";
import SupplierList from "./view/supplierLayout/suppliers/list.js";
import Slips from "./view/supplierLayout/slips/slips.js";
import GenerateOrder from "./view/supplierLayout/slips/generateOrder.js";
import ReceivingOrder from "./view/supplierLayout/slips/receivingOrder.js";
import DepositSlip from "./view/supplierLayout/slips/depositSlip.js";

function App() {
    return <RouterProvider router={appRouter} />;
}

const AppLayout = () => {
    return (
        <div className="App m-2">
            <Header />
            <div className="p-4">
                <Outlet />
            </div>
        </div>
    );
};

const PurchaserAppLayout = () => {
    return (
        <div className="App m-2">
            <PurchaserHeader />
            <div className="p-4">
                <Outlet />
            </div>
        </div>
    );
};

const SupplierAppLayout = () => {
    return (
        <div className="App m-2">
            <SupplierHeader />
            <div className="p-4">
                <Outlet />
            </div>
        </div>
    );
};

const appRouter = createBrowserRouter([
    // App Routes
    {
        path: routes.dashboard,
        element: <AppLayout />,
        errorElement: <ErrorRoute />,
        children: [
            {
                path: routes.purchaser,
                element: <Dashboard />,
            },
            {
                path: routes.supplier,
                element: <SupplierLayout />,
            },
        ],
    },

    // Purchaser Routes
    {
        path: routes.purchaser,
        element: <PurchaserAppLayout />,
        errorElement: <ErrorRoute />,
        children: [
            {
                path: routes.purchaser,
                element: <Dashboard />,
            },
            {
                path: routes.enterprises,
                element: <Enterprises />,
            },
            {
                path: routes.enterpriseDetails,
                element: <EnterpriseDetails />,
            },
            {
                path: routes.records,
                element: <Records />,
            },
            {
                path: routes.statistics,
                element: <Statistics />,
            },
            {
                path: routes.settings,
                element: <Settings />,
            },
        ],
    },

    // Supplier Routes
    {
        path: routes.supplier, // e.g. "/suppliers"
        element: <SupplierAppLayout />,
        errorElement: <ErrorRoute />,
        children: [
            {
                path: routes.supplier,
                element: <SupplierLayout />,
            },
            {
                path: routes.suppliersList,
                element: <SupplierList />,
            },
            {
                path: routes.slipsBase,
                element: <Slips />,
            },
            {
                path: routes.generateOrderSlip,
                element: <GenerateOrder />,
            },
            {
                path: routes.receivingOrderSlip,
                element: <ReceivingOrder />,
            },
            {
                path: routes.depositSlip,
                element: <DepositSlip />,
            },
        ],
    },

    // Login Route (Common)
    {
        path: routes.login,
        element: <Login />,
        errorElement: <ErrorRoute />,
    },
]);

export default App;
