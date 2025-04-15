import { Container, Paper } from "@mui/material";
import BlogCreateOrEdit from "../_utils/_index";
import Header from "@/app/_components/_header";

export default function CreateBlog(){

    return(
        <>
            <Header />
            <Container maxWidth={'lg'} sx={{marginTop:'20px', marginBottom:'100px'}}>
                <Paper sx={{padding:'20px'}}>
                    <BlogCreateOrEdit 
                        slug={null}
                    />
                </Paper>
            </Container>
        </>
    )
}