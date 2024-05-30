import { useState, useEffect } from "react";
import { API } from "../../services/api";
import { Box, Grid } from "@mui/material";
import Post from "./Post";
import { useSearchParams, Link } from "react-router-dom";

const Posts = () => {
    const [ posts, setPosts] = useState([])
    const [SearchParams] = useSearchParams();
    const category = SearchParams.get('category')
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getAllPosts({ category: category || ''});
            if(response.isSuccess){
                setPosts(response.data)
            }
        }
        fetchData();

    }, [ category ])
    


    return (
        <>
            {
                posts && posts.length > 0 ? posts.map( post => (
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link to={`details/${post._id}`}>
                            <Post post={post}/>
                        </Link>
                    </Grid>
                    
                )) : <Box style={{ color: '#878787', margin: '30px 80px', fontsize: 18}}>No data available to display</Box>
            }
        
        </>
    )
}
export default Posts;