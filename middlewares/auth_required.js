/***
 * @todo Redirect the user to login page if token is not present.
 */

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/auth";

export const auth_required = () => {

    console.log('auth is required');

    const router = useRouter()

    const { token } = useAuth()

    useEffect(()=>{
        if(!token){
            router.push('/login')
        }
    },[token])
}