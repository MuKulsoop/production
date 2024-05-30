import { Box, Typography, styled } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../services/api";
const Container = styled(Box)`
    margin-top: 30px;
    background: #f5f5f5;
    padding: 10px;

`

const Child = styled(Box)`
    display: flex;
    margin: bottom;
`
const Name = styled(Typography)`
    font-weight: 600;
    font-size: 18px;
    margin-right: 20px;
`

const StyledDate = styled(Typography)`
    color: #878787;
    font-size: 14px;
`
const Delete = styled(DeleteIcon)`
    margin-left: auto;
`




const Comment = ({comment, setToggle}) => {

    const { account } = useContext(DataContext)

    const removeComment = async () => {
        let response = await API.deleteComment(comment._id)
        if(response.isSuccess){
            setToggle(prev => !prev)
        }
    }


  return (
    <Container>
      <Child>
        <Name>{comment.name}</Name>
        <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        { comment.name === account.username && <Delete onClick={() => removeComment()} />}
      </Child>
      <Box>
        <Typography>{comment.comments}</Typography>
      </Box>
    </Container>
  );
};

export default Comment;
