import React, {useState} from 'react';
import Spinner from "../Spinner/Spinner";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchToDo, postToDo} from "../../containers/ToDoList/todolistThunk";


const SubmitForm = () => {

    const dispatch = useAppDispatch();

    const fetchLoading = useAppSelector(state => state.todo.fetchLoading);

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
                    fetchLoading ? (<Spinner />) :
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
                            >
                                Send
                            </button>
                        </form>
                }
            </div>
        </div>

    );
};

export default SubmitForm;