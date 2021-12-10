import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" component={Dashboard} />
      </Routes>
    </>
  );
};

export default AllRoutes;
