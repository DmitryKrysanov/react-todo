import React, {Component} from 'react';
import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import TodoList from '../todo-list/todo-list';
import AddItem from '../add-item/add-item';
import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('item 1'),
            this.createTodoItem('item 2'),
            this.createTodoItem('item 3'),
            this.createTodoItem('item 4')
        ],
        term: '',
        filter: 'all'
    };

    createTodoItem(label) {
        return { 
            label: label, 
            important: false, 
            done: false,
            id: this.maxId++ 
        }
    }

    toggleProperty(arr, id, propName) {
        const index = arr.findIndex( (el) => el.id === id);
        const oldItem = arr[index];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
    }

    onToggleImportant = (id) => {
        this.setState(( {todoData} ) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    };

    onToggleDone = (id) => {
        this.setState(( {todoData} ) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    };

    deleteItem = (id) => {
        this.setState(( {todoData } ) => {
            const index = todoData.findIndex( (el) => el.id === id);
            //todoData.splice(index, 1);  -- Нельзя изменять существующий стейт!!!

            const newArray = [...todoData.slice(0, index), ...todoData.slice(index + 1)];
            return {
                todoData: newArray
            }
        })
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text)
        this.setState( ( {todoData} ) => {
            const newArray = [newItem, ...todoData];
            return {
                todoData: newArray
            }
        })
    };

    search = (arr, term) => {
        if(term.length === 0) {
            return arr;
        }
        return arr.filter((el) => {
            return el.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    onSearchChange = (term) => {
        this.setState({
            term
        })
    }

    onFilterChange = (filter) => {
        this.setState({
            filter
        })
    }

    filter = (arr, filter) => {
        switch (filter) {
            case 'all': 
                return arr;
            case 'active':
                return arr.filter((el) => !el.done);
            case 'done':
                return arr.filter((el) => el.done);
            default:
                return arr;
        }
    }

    render() {
        const { todoData, term, filter } = this.state;
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        const visibleItems = this.filter(this.search(todoData, term), filter);
        return (
            <div className='container'>
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className='search-row'>
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
                </div>
                <TodoList todos={visibleItems}
                onDeleted={ this.deleteItem } 
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone}/>
                <AddItem onAddItem={ this.addItem } />
            </div>
        )
    }; 
}