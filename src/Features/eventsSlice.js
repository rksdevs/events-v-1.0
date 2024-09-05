import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("eventsState") ? JSON.parse(localStorage.getItem("eventsState")) : {events: []}

const eventSlice = createSlice({
    name: "eventsState",
    initialState,
    reducers: {
        addNewEvent: (state, action) => {
            state.events = [...state.events, action.payload];
            const eventsState = localStorage.getItem("eventsState") ? JSON.parse(localStorage.getItem("eventsState")) : {events: []};
            eventsState.events = state.events;
            localStorage.setItem("eventsState", JSON.stringify(eventsState));
        }
    }
})

export const {addNewEvent} = eventSlice.actions;
export default eventSlice.reducer;