import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getUserDataService, modifyUserService } from "../../services";

function Profile() {
  const { token } = useContext(AuthContext);
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("");
  const [avatarUser, setAvatarUser] = useState(null); // Estado para la imagen de perfil
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

      if (name) data.append("name", name);
      if (avatarUser) data.append("avatarUser", avatarUser);
      if (pwd) data.append("pwd", pwd);
      const userId = prevValue[0].id
      await modifyUserService({ data, token, userId });

      e.target.reset();
      setAvatarUser(null);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Edit Profile</h1>
      <form onSubmit={handleForm} encType="multipart/form-data">
      <fieldset>
          <label htmlFor="pwd">Password</label>
          <input required type="password" name="pwd" id="pwd" onChange={(e) => setPwd(e.target.value)} />
        </fieldset>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} placeholder={prevValue[0] ? prevValue[0]["user_name"] : ""} />
        </fieldset>
        <fieldset>
          <label htmlFor="avatarUser">Avatar User</label>
          <input
            type="file"
            name="avatarUser"
            id="avatarUser"
            accept="image/*"
            onChange={(e) => setAvatarUser(e.target.files[0])} // Actualizar el estado cuando se selecciona una imagen
          />
          {avatarUser ? ( // Mostrar la nueva imagen seleccionada (si existe)
            <figure>
              <img
                src={URL.createObjectURL(avatarUser)}
                style={{ width: "100px" }}
                alt="Preview"
              />
            </figure>
          ) : prevValue[0] && prevValue[0].avatar ? ( // Mostrar la imagen de perfil existente solo si existe
            <figure>
              <img
                src={`http://localhost:5173/public/avatarUser/${prevValue[0].avatar}`}
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
}

export default Profile;
