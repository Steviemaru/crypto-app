import PlaceHolder from "./PlaceHolder";
import Loader from "./Loader";

function CoinConvertorContent({
  children,
  isLoading,
  isLoading2,
  leftSelected,
  rightSelected,
  isSuccess,
  isSuccess2,
}: {
  children: React.ReactNode;
  isLoading: any;
  isLoading2: any;
  leftSelected: any;
  rightSelected: any;
  isSuccess: any;
  isSuccess2: any;
}) {
  const coinConvertorContent =
    isLoading && isLoading2 ? (
      <Loader height={"h-[300px]"} />
    ) : !leftSelected || !rightSelected ? (
      <PlaceHolder height={"h-[300px]"} />
    ) : isSuccess || isSuccess2 ? (
      children
    ) : (
      []
    );

  return <>{coinConvertorContent}</> ;
}

export default CoinConvertorContent;
