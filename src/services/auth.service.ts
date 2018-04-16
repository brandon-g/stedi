import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';

 


interface User {
    uid: string;
    email: string;
    fname:string;
    lname:string;
    phone:string;
    state:string;
    schoolDistrict:string;
}

interface Roll{
    uid: string;
    parent: boolean;
    subteacher: boolean;
    teacher: boolean;
}
  
@Injectable()
export class AuthService {
    private user: firebase.User;
    private uid : string;
    public  rolls: AngularFirestoreDocument<Roll>;
    constructor(
            public afAuth: AngularFireAuth,
            private afs: AngularFirestore, 
            private storage: Storage
        ) {
        
        //this.setUserFromSession();    

        afAuth.authState.subscribe(user => {
            this.user = user;
        });

        this.storage.get('uid').then((uid) => {
            this.uid = uid;
            this.rolls = this.afs.doc(`rolls/${uid}`);   
        });    
        
    }
    get authenticated(): boolean {
        return this.user !== null;
    }
    getEmail() {
        return this.user && this.user.email;
    }
    updaterolls(data){
        const rollRef: AngularFirestoreDocument<Roll> = this.afs.doc(`rolls/${this.uid}`);
        const data1: Roll = {
            uid: this.uid,
            parent : data.parent,
            teacher : data.teacher,
            subteacher : data.subteacher 
        }
        return rollRef.set(data1)
    }
    hasrolls(){
        this.storage.get('uid').then((uid) => {
            
            return this.rolls.valueChanges();
        });
        return false;
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
            schoolDistrict: credentials.state || null, 
        }
        console.log(data);
        return userRef.set(data)
    }
    signInWithEmail(credentials) {
        console.log('Sign in with email');
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,credentials.password)
            .then(user=>{
                //console.log(result);
                this.storeUserLogin(user);
                
            });
    }
    signUp(credentials) {
        return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(newUser => {
            return this.setUserDoc(newUser, credentials);
        });
    }
    signOut(): Promise<void> {
        return this.afAuth.auth.signOut().then(result=>{
            this.removeUserLogin();
        });
    }
    signInWithGoogle() {
        console.log('Sign in with google');
        return this.oauthSignIn(new firebase.auth.GoogleAuthProvider()).then(result =>{
            this.storeUserLogin(result.user);
        });
    }
    setUserFromSession(){
        this.storage.get('token').then((token) => {
            console.log(token);
            if(token){
               //this.afAuth.auth.signInAndRetrieveDataWithCustomToken(token);                 
            }
        });
    }
    private removeUserLogin(){
        this.storage.set('token', '');
        this.storage.set('user', '');
        this.storage.set('uid', '');
    }
    private storeUserLogin(user){
        //console.log(user);
        //let token = result.credential.token;
        //let displayName = 
       // let user = result.user;
        //let uid = user.uid;
        //console.log(result);
        //this.storage.set('token', token);
        this.storage.set('uid', user.uid);
        //this.storage.set('user', user);
        this.uid = user.uid;
        
    }
    private oauthSignIn(provider: AuthProvider) {
        if (!(<any>window).cordova) {
            return this.afAuth.auth.signInWithPopup(provider);
        } else {
            return this.afAuth.auth.signInWithRedirect(provider)
                .then(() => {
                    return this.afAuth.auth.getRedirectResult().then(result => {
                        this.storeUserLogin(result.user);
                   }).catch(function (error) {
                        alert(error.message);
                    });
                });
        }
    }
}