import {ITask} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {deleteToDo, fetchToDo, postToDo, putToDo} from "./todolistThunk";

interface TodolistState {
    items: ITask[];
    fetchLoading: boolean;
    deleteLoading: boolean;
    postLoading: boolean;
    putLoading: boolean;
}

const initialState: TodolistState = {
    items: [],
    fetchLoading: false,
    deleteLoading: false,
    postLoading: false,
    putLoading: false,
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

        builder.addCase(deleteToDo.pending, (state) => {
            state.deleteLoading = true;
        });

        builder.addCase(deleteToDo.fulfilled, (state) => {
            state.deleteLoading = false;
        });

        builder.addCase(deleteToDo.rejected, (state) => {
            state.deleteLoading = false;
        });

        builder.addCase(postToDo.pending, (state) => {
            state.postLoading = true;
        });

        builder.addCase(postToDo.fulfilled, (state) => {
            state.postLoading = false;
        });

        builder.addCase(postToDo.rejected, (state) => {
            state.putLoading = false;
        });

        builder.addCase(putToDo.pending, (state) => {
            state.postLoading = true;
        });

        builder.addCase(putToDo.fulfilled, (state) => {
            state.putLoading = false;
        });

        builder.addCase(putToDo.rejected, (state) => {
            state.putLoading = false;
        });
    },
});

export const todoReducer = todoSlice.reducer;
