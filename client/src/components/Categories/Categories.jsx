
import { Button, TableHead, TableRow, TableCell, TableBody, Table, styled } from "@mui/material"
import { categories } from "../../constants/data"
import { Link, useSearchParams } from "react-router-dom"

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`
const Styledbutton = styled(Button)`
    color: white;
    margin: 20px;
    width: 85%;
    background: #6495ED;
`
const Categories = () => {

    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')

    return (
        <>
            <Link to={`/create?category=${category || ' '}`}>
                <Styledbutton variant="contained">Create New Story</Styledbutton>
            </Link>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Link to="/"> 
                                All Categories
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map( category => (
                            <TableRow key= {category.id}>
                                <TableCell>
                                    <Link to={`?category=${category.type}`}>
                                        {category.type}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                
            </StyledTable>
        </>
    )
}

export default Categories