import {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import { apiURL } from '../utils/VariableName'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AlertMessage from '../components/layout/AlertMessage'
import CreatePostForm from '../components/form/CreatePostForm'
const CreatePost = () => {
    let body = (
        <CreatePostForm />
    )
    return (
        <div className="mx-4 mt-3">
            <h1>Viết Bài Viết Mới</h1>
            {body}
        </div>
    )
}

export default CreatePost
