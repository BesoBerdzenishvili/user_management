import React from "react";
import { Form } from "react-bootstrap";
import { User } from "../../types/Interfaces";

interface UserPanel {
  user: User;
  selectedUsers: number[];
  handleCheckboxChange: (userId: number) => void;
}

const UserPanel: React.FC<UserPanel> = ({
  user,
  selectedUsers,
  handleCheckboxChange,
}) => {
  const disable = user.status === "blocked" ? "secondary" : "primary";
  let lastLogin = user.last_login.toString();
  const lastSeen = `${lastLogin.slice(0, 10)} - ${lastLogin.slice(11, 16)}`;
  return (
    <tr
      style={{
        textDecoration: user.status === "blocked" ? "line-through" : "none",
        color: disable,
      }}
    >
      <td className={`bg-${disable}`}>
        <Form.Check
          type="checkbox"
          checked={selectedUsers.includes(user.id)}
          onChange={() => handleCheckboxChange(user.id)}
        />
      </td>
      <td className={`bg-${disable}`}>{user.name}</td>
      <td className={`bg-${disable}`}>{user.email}</td>
      <td className={`bg-${disable}`} title={lastSeen}>
        {lastSeen.substring(13, 18)}
      </td>
    </tr>
  );
};

export default UserPanel;
