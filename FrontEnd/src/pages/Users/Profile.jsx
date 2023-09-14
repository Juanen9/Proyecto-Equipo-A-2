import {  useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { modifyUserService } from "../../services";

function Profile  ()  {
  const { token } = useContext(AuthContext);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [pwd3, setPwd3] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();


    try {

      setLoading(true);

       // Crear un objeto FormData
    const data = new FormData();

    // Agregar campos no vacíos al FormData
    if (userId) data.append("userId", userId);
    if (name) data.append("name", name);
    if (email) data.append("email", email);
    if (email2) data.append("email2", email2);
    if (pwd) data.append("pwd", pwd);
    if (pwd2) data.append("pwd2", pwd2);
    if (pwd3) data.append("pwd3", pwd3);
    if (image) data.append("image", image);

      await modifyUserService({ data, token, userId });

      e.target.reset();
      setImage(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1>Edit Profile</h1>
      <form onSubmit={handleForm}>
      <fieldset>
          <label htmlFor="userId">User Id</label>
          <input type="number" name="userId" id="userId" required onChange={(e) => setUserId(e.target.value)}/>
        </fieldset>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name"onChange={(e) => setName(e.target.value)}/>
        </fieldset>
        <fieldset>
          <label htmlFor="email">New Email</label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
        </fieldset>
        <fieldset>
          <label htmlFor="email2">Repeat New Email</label>
          <input type="email" name="email2" id="email2" onChange={(e) => setEmail2(e.target.value)}/>
        </fieldset>
        <fieldset>
          <label htmlFor="pwd">Old Password</label>
          <input type="password" name="pwd" id="pwd" onChange={(e) => setPwd(e.target.value)}/>
        </fieldset>
        <fieldset>
          <label htmlFor="pwd2">New Password</label>
          <input type="password" name="pwd2" id="pwd2" onChange={(e) => setPwd2(e.target.value)}/>
        </fieldset>
        <fieldset>
          <label htmlFor="pwd3">Repeat New Password</label>
          <input type="password" name="pwd3" id="pwd3" onChange={(e) => setPwd3(e.target.value)}/>
        </fieldset>
        <fieldset>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            accept={"image/*"}
            onChange={(e) => setImage(e.target.files[0])}
          />
          {image ? (
            <figure>
              <img
                src={URL.createObjectURL(image)}
                style={{ width: "100px" }}
                alt="Preview"
              />
            </figure>
          ) : null}
        </fieldset>
        <button>Modify</button>
        {error ? <p>{error}</p> : null}
        {loading ? <p>Modify Profile...</p> : null}
      </form>
    </>
  );
};

export default Profile;