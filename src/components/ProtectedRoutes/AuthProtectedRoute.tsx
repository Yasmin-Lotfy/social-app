import React, {  useEffect } from "react";
import { useNavigate } from "react-router";
import {  useAuth } from "../../context/authContext";

type ChildrenType = {
  children: React.ReactNode;
};

export default function AuthProtectedRoute({ children }: ChildrenType) {
  //  token (state);
 const {token} = useAuth()
  const navigate = useNavigate();

  // start , update token
  useEffect(() => {
    if (token) {
      // login
      navigate("/");
  
    }
  }, [token])

  return <>{children}</>;
}
