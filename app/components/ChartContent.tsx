import PlaceHolder from "./PlaceHolder";
import Loader from "./Loader";

function ChartContent({
  children,
  isLoading,
  isLoading2,
  isLoading3,
  isSuccess,
  isSuccess2,
  isSuccess3,
  selectedCoins,
}: {
  children: React.ReactNode;
  isLoading: any;
  isLoading2: any;
  isLoading3: any;
  isSuccess: any;
  isSuccess2: any;
  isSuccess3: any;
  selectedCoins:any;
}) {
  const chartContent =
  isLoading || isLoading2 || isLoading3 ? (
    <Loader height={"h-[300px]"} />
  ) : selectedCoins.length < 1  ? (
    <PlaceHolder height={"h-[300px]"} />
  ) : isSuccess || isSuccess2 || isSuccess3  ? (
    children
  ) : (
    []
  );
  return (
    <>{chartContent}</>
  );
}

export default ChartContent;