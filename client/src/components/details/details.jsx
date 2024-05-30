import { Box, Typography, styled } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { API } from "../../services/api"
import { DataContext } from "../../context/DataProvider"
import Comments from "./comments/comments";


const Container = styled(Box)(({ theme }) => ({
    margin: ' 50px 100px ',
    [theme.breakpoints.down('md')] : {
        margin: 0
    }
}))
const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'

})

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`
const Edit = styled(EditIcon)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
    font-size: 35px;
`
const Delete = styled(DeleteIcon)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
    font-size: 35px;
`
const Author = styled(Box)`
    color: #878787;
    display: flex;
    margin: 20px 0;
`
const Description = styled(Typography)`
    word-break: break-word;
    font-size: 20px;
    font-weight: 500;
`
const DetailView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState({});
    const { account } = useContext(DataContext);
    useEffect( () => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if ( response.isSuccess){
                setPost(response.data)
            }

        }
        fetchData();
    }, [])


    const deleteStory = async () => {
        let response = await API.deletePost(post._id);
        if( response.isSuccess){
            navigate('/')
        }

    }


    const url = post.picture ? post.picture : "https://img.freepik.com/premium-photo/trees-growing-forest_1048944-30368869.jpg?t=st=1714533427~exp=1714534027~hmac=e9e347055b2c91b45f8ac2eefed7bc4991e326f27e31f3d81dec0436329f55d2"
    return (
        <Container>
            <Image src={url} alt="" />
            <Box style={{ float: "right" }}>
                {
                    account.username === post.username && 
                    <>
                        <Link to={`/update/${post._id}`}>
                            <Edit color="primary"/>
                        </Link>
                        <Delete onClick={() => deleteStory()} color="error"/>
                    </>
                }
            </Box>
            <Heading>
                {post.title}
            </Heading>
            <Author>
                <Typography>
                    Author:
                    <Box component='span' style={{ fontWeight: 600 }}>{post.username}</Box>
                    
                </Typography>
                <Typography style={{ marginLeft: 'auto'}}>
                    {new Date(post.createdDate).toDateString()}
                </Typography>
            </Author>
                <Description> { post.description }</Description>
                <Comments post={ post } />
        </Container>
    )
}

export default DetailView