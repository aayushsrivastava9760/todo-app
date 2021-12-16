/***
 * @todo Redirect the user to login page if token is not present.
 */

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/auth";
import router from "next/router";

export const auth_required = () => {

    const router = useRouter()

    const { token } = useAuth()

    useEffect(()=>{
        if(!token){
            console.log('auth is required');
            //router.push('/login')
            router.replace('/login/')
        }
    },[token])
}