import { createSlice } from "@reduxjs/toolkit";

const initialState = {events: localStorage.getItem("eventsState") ? JSON.parse(localStorage.getItem("eventsState")) : null}

const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        addNewEvent: (state, action) => {
            state.events = [...state.events, action.payload];
            localStorage.setItem("events", state.events);
        }
    }
})

export const {addNewEvent} = eventSlice.actions;
export default eventSlice.reducer;