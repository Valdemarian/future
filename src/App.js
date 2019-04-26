import React, { Component } from 'react';
import { connect } from 'react-redux';
import TablesContainer from './containers/tables-container/tables-container';
import WithAdd from './components/with-add';
import Item from './components/item';
import './App.css';

class App extends Component {
  
  render() {
    const { table } = this.props;
    const { itemIdArr } = table;


    return (
      <div className="App container">
        <WithAdd />
        <TablesContainer />
        <Item itemId={itemIdArr} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    table: state.table,
  }
}


export default connect(mapStateToProps)(App)