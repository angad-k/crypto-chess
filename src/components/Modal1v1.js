const Modal1v1 = ({ type, closeModal }) => {
  const handleJoin = () => {};
  const handleCancel = () => closeModal();
  const handleStart = () => {};

  return (
    <div className="bg-opacity-30 bg-black fixed top-0 h-screen w-screen flex items-center justify-center backdrop-filter backdrop-blur-md">
      <div>
        <p>{type} Game</p>
        <input
          type="text"
          placeholder={
            type === "Join" ? "Enter Game code" : "Enter Coins to stake"
          }
        />
        {type === "Join" ? <button>Join</button> : <button>Start</button>}
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal1v1;
