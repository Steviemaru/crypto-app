import Spinner from "./Spinner/Spinner";

function Loader({ height }: { height: string }) {
  return (
    <div className={`flex flex-col ${height} justify-center items-center`}>
      <Spinner />
    </div>
  );
}

export default Loader;
