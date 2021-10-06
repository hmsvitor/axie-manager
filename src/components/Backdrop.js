import "./Backdrop.css";

const Backdrop = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    open && <div className="backdrop__main" onClick={() => handleClose}></div>
  );
};

export default Backdrop;
