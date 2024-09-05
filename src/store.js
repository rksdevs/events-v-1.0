import { configureStore } from "@reduxjs/toolkit";
import eventSliceReducer from "./Features/eventsSlice";

const store = configureStore({
    reducer: {
        events: eventSliceReducer,
    },
    devTools: true,
})

export default store;