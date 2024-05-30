
import { useState, useContext } from "react"

import { DataContext } from "../../context/DataProvider.jsx"

import { useNavigate } from "react-router-dom"

import { API } from "../../services/api.js"

import { Box, TextField, Button, styled, Typography } from "@mui/material"

const Center = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center
`

const Component = styled(Box)`
    width: 400px;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.8)
`

const Image = styled("img")({
    width: 100,
    margin: "auto",
    display: "flex",
    padding: "50px 0 0 0"
})

const Wrapper = styled(Box)`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 25px 35px;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`

const LoginButton = styled(Button)`
    text-transform: none;
    background: rgb(252, 169, 3);
    color: #fff;
    height: 40px;
    border-radius: 2px;
`

const SignUpButton = styled(Button)`
    text-transform: none;
    color: #2874f0;
    height: 40px;
    border-radius: 2px;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 20%)
`

const Text = styled(Typography)`
    color: #878787;
    font-size: 14px;
`

const signUpIntialValues = {
    name: "",
    username: "",
    password: ""
}

const loginInitialValues = {
    username : "",
    password : ""
}

const Error = styled(Typography)`
    margin-top: 10px;
    font-weight: 600;
    color: #ff6161;
    font-size: 10px;
    line-height: 0;
`


const Login = ({ isUserAuthenticated }) => {
    const imageUrl = "https://res.cloudinary.com/dl5umecqi/image/upload/v1713183055/ozyjg0sx5dyalawmfsy4.jpg"
    const [account, toggleAccount] = useState('login');
    const [signUp , setSignUp] = useState(signUpIntialValues)
    const [login, setLogin] = useState(loginInitialValues)
    const [error, seterror] = useState('')
    const { setaccount } = useContext(DataContext)
    const navigate = useNavigate()
    const toggleSignUp = () => {
        if(account === 'login'){
            toggleAccount('signUp')
        }
        else{
            toggleAccount('login')
        }
    }

    const onInputChange = (e) => {
        setSignUp({...signUp, [e.target.name]: e.target.value})
    }

    const onValueChange = (e) => {
        setLogin({...login, [e.target.name] : e.target.value})
    }

    const signUpUser = async () => {
        let response = await API.userSignUp(signUp)
        if(response.isSuccess){
            setSignUp(signUpIntialValues)
            toggleAccount('login')
            seterror('')
        }
        else {
            seterror("Something went wrong. Please try again later. ")
        }
    }

    const loginUser = async () => {
        let response = await API.userLogin(login)
        if ( response.isSuccess){
            sessionStorage.setItem('accessToken' , `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setaccount({username: response.data.username, name: response.data.name})
            seterror('')
            navigate('/')
            isUserAuthenticated(true);
        }
        else {
            seterror("Something went wrong. Please try again later")
        }
    }



    return (
        <Center>
            <Component>
                <Box>
                    <Image src={imageUrl} alt="Login" />
                    {
                        account === 'login' ? 
                            <Wrapper>
                            <TextField variant="standard" onChange={ (e) => onValueChange(e)} name="username" label="Enter Username"/>
                            <TextField variant="standard" onChange={ (e) => onValueChange(e)} name="password" label="Enter Password"/>
                            <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
                            <Text style={{textAlign: "center"}}>OR</Text>
                            <SignUpButton onClick={() => toggleSignUp()}>Create an Account</SignUpButton>
                            </Wrapper>
                        :
                            <Wrapper>
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name'label="Name"/>
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username'label="Username"/>
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password'label="Password"/>
                                { error && <Error>{error}</Error>}
                                <SignUpButton onClick={() => signUpUser()}>Sign Up</SignUpButton>
                                <Text style={{textAlign: "center"}}>OR</Text>
                                <LoginButton variant="contained" onClick={() => toggleSignUp()}>Already Have An Account</LoginButton>
                            </Wrapper>

                    }
                </Box>
            </Component>
        </Center>
    )
}

export default Login;
