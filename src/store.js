import { configureStore } from "@reduxjs/toolkit";
import eventSliceReducer from "./Features/eventsSlice";

const store = configureStore({
    reducer: {
        eventsState: eventSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    devTools: true,
})

export default store;