import { useEffect, useState } from "react";
import { validateUserService } from "../../services";
import { useParams } from "react-router-dom";


function UserValidation () {

    const [loading, setLoading] = useState("")
    const [error, setError] = useState("")
    const {regCode} = useParams()
    const [validate, setValidate] =useState()
    let counter = 0;    

    
    const fetchData = async () => {
        try {
            if (counter != 0) {
            setLoading(true);
            const data = await validateUserService({regCode});
            setValidate(data);
            }
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }}
        useEffect(() =>{
                fetchData();
            console.log(counter);
            counter ++;
            
        }, [])

     return (
        <section>
            {validate?<p>{validate.message}</p>:null}
            {error?<p>{error}</p>:null}
        </section>
    )
}


export default UserValidation

