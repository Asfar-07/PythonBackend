import { createSlice } from "@reduxjs/toolkit";

export const authSlice=createSlice({
    name:"username",
    initialState:{
        user:null
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
            window.localStorage.setItem("userdata",JSON.stringify(action.payload))
        },
        Removeitem:(state)=>{
            state.user=null
            window.localStorage.setItem("userdata",null)
        },
        setDatalocal:(state)=>{
            let UserData=window.localStorage.getItem("userdata")
            if(UserData){
                state.user=UserData
            }else{
                state.user=null
            }
        }
    }

})
export const{setUser,setDatalocal,Removeitem}=authSlice.actions
export default authSlice.reducer