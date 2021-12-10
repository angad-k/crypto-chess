import {
  modalStyles,
  modalHeaderStyles,
  modalInputStyles,
  modalPrimaryCtaStyles,
  modalSecCtaStyles,
} from "../utils/theme";

const Modal1v1 = ({ type, closeModal }) => {
  const handleJoin = () => {};
  const handleCancel = () => closeModal();
  const handleStart = () => {};

  return (
    <div className="bg-opacity-30 bg-black fixed top-0 h-screen w-screen flex items-center justify-center backdrop-filter backdrop-blur-md">
      <div className={modalStyles}>
        <p className={modalHeaderStyles}>{type} Game</p>
        <input
          type="text"
          placeholder={
            type === "Join" ? "Enter Game Code" : "Enter Coins to Stake"
          }
          className={modalInputStyles}
        />
        <button className={modalPrimaryCtaStyles}>
          {type === "Join" ? "Join" : "Create"}
        </button>
        <button onClick={handleCancel} className={`${modalSecCtaStyles} ml-2`}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal1v1;
