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
