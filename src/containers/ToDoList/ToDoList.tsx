import React, {useEffect, useState} from 'react';
import {deleteToDo, fetchToDo, putToDo} from "./todolistThunk";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import Spinner from "../../components/Spinner/Spinner";
import SubmitForm from "../../components/SubmitForm/SubmitForm";
import {IForm} from "../../types";

const ToDoList = () => {

    const dispatch = useAppDispatch();

    const [data, setData] = useState<IForm>({
        title: '',
        status: false,
    });

    useEffect(() => {
        dispatch(fetchToDo());
    }, [dispatch]);

    const tasks = useAppSelector((state) => state.todo.items);

    const fetchLoading = useAppSelector((state) => state.todo.fetchLoading);

    const deleteRequest = async (id: string) => {
       await dispatch(deleteToDo(id));
       await dispatch(fetchToDo());
    };

    const checkedDone = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const active = event.target.name;
        const checked = event.target.checked;

        setData((prevState) => ({
            ...prevState,
            [active]: checked,
        }));
    };

    const putRequest = async () => {
        await dispatch(putToDo(data));
        await dispatch(fetchToDo());
    };

    return (
        <>
            <SubmitForm state={data}/>
            {fetchLoading ? (<Spinner />) : (
                <div className="mt-5 tasksDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                    {
                        tasks.length < 1 ? (<h2>No tasks!</h2>) :
                        (<div>
                            {
                                tasks.map((every, index) => (
                                    <div key={index} className="mt-5 formDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                                        <p>{every.title}</p>
                                        <div>{every.status ? (<span>done</span>) : (<span>not done</span>)}</div>
                                        <input type="checkbox" onChange={checkedDone}/>
                                        <button
                                            className="btn btn-danger ms-auto d-block mt-3 me-2"
                                            onClick={() => deleteRequest(every.id)}
                                        >
                                            delete
                                        </button>
                                    </div>
                                ))
                            }
                        </div>)
                    }
                </div>
            )}
        </>
    );
};

export default ToDoList;