import {toast} from "react-toastify"
import jwtDecode from "jwt-decode"

const initialState={
    token:localStorage.getItem("token"),
    name: null,
    email: null,
    _id: null
}

const authReducer=(state=initialState, action)=>{
    switch (action.type) {
        case "SIGN_IN":
        case "SIGN_UP":
        case "USER_LOADED":
            const user= jwtDecode(action.token)
            toast(`Welcome ${user.name}`,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
            console.log("trying:",user);
            return{
                ...initialState,
                token:action.token,
                name:user.name,
                email:user.email,
                _id:user._id
            }
        case "SIGN_OUT":
            localStorage.removeItem('token')
            toast(`Good bye ${state.name}`,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
            return initialState;
        default:
            return state
    }
}

export default authReducer