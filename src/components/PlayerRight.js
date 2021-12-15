import { get_avatar_url } from "../utils/utils";

const PlayerRight = (props) => {
    return(
        <div className="flex flex-row bg-b2 w-250 items-center gap-1 rounded-md justify-center h-75 absolute right-0 top-20 mr-6">
            <div className="bg-black rounded-lg h-30 w-30 border-2 border-yellow-500 mr-6"></div>
        <div className="flex gap-1 items-center">
        <p className="text-white font-medium opacity-75 text-sm bg-b1 rounded-full py-1 px-2">
          {props.pubKey}
        </p>
        <div className="p-2 rounded-full bg-dark">
          <img className="h-8" alt="avatar" src={get_avatar_url(props.pubKey)} />
        </div>
      </div>
      </div>
    )
}

export default PlayerRight;
