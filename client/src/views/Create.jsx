// have a form, after submit: post at the database
// 1. input : states to track the changes
// 2. send into the database: axios
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const Create = () => {
    const [name, setName] = useState("")
    const [AuthorList, setAuthorList] = useState([])
    const [errors, setErrors] = useState([])


    // const refreshList = (newAuthor) => {
    //     setAuthorList([...AuthorList, newAuthor])
    // }

    const navigate = useNavigate()

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/author', { name })
            .then(res => navigate("/"))
            .catch(err => {
                const tempErrArr = []
                for (const eachKey in err.response.data.errors) {
                    tempErrArr.push(err.response.data.errors[eachKey].message)
                }
                setErrors(tempErrArr)
            })
    }

    const handleCancle = () => {
        navigate('/')
    }
    return (
        <div>

            <h1 style={{ color: 'seagreen' }}>Favorite Authors</h1>
            <Link to={`/`} > Home</Link>
            <h2 style={{ color: 'cadetblue' }}>Add a new Author</h2>
            <form className='form' onSubmit={onSubmitHandler}>
                <div className='input-group'>
                    <label className='input-group-text'> Name:</label>
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className='form-control' />
                </div>
                <button type='submit' className="btn btn-outline-success mr-1" href="#">Submit</button>
                <button type='button' onClick={() => handleCancle()} className="btn btn-outline-danger" href="#"> Cancle </button>
            </form>
            {
                errors.map((err, i) => {
                    return (
                        <p style={{ color: 'red' }}>{err}</p>
                    )
                })
            }

        </div>
    )
}

export default Create