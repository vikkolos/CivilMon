import React, { useRef, useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
function ReportIssuescroll({ cards }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);


  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth
    );
  };


  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () =>
      window.removeEventListener("resize", checkScroll);
  }, []);

 
  const scroll = (direction) => {
    const cardWidth =
      cardRef.current?.offsetWidth ;

    containerRef.current.scrollBy({
      left: direction * 400 ,
      behavior: "smooth",
    });
  };

  return (
    <>
      <h1 className="text-[1.4em] font-semibold ml-3 mt-2">
        Report Category
      </h1>

      <div className="relative flex items-center mt-2">
       
        <button
          onClick={() => scroll(-1)}
          disabled={!canScrollLeft}
          className="absolute left-0 z-10 bg- shadow rounded-full px-2 py-2 disabled:opacity-40 opacity-80 hover:opacity-100"
        >
         <IoIosArrowBack size={25}/>
        </button>


        <div
          ref={containerRef}
          onScroll={checkScroll}
          className="flex gap-5 overflow-x-auto w-[99%] scroll-smooth no-scrollbar mx-auto"
        >
          {cards.map((card, i) => (
            <div
              key={i}
              ref={i === 0 ? cardRef : null}
              className="min-w-[355px] h-48 bg-(--main-light) rounded-lg flex pl-8 justify-center flex-col "
            >
              <div className="bg-[#D2C5E8] rounded-3xl w-12 h-12"></div>
              <span className="text-2xl mt-2 font-semibold">
                {card.count}
              </span>
              <p className="font-medium font-popp">
                {card.title}
              </p>
            </div>
          ))}
        </div>

    
        <button
          onClick={() => scroll(1)}
          disabled={!canScrollRight}
          className="absolute right-0 z-10 bg-white shadow-black rounded-full px-2 py-2 disabled:opacity-40 opacity-80 hover:opacity-100 "
        >
          <IoIosArrowForward size={25}/>
        </button>
      </div>
    </>
  );
}

export default ReportIssuescroll;
