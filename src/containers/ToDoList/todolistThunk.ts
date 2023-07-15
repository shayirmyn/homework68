import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {IForm, IGetTask, ITask} from "../../types";

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

        return newTasks;
    },
);

export const postToDo = createAsyncThunk<void, IForm>(
    "post/fetch",
    async (data) => {
        await axiosApi.post("/tasks.json", data);
    },
)

export const deleteToDo = createAsyncThunk(
    'delete/fetch',
    async (id: string) => {
            await axiosApi.delete(`/tasks/${id}.json`);
    },
);

export const putToDo = createAsyncThunk(
    "put/fetch",
    async (data: IForm) => {
        await axiosApi.put(`/tasks/.json`, data);
    },
);