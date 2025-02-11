"use client";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../lib/store";
import Spinner from "./components/Spinner/Spinner";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {" "}
      <PersistGate
        loading={
          <div className="w-screen h-screen flex justify-center items-center bg-white dark:bg-black">
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          </div>
        }
        persistor={persistor}
      >
        <ThemeProvider attribute="class" enableSystem={true}>
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
