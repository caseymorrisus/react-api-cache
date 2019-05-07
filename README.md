# react-api-cache

React component library to help cache API data, resulting in increased performance and decreased mobile data usage. Save trips to the server if unnecessary.



## Installation

To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com/):

```bash
$ npm install react-api-cache
$ yarn add react-api-cache
```



## Examples

### **Todos within Toggle:**

In this example we have a `Todos` component which fetches todos from an API on mount. If we didn't have a cache, we'd make a request every time the toggle is subsequently opened.

**Hook Usage:**

```jsx
import React from 'react'
import { useCache } from 'react-api-cache'
import Toggle from './Toggle'

export default (props) => {
    const { actions } = useCache()
    return (
        <Toggle title="Todos">
            <Todos cacheActions={actions} />
        </Toggle>
    )
}
```



**Component Usage:**

```jsx
import React from 'react'
import Cache from 'react-api-cache'
import Toggle from './Toggle'

export default React.PureComponent {
    render() {
        return (
          <Cache>
            {({ store, actions }) => (
              <Toggle title="Todos">
                <Todos cacheActions={actions} />
              </Toggle>
            )}
          </Cache>
        )
    }
}
```

**Toggle Component:**

```jsx
import React from 'react'

class Toggle extends React.Component {
  state = {
    open: true,
  }

  toggle = () => this.setState((prevState) => ({
    open: !prevState.open,
  }))

  render() {
    return (
      <div>
        <h2 onClick={this.toggle}>
          <span>{this.props.title}</span>
          <span>
            {`[${this.state.open ? '+' : '-'}]`}
          </span>
        </h2>
        {this.state.open && this.props.children}
      </div>
    )
  }
}

export default Toggle

```

**Todos Component:**

```jsx
import React from 'react'

const url = 'https://jsonplaceholder.typicode.com/todos?_start=0&_limit=100'
const params = {
  _start: 0,
  _limit: 100,
}

class Todos extends React.Component {
  state = {
    loaded: false,
    todos: [],
  }

  componentDidMount() {
    const { hasCache, getCache } = this.props.cacheActions

    if (hasCache(url, params)) {
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
    this.props.cacheActions.setCache(url, params, todos)
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

```

Seems like a lot, but most of it is boilerplate for components unrelated to usage of this library. This is the most important section:

```jsx
// ...
  componentDidMount() {
    const { hasCache, getCache } = this.props.cacheActions

    if (hasCache(url, params)) {
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
    this.props.cacheActions.setCache(url, params, todos)
  })
// ...
```

As seen above, on mount of our component we check if a cache exists for the URL & params combination we're requesting. If the combination exists, we immediately set state from our cache. If now, we pull data from the API. Pretty simple, but fairly powerful!

## Public Methods

| Name         | Type                              | Description                                                  |
| ------------ | --------------------------------- | ------------------------------------------------------------ |
| hasCache     | (url, params) => boolean          | Returns `true` if a cache exists for the url and params combination passed in. |
| getCache     | (url, params) => { params, data } | Returns the cache that matches the url and params combination passed in. *This method is considered unsafe and should be used following the`hasCache` method returning `true`.* |
| setCache     | (url, params, data) => void       | Saves cache to store using url, params, and data passed in. *This method is considered unsafe and should be used following the`hasCache` method returning `true`.* |
| destroyCache | (?url, ?params) => void           | Removes the cache from the store that matches the url and params combination passed in. `url` and `params` are both optional and if omitted, the entire cache will be destroyed. *This method is considered unsafe and should be used following the`hasCache` method returning `true`.* |

![react-api-cache flowchart](https://github.com/caseymorrisus/react-api-cache/blob/master/flowchart.png?raw=true)

## License

`react-api-cache` is released under the MIT license.