import ClipLoader from "react-spinners/ClipLoader";
import "./Spinner.css";

type Props = {
  isLoading: boolean;
};

function Spinner({ isLoading = true }: Props) {
  return (
    <ClipLoader
      color="#36d7b7"
      loading={isLoading}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default Spinner;
