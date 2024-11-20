import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Form } from "react-bootstrap";
import Controllers from "../controllers/Controllers";
import UserPanel from "../user/User";
import { User } from "../../types/Interfaces";
import supabase from "../../config/supabase";
import DismissibleAlert from "../../utils/Alert";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [filter, setFilter] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    getUsers();
  }, [users]);

  async function getUsers() {
    const { data } = await supabase
      .from("users")
      .select()
      .order("last_login", { ascending: false });
    data && setUsers(data);
  }

  const handleDelete = async () => {
    await supabase.from("users").delete().in("id", selectedUsers);
    setShow(true);
  };

  const handleBlock = async () => {
    const { error } = await supabase
      .from("users")
      .update({ status: "blocked" })
      .in("id", selectedUsers);
    error && console.error(error);
  };

  const handleUnblock = async () => {
    const { error } = await supabase
      .from("users")
      .update({ status: "active" })
      .in("id", selectedUsers);
    error && console.error(error);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleCheckboxChange = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container className="position-absolute top-50 start-50 translate-middle p-3 rounded-3">
      <Row>
        <Col>
          {show && (
            <DismissibleAlert
              text="User successfully Deleted!"
              heading="Success!"
              setShow={setShow}
              color="success"
            />
          )}
          <Controllers
            onDelete={handleDelete}
            onBlock={handleBlock}
            onUnblock={handleUnblock}
            onFilterChange={handleFilterChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="bg-danger">
                  <Form.Check
                    type="checkbox"
                    className="form-check-label-color-primary"
                    onChange={handleSelectAll}
                  />
                </th>
                {/* TODO: replace with DB data headers if any */}
                <th className="bg-danger">Name</th>
                <th className="bg-danger">Email</th>
                <th className="bg-danger">Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <UserPanel
                  key={user.id}
                  user={user}
                  selectedUsers={selectedUsers}
                  handleCheckboxChange={handleCheckboxChange}
                />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default UserManagement;
