import { API_URL } from "../config";

//selectors
export const getAllStatuses = ({ statuses }) => statuses;

// actions
const createActionName = actionName => `app/statuses/${actionName}`;
const UPDATE_STATUSES = createActionName('UPDATE_STATUSES');

// action creators
export const updateStatuses = payload => ({ type: UPDATE_STATUSES, payload });

export const fetchStatuses = () => {
  return (dispatch) => {
    fetch(`${API_URL}/statuses`)
      .then(res => res.json())
      .then(statuses => dispatch(updateStatuses(statuses)));
  }
};

const statusesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_STATUSES:
      return [...action.payload];
    default:
      return statePart;
  };
};

export default statusesReducer;