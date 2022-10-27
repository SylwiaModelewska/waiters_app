import { API_URL } from "../config";

//selectors
export const getTableFromRequest = ({ tableData }) => tableData;

// actions
const createActionName = actionName => `app/tableData/${actionName}`;
const UPDATE_TABLE = createActionName('UPDATE_TABLE');

// action creators
export const updateTable = payload => ({ type: UPDATE_TABLE, payload });

export const fetchTableRequest = (fetchedTableId) => {        
  return (dispatch) => {
    dispatch(updateTable(
      {
        "table": {},
        "isError": false
      }
    ))

    fetch(`${API_URL}/tables/${fetchedTableId}`)
    .then((res)=>{ 
      if(res.ok) return res.json(); 
      else throw new Error("Status code error :" + res.status)})
      .then(table => dispatch(updateTable(
        {
          "table": table,
          "isError": false
        }
      )))
      .catch((e) => {
        console.error(`An error occurred: ${e}`)
        dispatch(updateTable(
          {
            "table": {},
            "isError": true
          }
        ))
      });
  }
};

const tableDataReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLE:
      return action.payload;
    default:
      return statePart;
  };
};

export default tableDataReducer;