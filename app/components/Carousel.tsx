"use client";

import { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setCurrency } from "@/lib/features/currencySlice";
import { useGetCarouselDataQuery } from "@/lib/features/cryptoDataApi";
import PercentageChange from "./PercentageChange";

export function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state) => state.currency); // may not need
  // useEffect(() => {
  //   if (emblaApi) {
  //     console.log(emblaApi.slideNodes()) // Access API
  //   }
  // }, [emblaApi])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const query = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
  const { data } = useGetCarouselDataQuery(query);

  const coinData = data?.slice(0, 10).map((item: any) => item);

  return (
    <div className="relative py-4 w-4/5">
      <div className="embla py-8">
        <button className="embla__prev" onClick={scrollPrev}>
          Prev
        </button>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {coinData?.map((item: any) => {
              // when currency set make that element highighted or the selected in the carousel
              return (
                <div
                  key={item.name}
                  className="embla__slide flex "
                  onClick={() => {
                    dispatch(setCurrency(item.symbol));
                  }}
                >
                  <div className="">
                    <Image src={item.image} width={32} height={32} alt="coin"/>
                    
                  </div>
                  <div className="text-black">
                    <div className="text-black">
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

        <button className="embla__next" onClick={scrollNext}>
          Next
        </button>
      </div>
    </div>
  );
}
