import { Badge, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

export const Logout = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="position-absolute end-0 my-3 d-flex align-items-center">
      <Badge pill bg="success">
        {user}
      </Badge>
      <Button className="mx-3" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
