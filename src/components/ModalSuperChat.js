import {
	modalStyles,
	modalHeaderStyles,
	modalInputStyles,
	modalPrimaryCtaStyles,
	modalSecCtaStyles,
} from "../utils/theme";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Store from "../utils/Store";
import { observer } from "mobx-react-lite";
import { ethers } from "ethers";

const ModalSuperChat = observer(({ closeModal }) => {
	const { user } = useContext(Store);
	const handleCancel = () => closeModal();
	const handleSubmit = async () => {
		var message = document.getElementById("message-input").value;
		var amount = document.getElementById("amount-input").value;
		//to do : ask for money
		const event = new CustomEvent("superchat", {
			detail: { message: message, amount: amount, pubKey: user.accounts },
		});
		console.log("modal : ");
		console.log(message, amount);
		document.dispatchEvent(event);
		closeModal();
	};
	return (
		<div className="bg-opacity-30 bg-black fixed top-0 h-screen w-screen flex items-center justify-center backdrop-filter backdrop-blur-md">
			<div className={modalStyles}>
				<p className={modalHeaderStyles}>Send superchat</p>
				<input
					type="text"
					placeholder={"Enter Message"}
					className={modalInputStyles}
					id="message-input"
				/>
				<input
					type="text"
					placeholder={"Enter Amount"}
					className={modalInputStyles}
					id="amount-input"
				/>
				<button
					className={modalPrimaryCtaStyles}
					onClick={handleSubmit}
				>
					{"Send"}
				</button>
				<button
					onClick={handleCancel}
					className={`${modalSecCtaStyles} ml-2`}
				>
					Cancel
				</button>
			</div>
		</div>
	);
});

export default ModalSuperChat;
