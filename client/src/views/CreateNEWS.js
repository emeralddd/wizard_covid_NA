import CreateNEWSForm from '../components/form/CreateNEWSForm'
const CreateNEWS = () => {
    let body = (
        <CreateNEWSForm />
    )
    return (
        <div className="mx-4 mt-3">
            <h1>Viết Tin Tức Mới</h1>
            {body}
        </div>
    )
}

export default CreateNEWS
