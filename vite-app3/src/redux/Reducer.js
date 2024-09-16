import { FETCH_FAILED, FETCH_REQUEST, FETCH_SUCCESSFULL } from "./Actions"

const initialState={

    isLoading:false,
    isError:false,
    data:[]
}

const Reducer=(state=initialState,action)=>{

    switch(action.type){


        case FETCH_REQUEST:
            return{
                ...state,
                isLoading:true
            }

        case FETCH_SUCCESSFULL:
            return{
                ...state,
                data:action.payload,
                isLoading:false,
                isError:false
                
            }
        case FETCH_FAILED:
            return{
                ...state,
                data:action.payload,
                isLoading:false,
                isError:true
            }
        default:
            return state;
    }

}
export default Reducer