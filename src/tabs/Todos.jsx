import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
    isEditing: false,
    currentTodo: {},
  };

  onFormSubmit = query => {
    this.addTodo(query);
  };

  addTodo = todoText => {
    const todo = { text: todoText, id: nanoid() };

    this.setState(prevState => ({ todos: [...prevState.todos, todo] }));
  };

  onHandleDelete = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  onHandleEdit = todo => {
    this.setState({ currentTodo: { ...todo }, isEditing: true });
  };

  onTodoCancel = () => {
    this.setState({ isEditing: false });
  };

  onTodoChange = ({ target }) => {
    const { currentTodo } = this.state;

    this.setState({
      currentTodo: { ...currentTodo, text: target.value.trim() },
    });
  };

  onTodoUpdate = event => {
    event.preventDefault();

    const { currentTodo } = this.state;

    if (currentTodo.text === '') {
      return alert('please add your text!');
    }
    this.handleUpdateTodo(currentTodo.id, currentTodo);
  };

  handleUpdateTodo = (id, item) => {
    const { todos } = this.state;

    const updatedTodos = todos.map(todo => {
      return todo.id === id ? item : todo;
    });

    this.setState({ todos: updatedTodos, isEditing: false });
  };

  render() {
    const { todos, isEditing, currentTodo } = this.state;

    return (
      <>
        {isEditing ? (
          <EditForm
            onUpdate={this.onTodoUpdate}
            onCancel={this.onTodoCancel}
            onChange={this.onTodoChange}
            currentTodo={currentTodo}
          />
        ) : (
          <SearchForm onSubmit={this.onFormSubmit} />
        )}
        <Grid>
          {todos.length > 0 &&
            todos.map((todo, index) => (
              <GridItem key={todo.id}>
                <Todo
                  todo={todo}
                  index={index + 1}
                  onDelete={this.onHandleDelete}
                  onHandleEdit={() => this.onHandleEdit(todo)}
                />
              </GridItem>
            ))}
        </Grid>
      </>
    );
  }
}
