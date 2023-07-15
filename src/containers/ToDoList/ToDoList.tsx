import React, {useCallback, useEffect} from 'react';
import {fetchToDo} from "./todolistThunk";
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import Spinner from "../../components/Spinner/Spinner";
import axiosApi from "../../axiosApi";

const ToDoList = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchToDo());
    }, [dispatch]);

    const tasks = useSelector((state: RootState) => state.todo.items);

    const fetchLoading = useSelector((state: RootState) => state.todo.fetchLoading);

    const deleteRequest = useCallback(async (id: string) => {
        try {
            await axiosApi.delete(`/tasks/${id}.json`);
            dispatch(fetchToDo());
        } catch (e) {
            console.error(e);
        }
    }, [dispatch]);


    return (
        <>
            <div className="mt-5 formDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                <div className="col-9 m-auto mt-5 mb-5">
                    <h4>Submit a new task</h4>
                    {
                        fetchLoading ? (<Spinner />) :
                            <form>
                                <div className="form-group mt-3">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        id="author"
                                        type="text"
                                        name="author"
                                        className="form-control"
                                        placeholder="type.."
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary ms-auto d-block mt-3 me-2"
                                >
                                    Send
                                </button>
                            </form>
                    }
                </div>
            </div>
            {fetchLoading ? (<Spinner />) : (
                <div className="mt-5 tasksDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                    {
                        tasks.map((every, index) => (
                            <div key={index} className="mt-5 formDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                                <p>{every.title}</p>
                                <div>{every.status ? (<span>done</span>) : (<span>not done</span>)}</div>
                                <button
                                    className="btn btn-danger ms-auto d-block mt-3 me-2"
                                    onClick={() => deleteRequest(every.id)}
                                >
                                    delete
                                </button>
                            </div>
                        ))
                    }
                </div>
            )}
        </>
    );
};

export default ToDoList;