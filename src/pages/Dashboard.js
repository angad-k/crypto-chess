import { useState } from "react";
import DashboardCard from "../components/DashboardCard";
import Modal1v1 from "../components/Modal1v1";
import TopNav from "../components/TopNav";
import Img1v1 from "../images/1v1.png";
import ImgPractice from "../images/practice.png";
import ImgBetting from "../images/betting.png";

const getModal = (showModal, closeModal) => {
  switch (showModal) {
    case "Join":
      return <Modal1v1 type="Join" closeModal={closeModal} />;

    case "Create":
      return <Modal1v1 type="Create" closeModal={closeModal} />;

    default:
      return null;
  }
};

const Dashboard = () => {
  const [showModal, setShowModal] = useState("");
  const handleCloseModal = () => setShowModal("");

  return (
    <div className="bg-dark min-h-screen">
      <TopNav />
      <div className="h-screen -mt-24 flex justify-center items-center gap-x-20">
        <DashboardCard
          image={Img1v1}
          title={"1v1"}
          cta={
            <>
              <button onClick={() => setShowModal("Join")}>Join Game</button>
              <button onClick={() => setShowModal("Create")}>
                Create Game
              </button>
            </>
          }
        />
        <DashboardCard
          image={ImgPractice}
          title={"Practice Arena"}
          cta={<button>Start Practice Game</button>}
        />
        <DashboardCard
          image={ImgBetting}
          title={"Live Betting"}
          cta={<button>Place Bet</button>}
        />
        {getModal(showModal, handleCloseModal)}
      </div>
    </div>
  );
};

export default Dashboard;
