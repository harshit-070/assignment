import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Applicants from "./Components/Applicants";
import CreateJob from "./Components/CreateJob";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Message from "./Components/Message";
import RequireAuth from "./Components/RequireAuth";
import SignIn from "./Components/SignIn";
import ViewJob from "./Components/ViewJob";
import ViewJobs from "./Components/ViewJobs";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createjob" element={<CreateJob />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/response/:jobId" element={<Applicants />} />
        <Route path="/viewJob/:jobId" element={<ViewJob />} />
        <Route path="/jobs" element={<ViewJobs />} />
        <Route element={<RequireAuth />}></Route>
      </Routes>
      <Message />
    </div>
  );
}

export default App;
