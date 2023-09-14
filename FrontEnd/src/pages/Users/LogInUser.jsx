import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { logInUserService } from "../../services";
import RecoverPassword from "./RecoverPassword";

function LogInUser () {

    const navigate = useNavigate();
    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [error, setError] = useState("");

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            const token = await logInUserService({email, pwd}); 
            login(token);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    }

    return(
        <section>
            <h1>Login</h1>
            <form onSubmit={handleForm}>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="pwd">Password</label>
                    <input
                        type="password"
                        name="pwd"
                        id="pwd"
                        value={pwd}
                        required
                        onChange={(e) => setPwd(e.target.value)}
                    />
                </fieldset>
                <button type="submit">Login</button>
                <Link to={'/recover-password'}>Has olvidado la contraseña?</Link>
                {error ? <p>{error}</p> : null}
                </form>
            </section>
    );
};

export default LogInUser;