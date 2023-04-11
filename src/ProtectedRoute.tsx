import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

interface Props {
  redirect: string;
}

export const ProtectedRoute: React.FC<PropsWithChildren<any>> = ({
  children,
  redirect,
}) => {
  const { user } = useAuth();

  if (!user) return <Navigate to={redirect} replace />;
  return children;
};
