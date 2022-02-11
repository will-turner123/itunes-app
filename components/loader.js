import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader({ color="primary" }){
    return (
        <Box sx={{ display: 'flex'}}>
            <CircularProgress color={color} />
        </Box>
    )
}