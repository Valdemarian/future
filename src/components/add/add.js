import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './add.css'

class Add extends Component {

	state = {
		id: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
	}

	handleSubmit = (e) => {
		e.preventDefault()
	    const { id, firstName, lastName, email, phone } = this.state

	    this.props.add( id, firstName, lastName, email, phone, this.props.activePageId)
  	}

	handleChange = (e) => {
    	const value = e.currentTarget.value
    	const fieldName = e.currentTarget.dataset.fieldName

    	this.setState(state => ({
    		...state,
      		[fieldName]: value,
    	}))
  	}

  render(){
  	const { id, firstName, lastName, email, phone } = this.state

  	const { validateAdd,  addFalse } = this.props;

  	const validation = id && firstName && lastName && email && phone

  	return(
			<div className="add-feed" >
			    <form onSubmit={this.handleSubmit}
			    	  className="add-form">	    
		         	<input data-field-name={'id'}
			            type={'text'}
			            onChange={this.handleChange}
			            placeholder={'   ID'}
			            value={id}
			            className="add-input border-color"
			            maxLength="5" />  

		         	<input data-field-name={'firstName'}
			            type={'text'}
			            onChange={this.handleChange}
			            placeholder={'   First name'}
			            value={firstName}
			            className="add-input"
			            maxLength="15" />

		         	<input data-field-name={'lastName'}
			            type={'text'}
			            onChange={this.handleChange}
			            placeholder={'   Last name'}
			            value={lastName}
			            className="add-input"
			            maxLength="15" />

		         	<input data-field-name={'email'}
			            type={'email'}
			            onChange={this.handleChange}
			            placeholder={'   E-mail'}
			            value={email}
			            className="add-input"
			            maxLength="20" />

		         	<input data-field-name={'phone'}
			            type={'phone'}
			            onChange={this.handleChange}
			            placeholder={'   Phone'}
			            value={phone}
			            className="add-input"
			            maxLength="15" />


			        <div className={validateAdd ? "add-action-validate" : "add-action"}>
			            <button type="submit" 
			            		className="btn btn-primary btn-sm btn-add-feed"
			            		disabled={!validation}>Добавить</button>
			            <button className="btn btn-primary btn-sm btn-cancel" 
			            		onClick={addFalse}>Отмена</button>
			            <div>{ validateAdd ? <p>Заполните пустые поля</p> : null }</div>
			        </div>
			    </form>
		    </div>
		)
	}
}

export default Add;

Add.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  add: PropTypes.func.isRequired,
}
