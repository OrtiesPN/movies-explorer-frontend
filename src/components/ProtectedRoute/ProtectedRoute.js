import { useContext } from "react";
import { Navigate } from "react-router-dom";
import LoggedInContext from "../../contexts/LoggedInContext";

export default function ProtectedRoute({ element: Component, ...props  }) {
  const isLoggedIn = useContext(LoggedInContext);
  return (
    isLoggedIn ? <Component {...props} /> : <Navigate to="/signin" replace/>
)}