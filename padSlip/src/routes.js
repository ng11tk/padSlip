const routes = {
    login: "/login",
    logout: "/logout",

    dashboard: "/",

    purchaser: "/purchaser",
    padSlip: "/purchaser/padSlip",
    enterprises: "/purchaser/enterprises",
    enterpriseDetails: "/purchaser/enterprises/:id",
    records: "/purchaser/records",
    statistics: "/purchaser/statistics",
    settings: "/purchaser/settings",

    supplier: "/supplier",
    suppliersList: "/supplier/suppliers",
    slipsBase: "/supplier/slips",
    generateOrderSlip: "/supplier/slips/generate-order",
    receivingOrderSlip: "/supplier/slips/receiving-order",
    depositSlip: "/supplier/slips/deposit-slip",
};

export default routes;
