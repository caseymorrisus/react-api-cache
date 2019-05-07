import React from 'react'
import ReactDOM from 'react-dom'
import Todos from './Todos'
import Toggle from './Toggle'
import styles from './styles.module.css'
import { useCache } from '../../src'

const wrapper = document.getElementById('root')

const Example = () => {
  const { actions } = useCache()

  return (
    <div>
      <h1>Cache Example</h1>
      <div className={styles.wrapper}>
        <Toggle title="Todos">
          <Todos cacheActions={actions} />
        </Toggle>
        <Toggle title="Todos (No Cache)">
          <Todos skipCache />
        </Toggle>
      </div>
    </div>
  )
}

export default wrapper ? ReactDOM.render(<Example />, wrapper) : false
