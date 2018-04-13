import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

 


interface User {
    uid: string;
    email: string;
    fname:string;
    lname:string;
    phone:string;
    state:string;
}
  
@Injectable()
export class AuthService {
    private user: firebase.User;

    constructor(
            public afAuth: AngularFireAuth,
            private afs: AngularFirestore, 
            
        ) {
        afAuth.authState.subscribe(user => {
            this.user = user;
        });
        
    }
    get authenticated(): boolean {
        return this.user !== null;
    }
    getEmail() {
        return this.user && this.user.email;
    }
    setUserDoc(user,credentials){
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
        const data: User = {
            uid: user.uid,
            email: user.email || null,
            fname: credentials.fname || null,
            lname: credentials.lname || null,
            phone: credentials.phone || null,
            state: credentials.state || null, 
        }
        console.log(data);
        return userRef.set(data)
    }
    signInWithEmail(credentials) {
        console.log('Sign in with email');
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,credentials.password)
            .then(newUser=>{
                return this.setUserDoc(newUser, credentials);
            });
    }
    signUp(credentials) {
        return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(newUser => {
            return this.setUserDoc(newUser, credentials);
        });
    }
    signOut(): Promise<void> {
        return this.afAuth.auth.signOut();
    }
    signInWithGoogle() {
        console.log('Sign in with google');
        return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
    }
    private oauthSignIn(provider: AuthProvider) {
        if (!(<any>window).cordova) {
            return this.afAuth.auth.signInWithPopup(provider);
        } else {
            return this.afAuth.auth.signInWithRedirect(provider)
                .then(() => {
                    return this.afAuth.auth.getRedirectResult().then(result => {
                        // This gives you a Google Access Token.
                        // You can use it to access the Google API.
                        let token = result.credential.accessToken;
                        // The signed-in user info.
                        let user = result.user;
                        console.log(token, user);
                    }).catch(function (error) {
                        // Handle Errors here.
                        alert(error.message);
                    });
                });
        }
    }
}