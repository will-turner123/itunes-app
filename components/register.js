import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import { Box, Button, TextField, Alert, Grid, Container, Card, CardContent, LinearProgress } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Typography } from '@mui/material';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';


export default function Register() {
    const [email, setEmail] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    //Optional error handling
    const [error, setError] = useState(null);
  
    const { createUserWithEmailAndPassword } = useAuth();
  
    const onSubmit = event => {
        event.preventDefault();
        setError(null)
        if(passwordOne === passwordTwo){
            setLoading(true);
            createUserWithEmailAndPassword(email, passwordOne)
            .then(doc => {
                const { uid } = doc.user;
                localStorage.removeItem("userLikes");
                firebase.firestore().collection('users').doc(uid).set({
                    id: uid,
                    likes: {}
                })
                .then(router.push("/"))
            })
            .catch(error => {
                setError(error.message)
            });
        }
        else{
            setError("Password do not match")
        }
    };

  return (
    <>
    {loading && (<LinearProgress/>)}
    <Box
        component="main"
        sx={{
            alignItems: 'center',
            display: 'flex',
            flexGrow: 1,
            minHeight: '100vh',
            minWidth: '100%',
            backgroundColor: "#F9FAFC"
        }}
        >
       <Container maxWidth="sm">
           <Card variant="paper">
               <CardContent sx={{display: 'block'}}>
               <form onSubmit={onSubmit}>
                        { error && <Alert severity="error">{error}</Alert>}
                            <Box sx={{ my: 3}}>
                                <Typography variant="h4">Register</Typography>
                            </Box>
                            <Grid container spacing={3} display="flex" sx={{flexDirection: "column", width: '100%'}}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    name="email"
                                    id="registerEmail"
                                    placeholder="Email" 
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        type="password"
                                        name="passwordOne"
                                        value={passwordOne}
                                        onChange={(event) => setPasswordOne(event.target.value)}
                                        id="registerPassword"
                                        placeholder="Password"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        type="password"
                                        name="passwordTwo"
                                        value={passwordTwo}
                                        onChange={(event) => setPasswordTwo(event.target.value)}
                                        id="registerPassword2"
                                        placeholder="Confirm Password"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Button
                                        color="info"
                                        fullWidth
                                        startIcon={<LoginIcon/>}
                                        onClick={onSubmit}
                                        size="large"
                                        variant="contained"
                                    >
                                        Log in
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="p">Already have an account? 
                                        <Link href="/login" passHref>
                                            <Typography variant="p" element="span" color="primary"> Log in</Typography>
                                        </Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </form>
               </CardContent>
           </Card>
        </Container>
    </Box>
    </>
  )
}