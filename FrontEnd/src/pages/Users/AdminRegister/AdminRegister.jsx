import { useState } from "react";
import { registerAdminService } from "../../../services";
import { useNavigate } from "react-router-dom";
import "./AdminRegister.css";

function AdminRegister () {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [clue, setClue] = useState("");
    const [role, SetRole] = useState("");
    const [error, setError] = useState("");


    const handleForm = async (e) => {
        e.preventDefault();
        if(role !== 'admin') {
            setError('Debes indicar tu cargo');
            return;
        }
        if(clue !== 'teamA') {
            setError('Debes de introducir la palabra secreta');
            return;
        }

        try{
            await registerAdminService ({name, email, pwd, clue, role});
            navigate('/login');
        }catch(error){
            setError(error.message);
        }
    }

    return( 
    <section className="admin-register-form">
        <h1 className="admin-register">Register</h1>
        <form onSubmit={handleForm}>
            <fieldset className="admin-name-field-register">
                <label htmlFor="username">Admin Name</label>
                <input type="text" id="username" name="username" required value={name} onChange={(e) => setName(e.target.value)}/>
            </fieldset>
            <fieldset className="admin-email-field-register">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            </fieldset>
            <fieldset className="admin-password-field-register">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required value={pwd} onChange={(e) => setPwd(e.target.value)}/>
            </fieldset>
            <fieldset className="admin-clue-field-register">
                <label htmlFor="clue">Clue</label>
                <input type="password" id="clue" name="clue" required value={clue} onChange={(e) => setClue(e.target.value)}/>
            </fieldset>
            <fieldset className="admin-role-field-register">
                <label htmlFor="role">Role</label>
                <input type="text" id="role" name="role" required value={role} onChange={(e) => SetRole(e.target.value)}/>
            </fieldset>
            <button className="admin-button-register">Register</button>
            {error ? <p>{error}</p> : null}
            
        </form>
    </section>
    )
}

export default AdminRegister;