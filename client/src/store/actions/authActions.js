import axios from "axios"
import {url} from "../../api/index"
import {toast} from "react-toastify"

export const signUp = (user)=>{
    return(dispatch)=>{
        axios.post(`${url}/signup`, user)
        .then((token=>{
            localStorage.setItem("token",token.data)
            dispatch({
                type: "SIGN_UP",
                token: token.data
            })
        }))
        .catch(error=>{
            console.log(error.response)
            toast.error(error.response?.data,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }
}
export const signIn = (credentials)=>{
    return(dispatch)=>{
        axios.post(`${url}/signin`, credentials)
        .then((token=>{
            localStorage.setItem("token",token.data)
            dispatch({
                type: "SIGN_IN",
                token: token.data
            })
        }))
        .catch(error=>{
            console.log(error)
            toast.error(error.response?.data,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }
}

export const loadUser = () => {
    try {
      return (dispatch, getState) => {
      const token = getState().auth.token;
      if (token) {
        dispatch({
          type: "USER_LOADED",
          token,
        });
      } else return null;
    };  
    } catch (error) {
        console.log(error);
        
    }
    
  };
// export const loadUser=()=>{
//     return(dispatch, getState)=>{
//         console.log("load user triggered");
//         const token=getState().auth.token
        
//         if(token){
//             dispatch({
//                 type:"USER_LOAD",
//                 token
//             })
//         }else{
//             return null
//         }
//     }
// }


export const signOut=()=>{
    return(dispatch)=>{
        dispatch({
            type:"SIGN_OUT"
        })
    }
}