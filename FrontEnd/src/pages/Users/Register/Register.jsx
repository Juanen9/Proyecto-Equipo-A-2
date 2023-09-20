import { useState } from "react";
import { registerUserService } from "../../../services";
import { useNavigate } from "react-router-dom";
import "./Register.css"

function Register () {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwd2, setPwd2] = useState("");
    const [error, setError] = useState("");


    const handleForm = async (e) => {
        e.preventDefault();

        if(pwd !== pwd2) {
            setError('Passwords do not match');
            return;
        }
        
        try{
            await registerUserService({name, email, pwd, pwd2});
            navigate('/login');
        }catch(error){
            setError(error.message);
        }
    }

    return( 
    <section className="register-form">
        <h1 className="register">Register</h1>
        <form onSubmit={handleForm}>
            <fieldset className="username-field">
                <label htmlFor="username">User Name</label>
                <input type="text" id="username" name="username" required value={name} onChange={(e) => setName(e.target.value)}/>
            </fieldset>
            <fieldset className="email-field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            </fieldset>
            <fieldset className="password-field"> 
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required value={pwd} onChange={(e) => setPwd(e.target.value)}/>
            </fieldset>
            <fieldset className="repeat-password-field">
                <label htmlFor="password2">Repeat Password</label>
                <input type="password" id="password2" name="password2" required value={pwd2} onChange={(e) => setPwd2(e.target.value)}/>
            </fieldset>
            <button className="button-register">Register</button>
            {error ? <p>{error}</p> : null}
        </form>
    </section>
    )
}

export default Register;