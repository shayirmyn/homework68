import {ITask} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchToDo} from "./todolistThunk";

interface TodolistState {
    items: ITask[];
    fetchLoading: boolean;
}

const initialState: TodolistState = {
    items: [],
    fetchLoading: false,
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchToDo.pending, (state) => {
            state.fetchLoading = true;
        });

        builder.addCase(fetchToDo.fulfilled, (state, action) => {
            state.fetchLoading = false;
            state.items = action.payload;
        });

        builder.addCase(fetchToDo.rejected, (state) => {
            state.fetchLoading = false;
        });


    },
});

export const todoReducer = todoSlice.reducer;
