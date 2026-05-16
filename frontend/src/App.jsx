import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyList from "./pages/MyList";

function App() {
  const logout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
  };

  return (
    <>
      <nav className="bg-black text-white flex items-center justify-between px-8 py-4">
  <div className="flex items-center gap-6">
    <Link to="/" className="text-red-600 text-2xl font-bold">
      NETFLIX
    </Link>

    <Link to="/login" className="hover:text-red-500">
      Login
    </Link>

    <Link to="/register" className="hover:text-red-500">
      Register
    </Link>

    <Link to="/mylist" className="hover:text-red-500">
      My List
    </Link>
  </div>

  <button
    onClick={logout}
    className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
  >
    Logout
  </button>
</nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mylist" element={<MyList />} />
      </Routes>
    </>
  );
}

export default App;