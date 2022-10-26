import { Button } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

export const TableListRow = props => {

  return (
    <tr className="d-flex align-items-center border-bottom">
      <td><h4 className="p-3 m-0">Table: {props.tableId}</h4></td>
      <td className="flex-grow-1"><b>Status: </b>{props.status}</td>
      <td><NavLink to={`/table/${props.tableId}`}><Button variant="primary">Show more</Button></NavLink></td>
    </tr>
  );
};

