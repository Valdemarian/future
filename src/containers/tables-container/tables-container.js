import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sortMultidimensionalArrayFunc from 'sort-multidimensional-array-func';
import Spinner from '../../components/spinner';
import ErrorIndicator from '../../components/error-indicator';
import Tables from '../../components/table/tables';
import { TABLE_COLUMNS } from '../../helpers/const';

import { tableDataLoading, paginationFunc, paginationPrev, paginationNext,
smallData, bigData, renderPaginationTableData, getItemId } from '../../actions/table-action';


class TablesContainer extends Component {

  state = {
    data: [],
    columns: TABLE_COLUMNS,
    hasError: false
  }

  componentDidMount() {
    const data = this.props.table.data
    this.props.tableDataLoadingAction(data)
  }

  componentDidUpdate(prevProps) {
    if (this.props.table.tableDataPage !== prevProps.table.tableDataPage){
      this.setState({ 
        data: this.props.table.tableDataPage
      })
    }

    //смена ссылки данных
    if(this.props.table.data !== prevProps.table.data){
      const data = this.props.table.data
      this.props.tableDataLoadingAction(data)
    }

    //рендеринг постраничной пагинации
    if (this.props.table.tableData !== prevProps.table.tableData){
      const tableData = this.props.table.tableData
      this.setState({ 
        data: this.props.table.tableDataPage
      })
      this.props.renderPaginationTableDataAction(tableData)
    }
  }

  componentWillMount() {
    const data = this.props.table.tableDataPage
    this.setState({ data })

  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    });
  }

  sortTableFunc = (id, sortMethod) => {
    const { data, columns } = this.state;

    let currentSortMethod = 'default';

    switch (sortMethod) {
      case 'default':
        currentSortMethod = 'asc';
        break;
      case 'asc':
        currentSortMethod = 'desc';
        break;
      case 'desc':
        currentSortMethod = 'asc';
        break;
      default:
      currentSortMethod = 'asc';
    }

    const changeColumn = columns.map((e, i) =>
      ({ ...e, sort: i === id ? currentSortMethod : 'default' })
    );

    const sortData = sortMultidimensionalArrayFunc(data, id, currentSortMethod);

    this.setState({
      data: sortData,
      columns: changeColumn,
    });
  }

  render() {

    const { table, paginationPrevAction, paginationNextAction, 
      getItemIdAction, smallDataAction, bigDataAction, paginationFuncgAction } = this.props;

    const action = { paginationPrevAction, paginationNextAction, 
      getItemIdAction, smallDataAction, bigDataAction, paginationFuncgAction }

    if (this.state.hasError) {
          return <ErrorIndicator  />
    }

  return (
      <Tables action={action}
              data={this.state.data}
              columns={this.state.columns}
              table={table}
              sortTableFunc={this.sortTableFunc } />
      );
    }
}


const mapStateToProps = (state) => {
  return {
    table: state.table,
  }
}

const mapDispatchToProps = dispatch => {
  return {
   smallDataAction: (data) => dispatch(smallData(data)),
   bigDataAction: (data) => dispatch(bigData(data)),
   tableDataLoadingAction: (data) => dispatch(tableDataLoading(data)),
   paginationFuncgAction: (idPage) => dispatch(paginationFunc(idPage)),
   paginationPrevAction: (idPage) => dispatch(paginationPrev(idPage)),
   paginationNextAction: (idPage, paginationСounter) => dispatch(paginationNext(idPage, paginationСounter)),
   renderPaginationTableDataAction: (tableData) => dispatch(renderPaginationTableData(tableData)),
   getItemIdAction: (itemId, tableDataPageFull) => dispatch(getItemId(itemId, tableDataPageFull)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TablesContainer)

TablesContainer.propTypes = {
  tableData: PropTypes.array
}