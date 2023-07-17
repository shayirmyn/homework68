import React, {useEffect} from 'react';
import {deleteToDo, fetchToDo, putToDo} from "./todolistThunk";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import Spinner from "../../components/Spinner/Spinner";
import SubmitForm from "../../components/SubmitForm/SubmitForm";
import BtnSpinner from "../../components/Spinner/BtnSpinner/BtnSpinner";

const ToDoList = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchToDo());
    }, [dispatch]);

    const tasks = useAppSelector((state) => state.todo.items);

    const loading = useAppSelector((state) => state.todo);

    const deleteRequest = async (id: string) => {
       await dispatch(deleteToDo(id));
       await dispatch(fetchToDo());
    };

    const putRequest = async (id: string) => {
        await dispatch(putToDo(id));
        await dispatch(fetchToDo());
    };

    return (
        <>
            <SubmitForm/>
            {loading.fetchLoading ? (<Spinner />) : (
                <div className="mt-5 tasksDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                    {
                        tasks.length < 1 ? (<h2>No tasks!</h2>) :
                        (<div>
                            {
                                tasks.map((every, index) => (
                                    <div key={index} className="mt-5 formDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                                        <p>{every.title}</p>
                                        <div>{every.status ? (<span>done</span>) : (<span>not done</span>)}</div>
                                        <input type="checkbox"
                                               name="status"
                                               onChange={() => putRequest(every.id)}
                                               checked={every.status}/>
                                        <button
                                            className="btn btn-danger ms-auto d-block mt-3 me-2"
                                            onClick={() => deleteRequest(every.id)}
                                            disabled={loading.deleteLoading}
                                        >
                                            {loading.deleteLoading ? <BtnSpinner /> : (<span>delete</span>)}
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