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
