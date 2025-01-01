"use client";

import { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setCurrency } from "@/lib/features/currencySlice";
import PercentageChange from "./PercentageChange";
import ArrowRight from "../../public/arrowRight.svg";
import ArrowLeft from "../../public/arrowLeft.svg";

export function Carousel({ coinData }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state) => state.currency);

  const uniqueId = () => Math.floor(Math.random() * 999999 + Math.random() * 999999);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative py-4 md:w-4/5 w-full ">
       <div className="pl-7">Select the currency to view statistics </div>
      <div className="embla py-8">
        <button className="embla__prev dark:bg-black bg-purple-200 text-white  fill-current md:block hidden" onClick={scrollPrev}>
          <ArrowLeft width="10px" height="10px" className="" />
        </button>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {coinData.length > 1 && coinData?.map((item: any) => {

              return (
                <div
                  key={uniqueId()}
                  className="embla__slide flex gap-2 rounded-lg bg-opacity-50 bg-slate-600 opacity-90  py-3 justify-center items-center"
                  onClick={() => {
                    dispatch(setCurrency(item.symbol));
                  }}
                >
                  <div className="flex items-center">
                    <Image className="md:w-8 md:h-8" src={item.image ? item.image
                      : null} width={12} height={12} alt="coin" />
                  </div>
                  <div className="dark:text-white text-black flex flex-col md:items-start items-center">
                    <div className="dark:text-white text-black">
                      <span className="md:inline hidden">{item.name}</span>
                     <span className="md:text-base text-xs"> [{item.symbol?.toUpperCase()}]</span>
                    </div>
                    <div className="flex gap-5 md:flex hidden">
                      <span>{`${item.current_price?.toLocaleString()} ${currency.toUpperCase()}`}</span>
                      <PercentageChange symbolType={"percentage"} data={item.price_change_percentage_24h} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button className="embla__next  dark:bg-black bg-purple-200 text-white  fill-current md:block hidden" onClick={scrollNext}>
          <ArrowRight width="10px" height="10px" />
        </button>
      </div>
    </div>
  );
}
