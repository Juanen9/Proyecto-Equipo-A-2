import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { postExerciseService } from "../../services";

function PostExercise () {

    const {token} = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = new FormData(e.target);
            await postExerciseService({data, token});


            e.target.reset();
            setImage(null);
            setError(null);
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    }


    return (
        <>
      <h1>Add new Exercise</h1>
      <form onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" required />
        </fieldset>
        <fieldset>
          <label htmlFor="description">Description</label>
          <textarea type="text" name="description" id="description" required />
        </fieldset>
        <fieldset>
          <label htmlFor="typology">Typology</label>
          <input type="text" name="typology" id="typology" required />
        </fieldset>
        <fieldset>
          <label htmlFor="muscleGroup">Muscle Group</label>
          <input type="text" name="muscleGroup" id="muscleGroup" required />
        </fieldset>
        <fieldset>
          <label htmlFor="exercisePhoto">Image</label>
          <input required
            type="file"
            name="exercisePhoto"
            id="exercisePhoto"
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
        <button>Post Exercise</button>
        {error ? <p>{error}</p> : null}
        {loading ? <p>posting exercise...</p> : null}
      </form>
    </>
    )
}

export default PostExercise;