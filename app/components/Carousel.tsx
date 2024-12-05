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

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative py-4 w-4/5">
      <div className="embla py-8">
        <button className="embla__prev dark:bg-black bg-purple-200 text-white  fill-current" onClick={scrollPrev}>
          <ArrowLeft width="10px" height="10px" className="" />
        </button>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {coinData?.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className="embla__slide flex gap-2 rounded-lg bg-opacity-50 bg-slate-600 opacity-90 py-3"
                  onClick={() => {
                    dispatch(setCurrency(item.symbol));
                  }}
                >
                  <div className="flex items-center">
                    <Image src={item.image} width={32} height={32} alt="coin" />
                  </div>
                  <div className="dark:text-white text-black flex flex-col items-start">
                    <div className="dark:text-white text-black">
                      {item.name}[{item.symbol.toUpperCase()}]
                    </div>
                    <div className="flex gap-5">
                      <span>{`${item.current_price.toLocaleString()} ${currency.toUpperCase()}`}</span>
                      <PercentageChange data={item.ath_change_percentage} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button className="embla__next  dark:bg-black bg-purple-200 text-white  fill-current" onClick={scrollNext}>
          <ArrowRight width="10px" height="10px" />
        </button>
      </div>
    </div>
  );
}
