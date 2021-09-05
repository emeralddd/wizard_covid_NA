import {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import { apiURL } from '../utils/VariableName'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AlertMessage from '../components/layout/AlertMessage'
import CreateDetailsForm from '../components/form/CreateDetailsForm'
const CreateDetails = () => {
    let body = (
        <CreateDetailsForm />
    )
    return (
        <div className="mx-4 mt-3">
            <h1>Tạo Diễn Biến Mới</h1>
            {body}
        </div>
    )
}

export default CreateDetails
