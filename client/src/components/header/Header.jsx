import { AppBar, Toolbar , styled} from "@mui/material";

import { Link } from "react-router-dom"

const Container = styled(AppBar)`
    background-color: #fff;
    color: #000
`

const Component = styled(Toolbar)`
    justify-content: center;
    & > a {
        text-decoration: none;
        color: inherit;
        padding: 20px;
    }
`

const Header = () => {
    return (
        <Container>
            <Component>
                <Link to='/'> Home </Link>
                <Link to='/about'> About </Link>
                <Link to='/contact'> Contact </Link>
                <Link to='/login'> LogOut </Link>
            </Component>
        </Container>
    )
}

export default Header;