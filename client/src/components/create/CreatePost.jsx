import { Box, styled, FormControl, Button, InputBase, TextareaAutosize } from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../services/api.js"

const Container = styled(Box)`
    margin: 50px 100px
`

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
})

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction : row;
`

const InputTextField = styled(InputBase)`
    font-size: 25px;
    flex: 1;
    margin: 0 30px;
`

const Textarea = styled(TextareaAutosize)`
    margin-top : 50px;
    font-size: 18px;
    border : none;
    width : 100%;
    &: focus-visible{
        outline: none;
    }

`

const initialPost = {
    title: '',
    discription : '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}


const CreatePost = () => {
    
    const [Post, setPost] = useState(initialPost)
    const [file, setFile] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const handleChange = (e) => {
        setPost({...Post, [e.target.name]: e.target.value})
    }
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };    
    const savePost = async () => {
        let response = await API.createPost(Post);
        if (response.isSuccess) {
            navigate('/')
        }
    }
    const {account} = useContext(DataContext)
    const url = Post.picture? Post.picture : "https://images.unsplash.com/photo-1713528197377-53e99d3b6b2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8"
    useEffect(() => {
        const getImage = async () => {
            if(file){
                const data = new FormData;
                data.append('name', file.name)
                data.append('file', file)
                const response = await API.uploadFile(data)
                Post.picture = response.data;
            }
        }
        getImage()
        Post.categories = location.search?.split('=')[1] || 'All';
        Post.username = account.username
    },[file])

    return(
        <Container>
            <Image src={url} alt="image" />

            <StyledFormControl>
                <label htmlFor="fileinput" >
                <AddCircleOutlineIcon fontSize='large' color='action'/>
                </label>
                <input type="file" id="fileinput" style={{ display: "none"}} onChange={(e) => handleFileChange(e)}/>
                <InputTextField placeholder="Title"  onChange={(e) => handleChange(e)} name="title"/>
                <Button variant="contained" onClick={() => savePost()}>Publish</Button>
            </StyledFormControl>

            <Textarea
                name="description"
                onChange={(e) => handleChange(e)}
                minRows={5}
                placeholder="Tell your story ..."
            />

        </Container>
    )
}

export default CreatePost