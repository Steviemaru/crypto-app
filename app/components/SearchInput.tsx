import { useState } from "react";
import Link from "next/link";
import SearchIcon from "../../public/searchIcon.svg";
import { useGetSearchCoinListDataQuery } from "@/lib/features/cryptoDataApi";

export default function SearchInput() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleChange = (e: any) => {
    setSearchValue(e.target.value);
  };
  const handleFocus = () => {
    setShowSearchResults(true);
  };
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev); // Toggle expansion
  };

  const { data } = useGetSearchCoinListDataQuery(searchValue , {
    skip: !searchValue, // Skip the query if `searchValue` is empty
  });

  const coinList = data?.coins;

  return (
    <div className="relative h-[100%] dark:bg-shark bg-purple-100 flex flex-col items-center justify-center rounded-lg md:p-6 p-2">
      <div className=" flex items-center">
        <SearchIcon className="h-6 w-6 mx-2 cursor-pointer"
          onClick={toggleExpand} />
        <input
          className={` ${isExpanded ? "w-[85px]" : "w-0"
            }   lg:w-[300px] sm:visible sm:opacity-100 sm:pointer-events-auto
      transition-all duration-300 ease-in-out font-semibold dark:bg-shark bg-purple-100 dark:text-white text-black overflow-hidden
      ${isExpanded ? "visible opacity-100 pointer-events-auto" : "invisible opacity-0 pointer-events-none"
            }
    `}
          placeholder="Search..."
          type="text"
          value={searchValue}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </div>
      {showSearchResults && (
        <div className={`left-0 top-[100%] overflow-y-scroll h-52 ${searchValue == "" ? "hidden" : "flex"} flex-col absolute rounded-xl p-2 z-50 dark:bg-shark bg-purple-100 dark:text-white text-black w-full `}>
          {
            coinList?.map((item: any) => {

              return (
                <Link key={item.name} href={`/coin/${item.id}`}>
                  <option className="truncate">
                    {item.name}
                  </option>
                </Link>
              );
            })
          }
        </div>
      )}
    </div>
  );
}
