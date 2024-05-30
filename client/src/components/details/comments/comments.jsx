import { Box,styled, TextareaAutosize, Button } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataProvider";
import Comment from "./comment";
import { API } from "../../../services/api";
const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`
const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius:'50%'
})

const StyledTextarea = styled(TextareaAutosize)`
    height: 100px;
    width: 100%;
    margin: 0 20px;
`

const initialValues = {
    name: "",
    postId: "",
    comments: "",
    date: new Date()
}



const Comments = ({ post }) => {

    const url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    const [ comment , setComment] = useState(initialValues);
    const [comments, setComments] = useState([]);
    const [ toggle, setToggle ] = useState(false)
    const { account } = useContext(DataContext);
    
    useEffect( () => {
        const getData = async () => {
            const response = await API.getAllComments(post._id);
            if (response.isSuccess){
                setComments(response.data);
            }
        }
        if(post._id){
            getData();
        }
    }, [post, toggle])


    const addComment = async () => {
        let response = await API.newcomment(comment)
        if(response.isSuccess){
            setComment(initialValues);
            
        }
        setToggle(prevState => !prevState);
    }




    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    return(
        <Box>
            <Container>
                <Image src={url} alt="DP" />
                <StyledTextarea 
                    minRows={5}
                    placeholder="What's on your thoughts on this story"
                    value={comment.comments}
                    onChange={(e) => handleChange(e)}
                />
                <Button variant="contained" color="primary" size="medium" style={{ height: 40 }}
                onClick={(e) => addComment(e)}
                >Post</Button>
            </Container>

            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment} setToggle = {setToggle} />
                    ))
                }
            </Box>

        </Box>
    )
}

export default Comments;