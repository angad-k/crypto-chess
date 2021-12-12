import React from "react";
import TopNav from "../components/TopNav";
import { useNavigate } from "react-router-dom";

const WinLostPage = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen bg-dark bg-center	bg-cover bg-no-repeat bg-blend-multiply"
      style={{ backgroundImage: "url(/assets/losebg.jpg)" }}
    >
      <TopNav />
      <div className="w-1/2 mx-auto mt-80 flex justify-center items-center flex-col">
        <p className="mt-5">{title}</p>
        <p
          className="mt-5 cursor-pointer text-b2 py-2 px-4 rounded-md border border-b2"
          onClick={() => navigate("../")}
        >
          Go to Dashboard
        </p>
      </div>
    </div>
  );
};

export default WinLostPage;
