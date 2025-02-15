"use client";
import { useState, useRef } from "react";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Chart from "./components/Charts/Charts";
import { Carousel } from "./components/Carousel";
import CoinTable from "./components/CoinTable";
import ChartsButtons from "./components/ChartsButtons";
import HalfCircle from "./components/HalfCircle";
import CoinConvertor from "./components/CoinConvertor";

export default function Home() {
  // Outer carousel logic
  const [showConvertor, setShowConvertor] = useState(false);
  // Create a ref to track the current value of showConvertor
  const showConvertorRef = useRef(showConvertor);

  // Outer carousel Embla instance
  const [outerEmblaRef, outerEmblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    watchDrag: false,
  });

  // Toggle scroll for the outer carousel
  const toggleScroll = useCallback(() => {
    if (!outerEmblaApi) return;

    // Use the ref value to avoid waiting for state update
    const currentState = showConvertorRef.current;

    if (!currentState) {
      outerEmblaApi.scrollNext(); // Scroll to the next slide
    } else {
      outerEmblaApi.scrollPrev(); // Scroll to the previous slide
    }
    showConvertorRef.current = !currentState;
    // Toggle the direction
    setShowConvertor(!showConvertor);
  }, [outerEmblaApi, showConvertor]);

  return (
    <div className="flex justify-center flex-col items-center h relative">
      <div className="w-11/12 flex justify-center flex-col items-center gap-10">
        {/* Outer carousel */}
        <div className="embla pt-8">
          <div className="embla__viewport" ref={outerEmblaRef}>
            <div className="embla__container relative">
              {/* First slide: Inner carousel */}
              <div className="w-full flex-none ">
                <Carousel /> {/* Inner carousel remains draggable */}
                <Chart />
              </div>

              {/* Second slide: CoinConvertor */}
              <div className="w-[100vw] flex justify-center flex-none">
                <div className="w-[88%] p-4">
                  <CoinConvertor />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ChartsButtons />
        <CoinTable />
        <HalfCircle
          showConvertor={showConvertor}
          onClick={toggleScroll}
          size="h-32 w-16"
        />
      </div>
    </div>
  );
}
