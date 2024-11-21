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
    <div className="d-flex pb-3">
      <div className="d-flex align-items-cente">
        <Button variant="outline-primary" onClick={onBlock}>
          <FaUserSlash /> Block
        </Button>
        <Button variant="outline-primary" className="w-100" onClick={onUnblock}>
          <FaUserCheck />
        </Button>
        <Button variant="outline-danger" className="w-100" onClick={onDelete}>
          <FaTrash />
        </Button>
      </div>
      <InputGroup>
        <FormControl placeholder="Filter..." onChange={onFilterChange} />
      </InputGroup>
    </div>
  );
};

export default Controllers;
