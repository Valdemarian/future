import React, { Component } from 'react';
import PropTypes from 'prop-types';


import './item.css';

class Item extends Component {

	state = {
		name: '',
		firstName: '',
		discription: '',
		address: '',
		city: '',
		state: '',
		zip: ''
	}

	componentDidUpdate(prevProps) {
		const { itemId } = this.props
    	if (this.props.itemId !== prevProps.itemId){
    		this.setState({ 
        		name: itemId[1],
        		firstName: itemId[2],
        		discription: itemId[6],
        		address: itemId[5].streetAddress,
        		city: itemId[5].city,
        		state: itemId[5].state,
        		zip: itemId[5].zip,
      		})
   		}
  	}

  	render(){
  		const { name, firstName, discription, address, city, state, zip } = this.state

  		return (
	        <div className="jumbotron spinner-item item">
	        	<span>Выбран пользователь: <b>{name} {firstName}</b></span>
				<span>Описание:</span>
				<span> <p>{discription}</p> </span>
				<span>Адрес проживания: <b>{address}</b></span>
				<span>Город: <b>{city}</b></span>
				<span>Провинция/штат: <b>{state}</b></span>
				<span>Индекс: <b>{zip}</b></span>
	        </div>
    	)
  	}
  }

export default Item;

Item.propTypes = {
  itemId: PropTypes.array
}

