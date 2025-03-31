import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./custom hooks/ProtectedRoute";
import HomePage from "./pages/HomePage";
import Layout from "./Layout";

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} >
          <Route path="/auth" element={<AuthPage />}/>
          
          {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<HomePage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
