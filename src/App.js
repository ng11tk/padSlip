import "./App.css";
// import Slip from "./view/slip";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Dashboard from "./view/dashboard";
import routes from "./routes";
import Enterprises from "./view/enterprises";
import Header from "./components/common/header";
import EnterpriseDetails from "./view/enterprises/enterpriseDetails";
import Records from "./view/records";
import Statistics from "./view/statistics";
import Settings from "./view/settings";
import ErrorRoute from "./components/common/errorRoute";

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

const appRouter = createBrowserRouter([
  {
    path: routes.dashboard,
    element: <AppLayout />,
    children: [
      {
        path: routes.dashboard,
        element: <Dashboard />,
      },
      // {
      //   path: routes.padSlip,
      //   element: <Slip />,
      // },
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
    errorElement: <ErrorRoute />,
  },
]);

export default App;
