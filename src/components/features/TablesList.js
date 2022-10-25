import { useSelector } from 'react-redux';
import { getAllTables } from '../../redux/tablesRedux';
import { Table } from 'react-bootstrap';
import { TableListRow } from './TableListRow';
import Spinner from 'react-bootstrap/Spinner';

export const TablesList = () => {

  const tables = useSelector(getAllTables);

  return(
    <main>
      {tables.length === 0 && 
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>}
      {tables.length !==0 &&
      <Table className='table-borderless'>
      <tbody>
        {tables.map(table => <TableListRow key={table.id} tableId={table.id} status={table.status}/>)}
      </tbody>
      </Table>}
    </main>
  );
}