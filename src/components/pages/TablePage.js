import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTableFromRequest } from '../../redux/tableDataRedux';
import { getAllStatuses } from '../../redux/statusRedux';
import {Form, Row, Col, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { editTableRequest } from '../../redux/tablesRedux';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { fetchTableRequest } from '../../redux/tableDataRedux';

export const TablePage = () => {

  const [status, setStatus] = useState('');
  const [peopleAmount, setPeopleAmount] = useState(0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(0);
  const [bill, setBill] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchTableRequest(id)), [dispatch]);
  const navigate = useNavigate();

  const tableData = useSelector(getTableFromRequest);
  const statuses = useSelector(getAllStatuses);


  useEffect(() => {
    setIsLoading(true);
    if(tableData['table'].id){
      setStatus(tableData['table'].status);
      setPeopleAmount(tableData['table'].peopleAmount);
      setMaxPeopleAmount(tableData['table'].maxPeopleAmount);
      setBill(tableData['table'].bill);
      setIsLoading(false);
    }
    else if(tableData['isError'] === true){
      setIsLoading(false);
      setIsError(true);
    }
  }, [tableData]);

  const validatePeopleAmount = max => {
    setMaxPeopleAmount(max);

    if(peopleAmount > max){
      setPeopleAmount(max)
    }
  };

  const validateStatus = status => {
    if(status === 'Busy'){
      setBill(0);
    }
    if(status === 'Cleaning' || status === 'Free'){
      setPeopleAmount(0);
    }
    setStatus(status);
  }

  const handleSubmit = () => {
    dispatch(editTableRequest({id, status, peopleAmount, maxPeopleAmount, bill}));
    navigate('/');
    window.location.reload();
  }

  //console.log(tableData);
  
  if(isLoading){
    return(
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if(isError){
    navigate('/');
  }
  return (
    <div>
      {tableData &&
        <Form onSubmit={handleSubmit}>
          <h1>Table {tableData && tableData['table'].id}</h1>
            <Row xs="auto" className="align-items-center m-2">
              <Col xs={2}>
                <Form.Label>
                  <b>Status: </b> 
                </Form.Label>
              </Col >
              <Col xs={4}>
                <Form.Select value={status} onChange={e => validateStatus(e.target.value)}>
                  {statuses.map(status => <option key={status.status}>{status.status}</option>)}
               </Form.Select>
              </Col>
            </Row>
            <Row xs="auto" className="d-flex align-items-center m-2">
              <Col xs={2}>
                <Form.Label>
                  <b>People: </b> 
                </Form.Label>
              </Col>
              <Col xs={4}>
                <div className="d-flex flex-row">
                  <Form.Control type="number" min="0" max={maxPeopleAmount} value={peopleAmount} onChange={e => setPeopleAmount(e.target.value)}/>
                  <p className="m-2">/</p>
                  <Form.Control type="number" min="0" max="10" value={maxPeopleAmount} onChange={e => validatePeopleAmount(e.target.value)}/>
                </div>
              </Col>
            </Row>
            {status === 'Busy' &&
            <Row xs="auto" className="d-flex align-items-center m-2">
              <Col xs={2}>
                <Form.Label>
                  <b>Bill: </b> 
                </Form.Label>
              </Col>
              <Col xs={4}>
                <div className="d-flex flex-row">
                  <p className="m-2">$</p>
                  <Form.Control type="number" value={bill} onChange={e => setBill(e.target.value)}/>
                </div>
              </Col>
            </Row>}
            <Button variant="primary" type="submit">Update</Button>
        </Form>
        }
    </div>
  );
}