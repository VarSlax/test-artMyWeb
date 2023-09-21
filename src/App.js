import { Routes, Route } from "react-router-dom";
import UsersTable from "./components/UsersTable";
import HomePage from "./components/HomePage";
import UserProfile from "./components/UserProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/users" element={<UsersTable />} exact />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
