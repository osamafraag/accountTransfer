import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../Components/Loader";

const List = React.lazy(() => import('../Pages/AccountsList'));
const Import = React.lazy(() => import('../Pages/ImportAccounts'));
const Transfer = React.lazy(() => import('../Pages/Transfer'));
const Error = React.lazy(() => import('../Pages/404'));

export default function Router() {
  
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<List/>} />
        <Route path="/import" element={<Import/>} />
        <Route path="/transfer" element={<Transfer/>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  );
}