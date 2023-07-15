export interface ITask {
    id: string;
    title: string;
    status: boolean;
}

export interface IForm {
    title: string;
    status: boolean;
}

export interface IGetTask {
    [id: string]: ITask;
}