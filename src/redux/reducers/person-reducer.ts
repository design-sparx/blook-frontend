import {
  PERSONS_FETCH_FAIL,
  PERSONS_FETCH_REQUEST,
  PERSONS_FETCH_SUCCESS,
} from "../constants/person";

const fetchAllPersonsReducer = (state = {}, action: any) => {
  switch (action.type) {
    case PERSONS_FETCH_REQUEST:
      return {
        loading: true
      };
    case PERSONS_FETCH_SUCCESS:
      return {
        loading: false,
        persons: action.payload
      };
    case PERSONS_FETCH_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export {
  fetchAllPersonsReducer
};
