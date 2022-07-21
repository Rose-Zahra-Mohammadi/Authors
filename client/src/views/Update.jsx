import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// update is combination of detail and create pages
// Grab id from params and get one author from dbs when the component is loaded
// 1. dbs: axios
// 2. when the component is load: useEffect
// 3. variable that will be changed : useState
// 4. id from params: useParams

// have a form, after submit: post at the database
// 1. input : states to track the changes
// 2. send into the databse: axios
const Update = () => {
    const [name, setName] = useState("")
    const { id } = useParams()
    const [errors, setErrors] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${id}`)
            .then(res => {
                setName(res.data.name)
            })
            .catch(err => console.error(err))
    }, []);

    const navigate = useNavigate()

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/authors/${id}`, { name })
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
            <h2 style={{ color: 'cadetblue' }}>Edit this Author</h2>
            <form className='form' onSubmit={onSubmitHandler}>
                <div className='input-group'>
                    <label className='input-group-text'> Name:</label>
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className='form-control' />
                </div>
                <br />
                <button type='submit' className="btn btn-outline-success mr-2">Submit</button>
                <button type='button' onClick={() => handleCancle()} className="btn btn-outline-danger ml-2"> Cancle </button>
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

export default Update