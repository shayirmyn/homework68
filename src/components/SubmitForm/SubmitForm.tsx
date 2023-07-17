import React, {useState} from 'react';
import Spinner from "../Spinner/Spinner";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchToDo, postToDo} from "../../containers/ToDoList/todolistThunk";
import BtnSpinner from "../Spinner/BtnSpinner/BtnSpinner";

const SubmitForm = () => {

    const dispatch = useAppDispatch();

    const loading = useAppSelector(state => state.todo);

    const [title, setTitle] = useState<string>('');

    const dataChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const postRequest = async (event: React.FormEvent) => {
        event.preventDefault();
        await dispatch(postToDo({
            title,
            status: false,
        }));
        await dispatch(fetchToDo());
    };

    return (
        <div className="mt-5 formDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            <div className="col-9 m-auto mt-5 mb-5">
                <h4>Submit a new task</h4>
                {
                    loading.fetchLoading ? (<Spinner />) :
                        <form onSubmit={postRequest}>
                            <div className="form-group mt-3">
                                <label htmlFor="title">Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    onChange={dataChanged}
                                    placeholder="type.."
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary ms-auto d-block mt-3 me-2"
                                disabled={loading.postLoading}
                            >
                                {loading.postLoading ? <BtnSpinner /> : (<span>send</span>)}
                            </button>
                        </form>
                }
            </div>
        </div>

    );
};

export default SubmitForm;