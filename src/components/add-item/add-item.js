import React, { Component } from 'react';
import './add-item.css';

export default class AddItem extends Component {

    state = {
        label: ''
    }
    onLabelChange = (e) => {
        this.setState( {
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        this.props.onAddItem(this.state.label);
        e.preventDefault();
        this.setState({
            label: ''
        })
    }

    render() {
        return (
            <form 
            className='add-item d-flex' 
            onSubmit={this.onSubmit}>
                <input 
                className='search-panel form-control' 
                type="text" placeholder='new task'
                onChange={this.onLabelChange}
                value={this.state.label}>
                </input>
                <button 
                className="btn btn-secondary" 
                type="submit">
                    Add task
                </button>
            </form>
        )
    }

   
}

