import React, { Component } from 'react'

const url = 'https://jsonplaceholder.typicode.com/todos?_start=0&_limit=100'
const params = {
  _start: 0,
  _limit: 5,
}

class Todos extends Component {
  static defaultProps = {
    cacheActions: {
      hasCache: () => {},
      getCache: () => {},
      setCache: () => {},
    },
    skipCache: false,
  }

  state = {
    loaded: false,
    todos: [],
  }

  componentDidMount() {
    const { hasCache, getCache } = this.props.cacheActions

    if (!this.props.skipCache && hasCache(url, params)) {
      this.setTodos(getCache(url, params).data)
    } else {
      fetch(url, params)
        .then((res) => res.json())
        .then(this.setTodos)
    }
  }

  setTodos = (todos) => this.setState({
    loaded: true,
    todos,
  }, () => {
    if (!this.props.skipCache) {
      this.props.cacheActions.setCache(url, params, todos)
    }
  })

  render() {
    if (!this.state.loaded) {
      return <div>Loading...</div>
    }

    return (
      <div>
        {this.state.todos.map((todo) => (
          <div key={todo.id}>
            {todo.title}
          </div>
        ))}
      </div>
    )
  }
}

export default Todos
