import React, { useEffect, useState } from 'react';
import 'firebase/auth';
import firebase from "firebase/compat/app";
import { useRouter } from 'next/router';
import { LinearProgress } from '@mui/material';


export default function PrivateRoute(props){
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const currentUser = firebase.auth().currentUser;
        if(currentUser){
            setLoading(false);
        }
        else{
            router.push('/login');
        }
    })

    return(
        <>
            {loading && (<LinearProgress/>)}
            {!loading && (
                <>{ props.children }</>
            )}
        </>
    )
}