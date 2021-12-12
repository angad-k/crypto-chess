import { observer } from "mobx-react-lite";
import { useContext } from "react";
import Store from "../utils/Store";
import logo from "../images/logo.png";
import { truncatePubKey, get_avatar_url } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const getBreadCrumps = (path) => {
  if (!path) return [];
  const breadcrumbs = path.split("/");
  const crumbs = [];

  for (let i = 0; i < breadcrumbs.length; i++) {
    if (breadcrumbs[i] !== "") {
      crumbs.push(breadcrumbs[i]);
    }
  }
  return crumbs;
};

const getTitle = (path) => {
  if (!path) return "";

  switch (path) {
    case "joinGame":
    case "createGame":
      return "1v1 Game";

    case "practice":
      return "Practice Game";

    case "stream":
      return "Stream Game";

    case "bet-lobby":
      return "Betting Lobby";

    default:
      return "";
  }
};

const TopNav = () => {
  const { user } = useContext(Store);
  const publickKey = truncatePubKey(user.accounts);
  const avatar_url = get_avatar_url(user.accounts);
  const navigate = useNavigate();

  const bread = getBreadCrumps(window.location.pathname);

  return (
    <div className="bg-b2 px-8 py-2 flex justify-between items-center">
      <div className="flex items-center">
        <img className="h-8" alt="logo" src={logo} />
        <p className="ml-4 text-sm font-medium">
          <span
            onClick={() => navigate("../")}
            className="hover:underline cursor-pointer"
          >
            Dashboard
          </span>
          {bread.length > 0 && (
            <>
              <span> &gt; </span>
              <span>
                {getTitle(bread[0])}{" "}
                {bread.length > 1 && (
                  <>
                    &gt; Game code: <b>{bread[1] || ""}</b>
                  </>
                )}
              </span>
            </>
          )}
        </p>
      </div>
      <div className="flex gap-1 items-center">
        <p className="text-white font-medium opacity-75 text-sm bg-b1 rounded-full py-1 px-2">
          {publickKey}
        </p>
        <div className="p-2 rounded-full bg-dark">
          <img className="h-8" alt="avatar" src={avatar_url} />
        </div>
      </div>
    </div>
  );
};

export default observer(TopNav);
