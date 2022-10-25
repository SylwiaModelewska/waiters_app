import { PrimaryButton } from "../common/PrimaryButton";

export const TableListRow = props => {

  return (
    <tr className="d-flex align-items-center border-bottom">
      <td><h4 className="p-3 m-0">Table: {props.tableId}</h4></td>
      <td className="flex-grow-1"><b>Status: </b>{props.status}</td>
      <td><PrimaryButton text="Show more" href={`/table/${props.tableId}`} /></td>
    </tr>
  );
};

