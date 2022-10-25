import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTableById } from '../../redux/tablesRedux';
import { getAllStatuses } from '../../redux/statusRedux';
import { PrimaryButton } from '../common/PrimaryButton';
import {Form, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { editTableRequest } from '../../redux/tablesRedux';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

export const TablePage = () => {

  const { id } = useParams();
  const tableData = useSelector(state => getTableById(state, parseInt(id)));
  const statuses = useSelector(getAllStatuses);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState('');
  const [peopleAmount, setPeopleAmount] = useState(0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(0);
  const [bill, setBill] = useState(0);

  useEffect(() => {
    if(tableData){
      setStatus(tableData.status);
      setPeopleAmount(tableData.peopleAmount);
      setMaxPeopleAmount(tableData.maxPeopleAmount);
      setBill(tableData.bill);
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
  }

  console.log(tableData);
  
  return (
    <div>
      {tableData === undefined && 
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>}
      {tableData &&
        <Form onSubmit={handleSubmit}>
          <h1>Table {tableData && tableData.id}</h1>
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
          <PrimaryButton text="Update"/>
        </Form>
        }
    </div>
  );
}