import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getUserDataService, modifyUserService } from "../../services";

function EditMail() {
  const { token } = useContext(AuthContext);
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prevValue, setPrevValue] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getUserDataService({ token });
      setPrevValue(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      if (pwd) data.append("pwd", pwd);  
      if (email) data.append("email", email);
      if (email2) data.append("email2", email2);
      const userId = prevValue[0].id
      await modifyUserService({ data, token, userId });

      e.target.reset();
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Edit Email</h1>
      <form onSubmit={handleForm} encType="multipart/form-data">
      <fieldset>
          <label htmlFor="pwd">Old Password</label>
          <input required type="password" name="pwd" id="pwd" onChange={(e) => setPwd(e.target.value)} />
        </fieldset>
        <fieldset>
          <label htmlFor="email">New Email</label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
        </fieldset>
        <fieldset>
          <label htmlFor="email2">Repeat New Email</label>
          <input type="email" name="email2" id="email2" onChange={(e) => setEmail2(e.target.value)} />
        </fieldset>
        <button>Modify</button>
        {error ? <p>{error}</p> : null}
        {loading ? <p>Modify Email...</p> : null}
      </form>
    </>
  );
}

export default EditMail;
