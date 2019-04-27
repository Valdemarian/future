import { TABLE_LOAD, LOGIN_REQUEST, PAGINATION, PAGINATION_NEXT, 
  PAGINATION_PREV, PAGINATION_NEXT_STOP, DATA, ADD, ADD_DATA_TABLE_PAGE, 
  RENDER_PAGINATION, ITEM_ID, ERROR } from '../actions/table-action';

const initialState = {
  error: false, 
  isFetching: false, 
  tableData: [],
  tableDataPage: [],
  tableDataPageFull: [],
  paginationPage: '',
  paginationСounter: '',
  paginationСounterSliceStart: '0',
  paginationСounterSliceStop: '20',
  sliceStart: '',
  sliceStop: '',
  activePageId: 1,
  activeCounterPageId: '',
  data: 'https://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
  itemId:'',
  itemIdArr:[],

}



export default function table(state = initialState, action) {

  switch (action.type) {

    case LOGIN_REQUEST:
      return { ...state, isFetching: true, error: false}

    case TABLE_LOAD:
      return { ...state, tableData: action.payload, paginationPage: action.pagination, isFetching: false,
             tableDataPage: Object.values(action.payload).map(function(key) {return key.slice(0, 5)}),
             tableDataPageFull: action.payload.slice(action.start, action.stop), paginationСounter: action.counter,
             activeCounterPageId: 1 }

    case PAGINATION:
      return { ...state, 
      tableDataPage: Object.values([...state.tableData.slice(action.start, action.stop)]).map(function(key) {return key.slice(0, 5)}), isFetching: false,
       sliceStart: action.start, sliceStop: action.stop, activePageId: action.idPage }

    case PAGINATION_PREV:
      return { ...state, isFetching: false,
       paginationСounterSliceStart: action.start, paginationСounterSliceStop: action.stop, 
       activeCounterPageId: action.idPage }

    case PAGINATION_NEXT:
      return { ...state, isFetching: false,
       paginationСounterSliceStart: action.start, paginationСounterSliceStop: action.stop, 
       activeCounterPageId: action.idPage }

    case PAGINATION_NEXT_STOP:
      return { ...state, isFetching: false, activeCounterPageId: action.idPage }

    case DATA:
      return { ...state, isFetching: false, data: action.payload }

    case ADD:
      return {...state, tableData: [action.payload, ...state.tableData], 
        tableDataPage: [action.payload, Object.values([action.payload.slice(action.start, action.stop)]).map(function(key) {return key.slice(0, 5)})] }

    case ADD_DATA_TABLE_PAGE:
      return {...state, tableData: [action.payload, ...state.tableData]}

    case RENDER_PAGINATION:
      return {...state, paginationPage: action.pagination, 
        tableDataPage: action.payload.slice(action.start, action.stop) }

    case ITEM_ID:
      return {...state, itemId: action.itemId, itemIdArr: action.tableDataPageFull[action.itemId] }

    case ERROR:
      return {...state, error: true }

    default:
      return state
  }
}
