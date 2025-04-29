import { ReactNode } from "react";
import "./Table.scss";

interface TableProps {
  children: ReactNode;
}

const Table: React.FC<TableProps> = ({ children }: TableProps) => {
  return <table>{children}</table>;
};

export default Table;
