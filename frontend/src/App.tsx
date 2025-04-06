import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RoomPage from "./pages/RoomPage";
// import ProtectedRoute from "./components/ProtectedRoute";
import { AuthPage } from "./pages/AuthPage";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />}/>
          
            {/* Protected Routes */}
            {/* <Route element={<ProtectedRoute />}> */}
              <Route path="/room/*" element={<RoomPage />} />
            {/* </Route> */}
        </Routes>
      </Router>
  );
};

export default App;
