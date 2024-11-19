import React from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { FaUserSlash, FaUserCheck, FaTrash } from "react-icons/fa";

interface ControllersProps {
  onDelete: () => void;
  onBlock: () => void;
  onUnblock: () => void;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Controllers = ({
  onDelete,
  onBlock,
  onUnblock,
  onFilterChange,
}: ControllersProps) => {
  return (
    <div className="d-flex">
      <div className="d-flex align-items-cente">
        <Button variant="outline-primary" onClick={onBlock}>
          <FaUserSlash /> Block
        </Button>
        <Button variant="outline-primary" onClick={onUnblock}>
          <FaUserCheck /> Unblock
        </Button>
        <Button variant="outline-danger" onClick={onDelete}>
          <FaTrash /> Delete
        </Button>
      </div>
      {/* TODO: move this to the right */}
      <InputGroup>
        <FormControl placeholder="Filter..." onChange={onFilterChange} />
      </InputGroup>
    </div>
  );
};

export default Controllers;
