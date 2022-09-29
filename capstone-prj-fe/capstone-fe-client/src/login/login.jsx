import React from "react";
import "./login.css";
import { initializeApp } from "firebase/app";
import { axiosService } from "../axiosService";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    FacebookAuthProvider,
} from "firebase/auth";
import { firebaseConfig } from "./fire";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { PATH } from "../helper/constant";
import { Cookies } from "react-cookie";
import { message } from "antd";

const Login = () => {
    const navigate = useNavigate();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const googleProvider = new GoogleAuthProvider();
    const provider = new FacebookAuthProvider();
    const cookies = new Cookies();

    const getLastName = (arr) => {
        let lastname;
        for (let index = 1; index < arr.length; index++) {
            lastname = arr[index] + ' ';
        }
        return lastname;
    }
    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            const user = res.user;
            const q = query(
                collection(db, "users"),
                where("uid", "==", user.uid)
            );
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name: user.displayName || "",
                    authProvider: "google",
                    email: user.email,
                });
            }
            const bodyRequest = {
                user: {
                    googleId: res.user.uid,
                    givenName: res.user.displayName.split(' ')[0],
                    familyName: getLastName(res.user.displayName.split(' ')),
                    email: res.user.email,
                    avatar_url: res.user.photoURL,
                },
            };
            axiosService.post("/login", bodyRequest).then((res) => {
                if (res.status === 200) {
                    cookies.set("token", user.accessToken);
                    localStorage.setItem("username", user.displayName);
                    cookies.set("userID", res.data.id);
                    cookies.set("balance_1", res.data.account_informations[0].balance);
                    navigate(PATH.LENDSERVICE_PATH);
                }
            });
        } catch (err) {
            message.error("Login fail");
        }
    };
    const signInWithFaceBook = () => {
        try {
            signInWithPopup(auth, provider).then((result) => {
                const bodyRequest = {
                    user: {
                        googleId: result.user.uid,
                        givenName: result.user.displayName.split(' ')[0],
                        familyName: getLastName(result.user.displayName.split(' ')),
                        email: result.user.email,
                        avatar_url: result.user.photoURL,
                    },
                };
                axiosService.post("/login", bodyRequest).then((res) => {
                    if (res.status === 200) {
                        const user = result.user;
                        cookies.set("token", user.accessToken);
                        localStorage.setItem("username", user.displayName);
                        cookies.set("userID", res.data.id);
                        cookies.set("balance_1", res.data.account_informations[0].balance);
                        navigate(PATH.LENDSERVICE_PATH);
                    }
                });
            });
        } catch (error) {
            message.error("Login fail");
        }
    };

    return (
        <div className="w-100">
            <div className="w-100 align-items-center">
                <div className="w-100 m-auto contain-form bg-white">
                    <img
                        src="https://res.cloudinary.com/da0i1amaa/image/upload/v1653641595/70653wqqs42_lit4nd.png"
                        height="60px"
                        width="60px"
                        alt="p2plogo"
                        className="my-3"
                    ></img>
                    <h1>Welcome to P2P</h1>
                    <div
                        className="button-google d-flex m-auto col-10 position-relative"
                        onClick={signInWithGoogle}
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    >
                        <img
                            src="https://res.cloudinary.com/da0i1amaa/image/upload/v1652948620/icons8-google-48_giupcz.png"
                            width="30px"
                            height="30px"
                            alt=""
                            className="image position-absolute"
                        ></img>

                        <p className="d-flex m-auto">
                            <strong> Continue with Google</strong>
                        </p>
                    </div>
                    <div
                        className="button-facebook d-flex m-auto my-3 col-10 position-relative"
                        onClick={signInWithFaceBook}
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    >
                        <img
                            src="https://res.cloudinary.com/da0i1amaa/image/upload/v1657108979/291736034_860446911583841_7200736229247997315_n.png_t04req.png"
                            width="30px"
                            height="30px"
                            alt=""
                            className="image position-absolute"
                        ></img>
                        <p className="d-flex m-auto">
                            <strong> Continue with Facebook</strong>
                        </p>
                    </div>
                    <div>
                        <p>By continuing, you agree to P2P's</p>
                        <p>
                            <strong className="Terms_Policy">
                                Terms of Service
                            </strong>{" "}
                            and acknowledge you've read our
                        </p>
                        <p>
                            <strong className="Terms_Policy">
                                Privacy Policy
                            </strong>
                        </p>
                    </div>
                    <div className="dropdown-divider"></div>
                    <p>
                        <strong>Get started here!</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
