import { useState } from "react";
import DashboardCard from "../components/DashboardCard";
import Modal1v1 from "../components/Modal1v1";
import TopNav from "../components/TopNav";
import Img1v1 from "../images/1v1.png";
import ImgPractice from "../images/practice.png";
import ImgBetting from "../images/betting.png";
import { cardCtaStyles } from "../utils/theme";
import { useNavigate } from "react-router-dom";

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
	const navigate = useNavigate();

	return (
		<div className="bg-dark min-h-screen">
			<TopNav />
			<div className="h-screen -mt-24 flex justify-center items-center gap-x-24">
				<DashboardCard
					image={Img1v1}
					title={"1v1 Match"}
					cta={
						<>
							<button
								onClick={() => setShowModal("Join")}
								className={cardCtaStyles}
							>
								Join Game
							</button>
							<button
								onClick={() => setShowModal("Create")}
								className={cardCtaStyles}
							>
								Create Game
							</button>
						</>
					}
				/>
				<DashboardCard
					image={ImgPractice}
					title={"Practice Arena"}
					cta={
						<button
							className={cardCtaStyles}
							onClick={() => navigate("../practice")}
						>
							Start Practice Game
						</button>
					}
				/>
				<DashboardCard
					image={ImgBetting}
					title={"Livestreams"}
					cta={
						<button
							className={cardCtaStyles}
							onClick={() => navigate("../bet-lobby")}
						>
							Ongoing matches
						</button>
					}
				/>
				{getModal(showModal, handleCloseModal)}
			</div>
		</div>
	);
};

export default Dashboard;
