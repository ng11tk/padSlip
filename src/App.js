import "./App.css";
// import Slip from "./view/slip";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Dashboard from "./view/dashboard/index.js";
import routes from "./routes.js";
import Enterprises from "./view/enterprises/index.js";
import Header from "./components/common/header/index.js";
import EnterpriseDetails from "./view/enterprises/enterpriseDetails/index.js";
import Records from "./view/records/index.js";
import Statistics from "./view/statistics/index.js";
import Settings from "./view/settings/index.js";
import ErrorRoute from "./components/common/errorRoute.js";
import Login from "./view/login/index.js";

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
      {
        path: routes.login,
        element: <Login />,
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
    errorElement: <ErrorRoute />,
  },
]);

export default App;
