import { useState } from "react";
import { resetPasswordService } from "../../services";
import { useNavigate } from "react-router-dom";

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
        <>
            <h1>Reset Password</h1>
            <form onSubmit={handleForm}>
                <fieldset>
                    <label htmlFor="recover Code">Recover Code</label>
                    <input type="text" name="recoverCode" id="recoverCode" required onChange={(e) => setRecoverCode(e.target.value)}/>
                </fieldset>
                <fieldset>
                    <label htmlFor="newpassword">New Password</label>
                    <input type="password" name="newpassword" id="newpassword" required onChange={(e) => setNewpassword(e.target.value)}/>
                </fieldset>
                <fieldset>
                    <label htmlFor="newpassword1">Repeat New Password</label>
                    <input type="password" name="newpassword1" id="newpassword1" required onChange={(e) => setNewpassword1(e.target.value)}/>
                </fieldset>
                <button>Send</button>
                {error ? <p>{error}</p> : null}
            </form>
        </>
    )
}

export default ResetPassword;