import { useState } from "react";
import { resetPasswordService } from "../../../services";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";

function ResetPassword () {

    const navigate = useNavigate();
    const [recoverCode, setRecoverCode] = useState("");
    const [newPassword, setNewpassword] = useState("");
    const [newPassword1, setNewpassword1] = useState("");
    const [error, setError] = useState("");


    const handleForm = async (e) => {
        e.preventDefault();

        try {

            await resetPasswordService({recoverCode, newPassword, newPassword1});
            e.target.reset();
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    }



    return (
        <section className="reset-password-form">
            <h1 className="reset-password">Reset Password</h1>
            <form onSubmit={handleForm}>
                <fieldset className="field-reset-code">
                    <label htmlFor="recover Code">Recover Code</label>
                    <input type="text" name="recoverCode" id="recoverCode" required onChange={(e) => setRecoverCode(e.target.value)}/>
                </fieldset>
                <fieldset className="field-new-password-reset">
                    <label htmlFor="newpassword">New Password</label>
                    <input type="password" name="newpassword" id="newpassword" required onChange={(e) => setNewpassword(e.target.value)}/>
                </fieldset>
                <fieldset className="field-repeat-password-reset">
                    <label htmlFor="newpassword1">Repeat New Password</label>
                    <input type="password" name="newpassword1" id="newpassword1" required onChange={(e) => setNewpassword1(e.target.value)}/>
                </fieldset>
                <button className="button-reset-password">Send</button>
                {error ? <p>{error}</p> : null}
            </form>
        </section>
    )
}

export default ResetPassword;