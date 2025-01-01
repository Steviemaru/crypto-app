import SearchIcon from "../../public/searchIcon.svg";

export default function SearchInput() {
  return (
    <>
      <div className="hidden md:flex  items-center rounded-t-xl rounded-b-xl dark:bg-slate-900 bg-purple-100">
      <SearchIcon className="h-7 w-7 mx-2" />
      <input
        className="py-2 m-1 flex font-semibold dark:bg-slate-900 bg-purple-100 dark:text-white text-black"
        placeholder="Search..."
        type="text"
      />
    </div>
<div className="dark:bg-slate-900 flex md:hidden rounded-lg md:p-3 p-2 py-3 w-full flex-1">
<SearchIcon className="h-4 w-4" />
</div>

    </>
  );
}
