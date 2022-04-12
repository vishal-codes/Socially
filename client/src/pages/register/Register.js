import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import './Register.css';

function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const history = useHistory();

    const handleRegisterClick = async(event) => {
        event.preventDefault();
        if(confirmPassword.current.value !== password.current.value){
            confirmPassword.current.setCustomValidity("Password doesn't match");
        }else {
            const user = {
                username : username.current.value,
                email : email.current.value,
                password : password.current.value,
            }
            try{
                await axios.post("/auth/register", user);
                history.push("/login");
            } catch(error){
                console.log(error);
            }
        }
    };

    const signInBtnClicked = () => {
        window.location.replace("/login");
      }

    return (
        <div className="logIn">
            <div className="logInWrapper">
                <div className="logInLeft">
                    <h3 className="logInLogo">Socially :)</h3>
                    <span className="logInDescription">
                        Connect with your loved ones !
                    </span>
                </div>
                <div className="logInRight">
                    <form className="logInRegisterBox" onSubmit={handleRegisterClick}>
                        <input
                            required
                            ref={username}
                            placeholder="Username"
                            type="text"
                            className="logInInput"
                        />
                        <input
                            required
                            ref={email}
                            placeholder="Email"
                            type="Email"
                            className="logInInput"
                        />
                        <input
                            required
                            ref={password}
                            placeholder="Password"
                            type="Password"
                            minLength={7}
                            className="logInInput"
                        />
                        <input
                            required
                            ref={confirmPassword}
                            placeholder="Confirm Password"
                            minLength={7}
                            type="Password"
                            className="logInInput"
                        />
                        <button className="logInButton" type="submit">Sign Up</button>
                    </form>
                    <button onClick={signInBtnClicked} className="logInRegisterButton">Log into Existing Account</button>
                </div>
            </div>
        </div>
    );
}

export default Register;
