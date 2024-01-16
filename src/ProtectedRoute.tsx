import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

export const ProtectedRoute: React.FC<PropsWithChildren<any>> = ({
  children,
  redirect,
}) => {
  const { user } = useAuth();

  if (!user?._id) return <Navigate to={redirect} />;
  return children;
};
// i want to deploy Nest js server with 40GB storage of media files for free or minimum price
