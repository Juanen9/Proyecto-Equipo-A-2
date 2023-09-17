import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getUserDataService, modifyUserService } from "../../services";

function EditPassword() {
  const { token } = useContext(AuthContext);
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [pwd3, setPwd3] = useState("");
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
      if (pwd2) data.append("pwd2", pwd2);
      if (pwd3) data.append("pwd3", pwd3);

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
      <h1>Edit Password</h1>
      <form onSubmit={handleForm} encType="multipart/form-data">
        <fieldset>
          <label htmlFor="pwd">Password</label>
          <input type="password" name="pwd" id="pwd" onChange={(e) => setPwd(e.target.value)} />
        </fieldset>
        <fieldset>
          <label htmlFor="pwd2">New Password</label>
          <input type="password" name="pwd2" id="pwd2" onChange={(e) => setPwd2(e.target.value)} />
        </fieldset>
        <fieldset>
          <label htmlFor="pwd3">Repeat New Password</label>
          <input type="password" name="pwd3" id="pwd3" onChange={(e) => setPwd3(e.target.value)} />
        </fieldset>
        <button>Modify</button>
        {error ? <p>{error}</p> : null}
        {loading ? <p>Modify Password...</p> : null}
      </form>
    </>
  );
}

export default EditPassword;
