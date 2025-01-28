import { configureStore } from "@reduxjs/toolkit"
import authReduce from "./authslice"

export const store=configureStore({
    reducer:{
        userdata:authReduce
    }
})