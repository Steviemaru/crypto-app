import SearchIcon from "../../public/searchIcon.svg";

export default function SearchInput() {
  return (
    <div className="nav-items-Light flex items-center rounded-t-xl rounded-b-xl bg-slate-900  ">
      <SearchIcon className="h-7 w-7 mx-2" />
      <input
        className="nav-items-Light py-2 m-1 font-semibold bg-slate-900 text-white"
        placeholder="Search..."
        type="text"
      />
    </div>
  );
}
