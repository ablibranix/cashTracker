import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider } from 'firebase/auth';
import { Button, CircularProgress, Container, Dialog, Typography } from '@mui/material';
import { useAuth } from '../firebase/auth';
import { auth } from '../firebase/firebase';
import styles from '../styles/landing.module.scss';

const REDIRECT_PAGE = '/dashboard';

// Configure FirebaseUI.
const uiConfig = {
signInFlow: 'popup',
signInSuccessUrl: REDIRECT_PAGE,
signInOptions: [
  EmailAuthProvider.PROVIDER_ID,
],
};

export default function Home() {
const { authUser, isLoading } = useAuth();
const router = useRouter();
const [login, setLogin] = useState(false);

useEffect(() => {
  if (!isLoading && authUser) {
    router.push(REDIRECT_PAGE);
  }
}, [authUser, isLoading])

return ((isLoading || (!isLoading && !!authUser)) ? 
  <CircularProgress color="inherit" sx={{ marginLeft: '50%', marginTop: '25%' }}/>
  :
  <div>
    <Head>
    <link rel="icon" href="/favicon.ico" />
      <title>Cash Tracker</title>
    </Head>

    <main>
      <Container className={styles.container}>
        <Typography variant="h1">Welcome to Cash Tracker!</Typography>
        <Typography variant="h2">Track your cash like a boss, not like a lost cause</Typography>
        <div className={styles.buttons}>
          <Button variant="contained" color="secondary"
                  onClick={() => setLogin(true)}>
            Login / Sign Up
          </Button>
        </div>
        <Dialog onClose={() => setLogin(false)} open={login}>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
        </Dialog>
      </Container>
    </main>
  </div>
)
}