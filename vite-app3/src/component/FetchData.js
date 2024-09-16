import { FETCH_FAILED, FETCH_REQUEST, FETCH_SUCCESSFULL } from "../redux/Actions"
import axios from 'axios'
 const FetchData=(url)=> async(dispatch)=>{

    dispatch({type:FETCH_REQUEST});
    
    try{
       const response= await axios.get(url)
        dispatch({type:FETCH_SUCCESSFULL, payload:response.data.data})
        console.log(response.data.data)

    }
    catch(error){

        console.log("Something Wenet Wrong", error);
        dispatch({type:FETCH_FAILED,payload:error})

    }
}
export default FetchData;