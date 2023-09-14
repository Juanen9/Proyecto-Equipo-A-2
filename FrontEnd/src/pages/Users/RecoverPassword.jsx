import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { recoverPasswordService } from "../../services";
import { useNavigate } from "react-router-dom";

function RecoverPassword () {

    const navigate = useNavigate();
    const {token} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleForm = async (e) => {
        e.preventDefault();

        try {

            await recoverPasswordService({email, token});
            e.target.reset();
            navigate("/reset-password");
        } catch (error) {
            setError(error.message);
        }
    }



    return (
        <>
            <h1>Recover Password</h1>
            <form onSubmit={handleForm}>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)}/>
                </fieldset>
                <button>Send</button>
                {error ? <p>{error}</p> : null}
            </form>
        </>
    )
}

export default RecoverPassword;