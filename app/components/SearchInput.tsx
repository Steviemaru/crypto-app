import SearchIcon from "../../public/searchIcon.svg";

export default function SearchInput() {
  return (
    <div className="flex items-center rounded-t-xl rounded-b-xl bg-slate-700  ">
      <SearchIcon className="h-7 w-7 mx-2" />
      <input
        className=" py-2 m-1 bg-slate-700 text-white"
        placeholder="Search..."
        type="text"
      />
    </div>
  );
}
