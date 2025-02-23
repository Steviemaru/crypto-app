"use client";
import { useCallback} from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { RootState } from "@/lib/store";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useGetCarouselDataQuery } from "@/lib/features/cryptoDataApi";
import { toggleCoin } from "@/lib/features/chartSlice";
import PercentageChange from "./PercentageChange";
import Loader from "./Loader";
import ArrowRight from "../../public/arrowRight.svg";
import ArrowLeft from "../../public/arrowLeft.svg";

export const Carousel = ()=> {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state: RootState) => state.currency);
  const { selectedCoins } = useAppSelector((state: RootState) => state.chart);

  const {
    data: coinData,
    isLoading,
    isError,
    isSuccess,
  } = useGetCarouselDataQuery(currency);

  const handleCoinClick = (coin: any) => {
    dispatch(toggleCoin(coin));
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (isLoading) {
    return <Loader height="" />;
  }

  if (isError) {
    return (
      <div className="dark:bg-darkPurple bg-lightPurple text-lightText  flex justify-center items-center gap-10 py-4 text-sm">
        <span>an error has occured </span>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="relative pt-4  w-full ">
        <div className="pl-7">Select the currency to view statistics </div>
        <div className="relative">
          <div className="embla pt-8">
            <button
              className="embla__prev dark:bg-black dark:bg-opacity-5 dark:hover:bg-opacity-70 bg-purple-200 bg-opacity-5 hover:bg-opacity-70 text-white  fill-current md:block hidden"
              onClick={scrollPrev}
            >
              <ArrowLeft width="10px" height="10px" className="" />
            </button>
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__con2">
                {coinData.length > 1 &&
                  coinData?.map((item: any) => {
                    const isSelected = selectedCoins.includes(
                      item.id as string
                    );
                    return (
                      <div
                        key={item.id}
                        className={` p-2  ${
                          isSelected
                            ? "bg-opacity-100 dark:bg-opacity-100"
                            : "bg-opacity-50 dark:bg-opacity-50"
                        } bg-purple-200  dark:bg-shark flex-none  md:w-[50%] lg:w-[25%] xl:w-[20%] flex gap-2 rounded-lg  justify-center items-center  
   `}
                        onClick={() => {
                          handleCoinClick(item.id);
                        }}
                      >
                        <div className="flex items-center">
                          <Image
                            className=""
                            src={item.image ? item.image : null}
                            width={20}
                            height={20}
                            alt="coin"
                            loading="lazy"
                          />
                        </div>
                        <div className="dark:text-white text-black flex flex-col md:items-start items-center">
                          <div className="dark:text-white text-black">
                            <span className="md:inline hidden">
                              {item.name}
                            </span>
                            <span className="md:text-base text-xs">
                              {" "}
                              [{item.symbol?.toUpperCase()}]
                            </span>
                          </div>
                          <div className=" gap-5 md:flex hidden">
                            <span>{`${item.current_price?.toLocaleString()} ${currency.toUpperCase()}`}</span>
                            <PercentageChange
                              symbolType={"percentage"}
                              data={item.price_change_percentage_24h}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <button
              className="embla__next  dark:bg-black dark:bg-opacity-5 dark:hover:bg-opacity-70 bg-purple-200 bg-opacity-5 hover:bg-opacity-70 text-white  fill-current md:block hidden z-50"
              onClick={scrollNext}
            >
              <ArrowRight width="10px" height="10px" />
            </button>
          </div>
        </div>
      </div>
    );
  }
};
