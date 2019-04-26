import axios from "axios";
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const TABLE_LOAD = 'TABLE_LOAD'
export const PAGINATION = 'PAGINATION'
export const PAGINATION_NEXT = 'PAGINATION_NEXT'
export const PAGINATION_PREV = 'PAGINATION_PREV'
export const PAGINATION_NEXT_STOP = 'PAGINATION_NEXT_STOP'
export const DATA = 'DATA'
export const ADD = 'ADD'
export const ADD_DATA_TABLE_PAGE = 'ADD_DATA_TABLE_PAGE'
export const RENDER_PAGINATION = 'RENDER_PAGINATION'
export const ITEM_ID = 'ITEM_ID'
export const ERROR = 'ERROR'


export function tableDataLoading(data){


  return (dispatch) => {

    dispatch({
      type: LOGIN_REQUEST,
    })

	  axios
      .get( data, {mode: 'cors'})
      .then(function (response) {
        var result = Object.values(response.data).map(function(key) {
         return Object.values(key);
        });

        var pagination = Math.ceil(result.length / 20)
        var counter = Math.ceil(pagination / 20)
        const start = 0;
        const stop = 20;

	        dispatch({ 
	          type: TABLE_LOAD,
	          payload: result,
            pagination: pagination,
            start: start,
            stop: stop,
            counter: counter
	        })
        console.log(response);
	      })
	    .catch(error => {
	      console.log('error', error);
          dispatch({ 
            type: ERROR,
          })
	    })
  }
}


export function renderPaginationTableData(tableData){
  var pagination = Math.ceil(tableData.length / 20)

  var resultSlice = Object.values(tableData).map(function(key) {
   return key.slice(0, 5);
  });

  const start = 0;
  const stop = 20;

  return (dispatch) => {
    dispatch({
      type: RENDER_PAGINATION,
      payload: resultSlice,
      pagination: pagination,
      start: start,
      stop: stop,
    })
  }
}

export function paginationFunc(idPage) {

  const stop = 20 * idPage;
  const start = stop - 20;

  return (dispatch) => {
    dispatch({
      type: PAGINATION,
      start: start,
      stop: stop,
      idPage: idPage
    })
  }
}


export function paginationPrev(idPage) {

  const stop = 20 * idPage;
  const start = stop - 20;

  if (idPage >= 1){

    return (dispatch) => {
      dispatch({
        type: PAGINATION_PREV,
        start: start,
        stop: stop,
        idPage: idPage
      })
    }
  } else {
    return (dispatch) => {
      dispatch({
        type: PAGINATION_PREV,
        start: 0,
        stop: 20,
        idPage: 1
      })
    }
  }
}
export function paginationNext(idPage, paginationСounter) {

  const stop = 20 * idPage;
  const start = stop - 20;

  if (idPage <= paginationСounter){

    return (dispatch) => {
      dispatch({
        type: PAGINATION_NEXT,
        start: start,
        stop: stop,
        idPage: idPage
      })
    } 
  } else {
    return (dispatch) => {
      dispatch({
        type: PAGINATION_NEXT_STOP,
        idPage: paginationСounter
      })
    }
  }
}

export function smallData(data) {

  return (dispatch) => {
    dispatch({
      type: DATA,
      payload: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
    })
  }
}

export function bigData(data) {

  return (dispatch) => {
    dispatch({
      type: DATA,
      payload: 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
    })
  }
}

export function add( id, firstName, lastName, email, phone, pageId ) {
  var addArr = [parseInt(id), firstName, lastName, email, phone]
  console.log(addArr)
  console.log('pageId', pageId)


  if(pageId === 1){

    return (dispatch) => {
      dispatch({
        type: ADD,
        payload: addArr
      })
    }
  } else {
    return (dispatch) => {
      dispatch({
        type: ADD_DATA_TABLE_PAGE,
        payload: addArr
      })
    }
  }
}


export function getItemId(itemId, tableDataPageFull) {

  return (dispatch) => {
    dispatch({
      type: ITEM_ID,
      itemId: itemId,
      tableDataPageFull: tableDataPageFull
    })
  }
}