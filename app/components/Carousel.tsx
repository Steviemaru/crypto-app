"use client";

import { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useGetCarouselDataQuery } from "@/lib/features/cryptoDataApi";
import { toggleCoin } from "@/lib/features/chartSlice";
import PercentageChange from "./PercentageChange";
import Spinner from "./spinner/Spinner";
import ArrowRight from "../../public/arrowRight.svg";
import ArrowLeft from "../../public/arrowLeft.svg";

export function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state) => state.currency);
  const { selectedCoins } = useAppSelector((state) => state.chart);

  const coinQuery = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&price_change_percentage=1h%2C24h%2C7d&sparkline=true`;

  const {
    data: coinData,
    isLoading,
    isError,
    isSuccess,
  } = useGetCarouselDataQuery(coinQuery);

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
    return (
      <div className="dark:bg-darkPurple bg-lightPurple text-lightText  flex justify-center items-center gap-10 py-4 text-sm">
        <Spinner />
      </div>
    );
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
      <div className="relative pt-4 lg:w-4/5 w-full ">
        <div className="pl-7">Select the currency to view statistics </div>
        <div className="relative">
          <div className="embla pt-8">
            <button
              className="embla__prev dark:bg-black bg-purple-200 text-white  fill-current md:block hidden"
              onClick={scrollPrev}
            >
              <ArrowLeft width="10px" height="10px" className="" />
            </button>
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {coinData.length > 1 &&
                  coinData?.map((item: any) => {
                    const isSelected = selectedCoins.includes(
                      item.id as string
                    );
                    return (
                      <div
                        key={item.id}
                        className={` p-2  ${
                          isSelected ? "bg-opacity-100" : "bg-opacity-70"
                        }   bg-shark flex-none  md:w-[50%]  lg:w-[25%] flex gap-2 rounded-lg  justify-center items-center`}
                        onClick={() => {
                          handleCoinClick(item.id);
                        }}
                      >
                        <div className="flex items-center">
                          <Image
                            className="md:w-8 md:h-8"
                            src={item.image ? item.image : null}
                            width={12}
                            height={12}
                            alt="coin"
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
              className="embla__next  dark:bg-black bg-purple-200 text-white  fill-current md:block hidden"
              onClick={scrollNext}
            >
              <ArrowRight width="10px" height="10px" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
