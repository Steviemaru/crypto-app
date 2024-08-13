import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { cryptoDataApi } from "./features/cryptoDataApi";
import currencySelectorReducer  from "./features/currencySlice";

const rootReducer = combineReducers({
  [cryptoDataApi.reducerPath]: cryptoDataApi.reducer,
  currency: currencySelectorReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cryptoDataApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];