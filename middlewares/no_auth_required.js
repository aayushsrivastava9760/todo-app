/***
 * @todo Redirect the user to main page if token is present.
 */

 import { Router, useRouter } from "next/router";
 import { useEffect } from "react";
 import { useAuth } from "../context/auth";
 import router from "next/router";
 
 export const no_auth_required = () => {
 
    const router = useRouter()
 
    const { token } = useAuth()
 
    useEffect(()=>{
        if(token){
            console.log('no auth is required');
            //router.push('/')
            router.replace('/')
        }
    },[token])
}