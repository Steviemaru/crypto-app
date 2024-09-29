import SearchIcon from "../../public/searchIcon.svg";

export default function SearchInput() {
  return (
    <div className=" flex items-center rounded-t-xl rounded-b-xl dark:bg-slate-900 bg-purple-100">
      <SearchIcon className="h-7 w-7 mx-2" />
      <input
        className="py-2 m-1 font-semibold dark:bg-slate-900 bg-purple-100 dark:text-white text-black"
        placeholder="Search..."
        type="text"
      />
    </div>
  );
}
