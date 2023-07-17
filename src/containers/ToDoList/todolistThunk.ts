import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {IForm, IGetTask, ITask} from "../../types";
import {RootState} from "../../app/store";

export const fetchToDo = createAsyncThunk(
    "get/fetch",
    async () => {
        const request = await axiosApi.get<IGetTask | null>("/tasks.json");
        const tasks = request.data;
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

export const putToDo = createAsyncThunk<void, string, {state: RootState}>(
    "put/fetch",
    async (id,thunkAPI) => {
        const tasks = thunkAPI.getState().todo.items;
        const currentTask = tasks.find(item => item.id === id)!;
        await axiosApi.put(`/tasks/${id}.json`, {
            title: currentTask.title,
            status: !currentTask.status,
        });
    },
);