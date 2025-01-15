import ClipLoader from "react-spinners/ClipLoader";

function Spinner() {
  return (
    <ClipLoader
      color="#36d7b7"
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default Spinner;
