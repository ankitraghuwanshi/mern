import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'


function ProtectedRoute({children}) {

    const navigate = useNavigate()


    useEffect(()=>{
        if(localStorage.getItem("token")){
            //
        }else{
            navigate('/login')
        }
    },[])

    return (
        
        <div>
            <h1>this route is Protected</h1>
            {children}
        </div>
        
    )
}

export default ProtectedRoute