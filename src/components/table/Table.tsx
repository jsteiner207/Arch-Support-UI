import { ReactNode } from "react";
import "./Table.scss";

interface TableProps {
  children: ReactNode;
}

const Table: React.FC<TableProps> = ({ children }: TableProps) => {
  return (
    <div className="box-1">
      <table>{children}</table>
    </div>
  );
};

export default Table;
