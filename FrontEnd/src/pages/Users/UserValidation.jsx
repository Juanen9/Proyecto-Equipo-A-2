import { useEffect, useState } from "react";
import { validateUserService } from "../../services";
import { useParams } from "react-router-dom";


function UserValidation () {

    const [loading, setLoading] = useState("")
    const [error, setError] = useState("")
    const {regCode} = useParams()
    const [validate, setValidate] = useState("")

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await validateUserService({regCode});
            setValidate(data)
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }}
        useEffect(() =>{
            fetchData()
        }, [])
        console.log(validate)
     return (
        <section>
            {validate?<p>{validate}</p>:null}
            {error?<p>{error}</p>:null}
        </section>
    )
}


export default UserValidation

