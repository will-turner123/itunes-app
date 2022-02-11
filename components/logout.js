import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { LinearProgress } from '@mui/material';
export default function LogOut(){
    const auth = getAuth();
    const router = useRouter();

    signOut(auth).then(() => {
        router.push('/login')
    }).catch((error) => {
        <h1>Failed to log you out</h1>
        console.log(error);
    })
    
    return (
        <>
            <LinearProgress/>
            <p>Logging you out...</p>
        </>
    )
}