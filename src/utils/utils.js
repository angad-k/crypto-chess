export const MSG_DELIM = "::";

export const splitMessage = (msg) => {
	let delimIdx = msg.indexOf(MSG_DELIM);
	if (delimIdx == -1) return [msg, ""];
	let cmd = msg.substring(0, delimIdx);
	let arg = msg.substring(delimIdx + MSG_DELIM.length);
	return [cmd, arg];
};

export const getRandomChessImagePath = () => {
	let i = Math.floor(Math.random() * 5);
	return "url(/assets/bg" + i + ".jpg)";
};

export const truncatePubKey = (key) => {
  if (!key) return "";
  return key.substring(0, 5) + "..." + key.substring(key.length - 4);
};

export const get_avatar_url = (seed) =>
  `https://avatars.dicebear.com/api/human/${seed}.svg`;
