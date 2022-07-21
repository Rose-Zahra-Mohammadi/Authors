import React from 'react'
import axios from "axios"
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Main = () => {
    const [authorList, setAuthorList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/authors')
            .then(res => {
                setAuthorList(res.data)
            })
            .catch(err => console.error(err))
    }, []);


    const handleDelete = (deleteId) => {
        axios.delete(`http://localhost:8000/api/authors/${deleteId}`)
            .then(res => removeFromList(deleteId))
            .catch(err => console.log(err))
    }

    const removeFromList = (deleteId) => {
        const filteredList = authorList.filter((eachAuthor, i) => {
            return (
                eachAuthor._id !== deleteId
            )

        })
        setAuthorList(filteredList)
    }
    return (
        <div>
            <h1>Favorite Authors</h1>
            <br />
            <Link to={`/author/new`} > Add an Author</Link>
            <br />
            <br />
            <h6 style={{ color: 'purple' }}>We have quotes by:</h6>
            <br />
            <table className="table table-bordered border-dark">
                <thead>
                    <tr>
                        <th>Author</th>
                        <th colSpan={2}>Actions Available</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        authorList.map((author, i) => {
                            return (
                                <tr key={i}>
                                    <td style={{ color: "violet" }}>{author.name}</td>
                                    <td><div class="btn-toolbar text-center well">
                                        <td><Link to={`/author/edit/${author._id}`} className="btn btn-primary">Edit</Link>
                                        </td>
                                        <td><button className='btn btn-danger' onClick={e => handleDelete(author._id)}>Delete</button></td>
                                    </div></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div >
    )
}

export default Main