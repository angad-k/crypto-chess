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

const ModalSuperChat = observer(({ closeModal,whitePubkey,blackPubkey }) => {
  const { user } = useContext(Store);
  const handleCancel = () => closeModal();
  const handleSubmit = async () => {
    var message = document.getElementById("message-input").value;
    var amount = (Number(document.getElementById("amount-input").value)/2).toString();
	try{
		await user.provider.getSigner().sendTransaction({to:whitePubkey, value:ethers.utils.parseEther(amount)})
		await user.provider.getSigner().sendTransaction({to:blackPubkey, value:ethers.utils.parseEther(amount)})
	}
	catch(e){
		return
	}
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
		<p className="text-black font-medium opacity-40 text-sm text-center mb-3">
        "Since Money will be shared between two players, expect two transactions to be initiated"
      </p>
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
        <button className={modalPrimaryCtaStyles} onClick={handleSubmit}>
          {"Send"}
        </button>
        <button onClick={handleCancel} className={`${modalSecCtaStyles} ml-2`}>
          Cancel
        </button>
      </div>
    </div>
  );
});

export default ModalSuperChat;
