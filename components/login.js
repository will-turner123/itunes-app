import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import { Box, Button, TextField, Alert, Grid, Container, Card, CardContent } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Typography } from '@mui/material';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  const onSubmit = (event) => {
    event.preventDefault();
    setError(null)
    setLoading(true)
    signInWithEmailAndPassword(email, password)
    .then(authUser => {
        const { uid } = authUser.user;
        if(authUser){
            firebase.firestore().collection('users').doc(uid).get()
            .then((doc) => {
                if(doc.exists){
                    const data = doc.data();
                    localStorage.setItem("userLikes", JSON.stringify(data.likes));
                }
            })
            .then(router.push('/'))
        }
    })
    .catch(error => {
      setError(String(error.message))
    });
    setLoading(false);
  };

  return (
    <>
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
                                <Typography variant="h4">Log in</Typography>
                            </Box>
                            <Grid container spacing={3} display="flex" sx={{flexDirection: "column"}}>
                                <Grid item xs={12}>
                                    <TextField
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    name="email"
                                    id="loginEmail"
                                    placeholder="Email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        id="loginPassword"
                                        placeholder="Password"
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
                                    <Typography variant="p">{"Dont have an account?"} 
                                        <Link href="/register" passHref>
                                            <Typography variant="p" element="span" color="primary"> Create an account</Typography>
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