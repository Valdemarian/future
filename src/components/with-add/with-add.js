import React, { Component } from 'react';
import { connect } from 'react-redux';
import Add from '../../components/add/';
import { add } from '../../actions/table-action';
import './with-add.css';


class WithAdd extends Component {

	state = {
		addState: false
	}

	addTrue = () => {
		this.setState(({state}) => {
			return {
				addState: true
			}
		})
	}

	addFalse = () => {
		this.setState(({state}) => {
			return {
				addState: false
			}
		})
	}

	render(){

		const { table } = this.props
		const { activePageId } = table
		
		return (
		 	<>
				{this.state.addState ? 
				<Add addFalse={this.addFalse} add={this.props.addAction} activePageId={activePageId} /> : 
				<button  className="btn btn-primary btn-create-feed" 
						 onClick={this.addTrue}
						 ><h3>Добавить данные</h3></button>} 
		   	</>
   		 )
	}
}

const mapStateToProps = (state) => {
  return {
    table: state.table,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAction: (id, firstName, lastName, email, phone, activePageId) => dispatch(add(id, firstName, lastName, email, phone, activePageId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAdd);