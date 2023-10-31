import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getUserDataService, modifyUserService } from "../../../services";
import "./EditProfile.css";
import editIcon from "../../../assets/edit-icon.svg"
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
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
      navigate("/")
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
    <section className="edit-profile-form">
      <h1 className="edit-password">Edit Profile</h1>
      <form onSubmit={handleForm} encType="multipart/form-data">
      <fieldset className="image-field-edit-profile file-input-container-edit-profile">
          <label className="custom-file-upload-edit-profile" htmlFor="avatarUser">{avatarUser ? ( // Mostrar la nueva imagen seleccionada (si existe)
              <img className="edit-profile-object-url-image"
                src={URL.createObjectURL(avatarUser)}
                alt="Preview"
              />
          ) : prevValue[0] && prevValue[0].avatar ? ( // Mostrar la imagen de perfil existente solo si existe
              <img className="edit-profile-object-url-image"
                src={`http://localhost:5173/public/avatarUser/${prevValue[0].avatar}`}
                alt="Preview"
              />
          ) : null}
          </label>

          <input className="input-image-edit-profile"
            type="file"
            name="avatarUser"
            id="avatarUser"
            accept="image/*"
            onChange={(e) => setAvatarUser(e.target.files[0])} // Actualizar el estado cuando se selecciona una imagen
          />
          <img src={editIcon} alt="edit picture icon" className="profile-edit-icon" />
        </fieldset>
        <fieldset className="field-edit-profile-name">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} placeholder={prevValue[0] ? prevValue[0]["user_name"] : ""} />
        </fieldset>
        <fieldset className="field-edit-profile-password">
          <label htmlFor="pwd">Password</label>
          <input required type="password" name="pwd" id="pwd" onChange={(e) => setPwd(e.target.value)} />
        </fieldset>
        <div className="div-button">
          <button className="button-edit-profile">Modify</button>
        </div>
        {error ? <p>{error}</p> : null}
        {loading ? <p>Modify Profile...</p> : null}
      </form>
    </section>
  );
}

export default EditProfile;
