import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  persistStore,
} from "redux-persist";
import { cryptoDataApi } from "./features/cryptoDataApi";
import currencySelectorReducer from "./features/currencySlice";
import selectedDayReducer from "./features/daysSlice";
import chartReducer from "./features/chartSlice";

const isServer = typeof window === "undefined";

// Persist configuration

const rootReducer = combineReducers({
  [cryptoDataApi.reducerPath]: cryptoDataApi.reducer,
  currency: currencySelectorReducer,
  selectedDay: selectedDayReducer,
  chart: chartReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["currency", "theme"],
};

const persistedReducer: any = isServer
  ? rootReducer //  No persist on server
  : persistReducer(persistConfig, rootReducer); // Persist only on client

export const store: any = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(cryptoDataApi.middleware),
});

//  Only create persistor on the client
export const persistor: any = isServer ? null : persistStore(store);
export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
