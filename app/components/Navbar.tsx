import HalfCircle from "../../public/halfCircle.svg";
import NavButtons from "../components/NavButtons";
import CurrencyList from "../components/CurrencyList";
import SearchInput from "../components/SearchInput";

export default function Navbar() {
  return (
    <div className="flex justify-between px-7 bg-blue-200">
            <div className="flex items-center">
              <NavButtons />
            </div>
            <div className="flex items-center gap-6 border-1">
              <SearchInput/>
              <div className="py-2 m-1 rounded-t-xl rounded-b-xl bg-slate-700">
                <CurrencyList />
              </div>
              <div className="rounded-t-xl rounded-b-xl bg-slate-700">
                <HalfCircle className=" py-0 m-2.5 bg-slate-700 text-white h-7 w-7" />
              </div>
            </div>
          </div>
  );
}