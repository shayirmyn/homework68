import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {IGetTask, ITask} from "../../types";

export const fetchToDo = createAsyncThunk(
    "todo/fetch",
    async () => {
        const responce = await axiosApi.get<IGetTask | null>("/tasks.json");
        const tasks = responce.data;
        let newTasks: ITask[] = [];

        if (tasks) {
            newTasks = Object.keys(tasks).map((key) => {
                return {...tasks[key], id: key};
            });
        }

        return newTasks
    },
);