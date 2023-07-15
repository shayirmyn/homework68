export interface ITask {
    id: string;
    title: string;
    status: boolean;
}

export interface IGetTask {
    [id: string]: ITask;
}