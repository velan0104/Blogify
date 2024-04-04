import { initializeApp } from 'firebase/app';
import {getAuth,createUserWithEmailAndPassword, GoogleAuthProvider,signInWithPopup, onAuthStateChanged,signOut} from "firebase/auth";
import { createContext,useContext,useEffect,useState } from "react";
import {getFirestore,collection,addDoc,getDocs,getDoc,doc} from 'firebase/firestore';
import {getStorage,ref,uploadBytes,getDownloadURL} from "firebase/storage"

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyAVMYuuhzXtOEji3ywpEdanTKRAw1eNaNQ",
  authDomain: "bloggerstop-d1db7.firebaseapp.com",
  projectId: "bloggerstop-d1db7",
  storageBucket: "bloggerstop-d1db7.appspot.com",
  messagingSenderId: "687868949895",
  appId: "1:687868949895:web:e77a3da9f72838890d0f22",
  measurementId: "G-VT963PCGX3"
};

export const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
export const useFirebase = () => useContext(FirebaseContext)
const provider = new GoogleAuthProvider();
const db = getFirestore(app)
const storage = getStorage(app)

export const FirebaseProvider = (props) =>{

  const [user,setUser] = useState(null);
  const [author,setAuthor] = useState(null);

  useEffect(() =>{
    onAuthStateChanged(firebaseAuth,(User) =>{
      console.log("User: ", User);
      if(User) setUser(User);
      else setUser(null);
    })
  },[])

  const signupUserWithEmailAndPassword = (email,password) =>{
    createUserWithEmailAndPassword(firebaseAuth,email,password).then((res) =>{
      console.log(res)
    }).catch((err) =>{
      console.log(err)
    })
  }

  const signInWithGoogle = () =>{
    signInWithPopup(firebaseAuth,provider).then((res) =>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const addBlog = async(title,content,coverPic) =>{
    const imageRef = ref(storage,`uploads/images/${Date().now}${title}`)
    const uploadRef = await uploadBytes(imageRef, coverPic);
    // const authorRef = ref(storage,`uploads/auth/${author.email}`)
    // const uploadAuthor = await uploadBytes(authorRef,author.pic)
    await addDoc(collection(db,'blogs'),{
      title,
      content,
      imageUrl: uploadRef.ref.fullPath,
      authorName: user.displayName,
      userEmail: user.email,
      userID: (user.uid == null) ? "Anonymous" : user.uid,
      // authorName: author.name,
      // authorEmail: author.email,
      // authorPic: uploadAuthor.ref.fullPath,
      // authorInterest: author.interest

    })
  }

  const addAuthor = (name, email, interest , pic) => {
    setAuthor({name: name, email: email, interest: interest, pic: pic})
  }

  const listAllBlogs = () =>{
    const data = getDocs(collection(db,'blogs'));
    console.log( "blogs: " , data );
    return getDocs(collection(db,"blogs"))
  }


  const getImageURL = async (path) =>{
    const storageRef = ref(storage,path);
    try {
      const res = await getDownloadURL(storageRef);
      return res;
    } catch (e) {
      return console.error(e);
    }
  }

  const getBlogById = async(blogId) =>{
    const docRef = doc(db, 'blogs', blogId);
    const docSnap = await getDoc(docRef); 
    if(docSnap.exists()){
      return docSnap.data()
    }else{
      return null
    }
  }

  const signOutUser = () =>{
    signOut(firebaseAuth).then(() => {
      console.log(user)
    }).catch((e) => console.log(e))
  }

  const isLoggedIn = (user) ?  true : false ;

  return(
    <FirebaseContext.Provider value = {{signupUserWithEmailAndPassword,signInWithGoogle,addBlog,listAllBlogs,getImageURL,getBlogById,isLoggedIn,signOutUser,author,addAuthor}}>
      {props.children}
    </FirebaseContext.Provider>
  )
}

