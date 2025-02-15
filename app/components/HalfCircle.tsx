import CoinConvertorSymbol from "../../public/CoinConvertorSymbol.svg";
import DualCoinIcon from "../../public/dualCoinIcon.svg";

interface HalfCircleProps {
  size?: string;
  onClick?: () => void;
  showConvertor: boolean;
}

const HalfCircle: React.FC<HalfCircleProps> = ({
  size,
  onClick,
  showConvertor,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${size} rounded-l-full flex justify-center items-center border-l-2 dark:border-[#373745] 
     dark:bg-shark bg-purple-100 bg-opacity-70 hover:bg-opacity-100 duration-500 transform transition-all ease-in-out 
      hover:scale-110 hover:opacity-100 fixed top-1/2 right-0 -translate-y-1/2 overflow-hidden`}
    >
      {showConvertor == true ? <DualCoinIcon /> : <CoinConvertorSymbol />}
    </div>
  );
};

export default HalfCircle;
