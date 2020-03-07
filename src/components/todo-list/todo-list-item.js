import React from 'react';
import './todo-list-item.css';

const TodoListItem = ( {label, onDeleted, onToggleImportant, onToggleDone, important, done} ) => {
        let classNames = 'todo-list-item';
        if (done) {
            classNames += ' done';
        }

        if (important) {
            classNames += ' important';
        }

        return (
            <div className={classNames}>
                <span
                    className='todo-list-item-label'
                    onClick={onToggleDone}>
                    {label}
                </span>
                <div className='item-buttons'>
                    <button
                        className='btn btn-outline-success'
                        type='button'
                        onClick={onToggleImportant}>
                        <i className='fa fa-exclamation'></i>
                    </button>
                    <button
                        className='btn btn-outline-danger'
                        type='button'
                        onClick={onDeleted}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </div>
            </div>
        )
    }

export default TodoListItem;