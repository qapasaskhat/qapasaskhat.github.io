import firebase from 'firebase'
//const firebase = require("firebase")
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyClPivKMurKtdzdFOvNK0wBC2SR857Dm8Q",
    authDomain: "education-app-ce19d.firebaseapp.com",
    databaseURL: "https://education-app-ce19d.firebaseio.com",
    projectId: "education-app-ce19d",
    storageBucket: "education-app-ce19d.appspot.com",
    messagingSenderId: "720107802142",
    appId: "1:720107802142:web:4e3898be14af3229e9680f",
    measurementId: "G-2TZ5Q5BBWX"
  };

class Fire {
    constructor() {
        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)
    }

    addPost = async ({ text, localUri }) => {
        console.log(text)
        console.log(localUri)

        const remoteUri = await this.uploadPhotoAsync(localUri,`photos/${this.uid}/${Date.now()}.jpg`)
        console.log(remoteUri);
        
        return new Promise((res, rej) => {

            this.firestore.collection("posts").add({
                text,
                uid: this.uid,
                timestamp: this.timestamp,
                image: remoteUri
            })
                .then(ref => {
                    res(ref)
                })
                .catch(error => {
                    rej(error)
                })
        })

    }

    uploadPhotoAsync = async (uri,filename) => {
        
        console.log(uri);

        return new Promise(async (res, rej) => {
            const respone = await fetch(uri)
            const file = await respone.blob()

            let upload = firebase
                            .storage()
                            .ref(filename)
                            .put(file)

            upload.on('state_changed', snapshot => { }, err => {
                rej(err)
            },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL()
                    res(url)
                }
            )
        })
    }

    creteUser = async (user,photo) =>{
        let remoteUri = null

        try{
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)

            let db = this.firestore.collection("users").doc(this.uid)
            db.set({
                name: user.name,
                email: user.email,
                photo: null,
                phone_number: user.phone_number

            })

            if (photo){
                remoteUri = await this.uploadPhotoAsync(photo, `avatarts/${this.uid}`)
                db.set({
                    photo: remoteUri
                },{
                    merge: true
                })
            }
        }
        catch (error) {
            alert(error.message)
        }
    }

    get firestore() {
        return firebase.firestore()
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }

    get timestamp() {
        return Date.now()
    }
}

Fire.shared = new Fire;
export default Fire