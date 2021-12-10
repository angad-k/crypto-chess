import TopNav from "../components/TopNav";
import Chess from "../game/scene/main_scene";

const Practice = () => (
  <div className="bg-dark h-screen overflow-auto">
    <TopNav />
    <div className="h-screen">
      <Chess practiceGame />
    </div>
  </div>
);

export default Practice;
