import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import UserManagement from "./user_management/main/Main";
import Login from "./auth/login/Login";
import Registration from "./auth/register/Register";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
