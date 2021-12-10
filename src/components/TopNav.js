import { observer } from "mobx-react-lite";
import { useContext } from "react";
import Store from "../utils/Store";
import logo from "../images/logo.png";

const get_avatar_url = (seed) =>
  `https://avatars.dicebear.com/api/human/${seed}.svg`;

const TopNav = () => {
  const { user } = useContext(Store);
  const avatar_url = get_avatar_url(user.accounts);

  return (
    <div className="bg-b2 px-8 py-2 flex justify-between items-center">
      <div className="flex items-center">
        <img className="h-8" alt="logo" src={logo} />
        <p className="ml-4 text-sm font-medium">Dashboard</p>
      </div>
      <div className="flex gap-1 items-center">
        <p className="truncate w-28 text-white font-medium opacity-75 text-sm">
          {user.accounts}
        </p>
        <div className="p-2 rounded-full bg-dark">
          <img className="h-8" alt="avatar" src={avatar_url} />
        </div>
      </div>
    </div>
  );
};

export default observer(TopNav);
