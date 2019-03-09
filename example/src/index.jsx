import React from 'react'
import ReactDOM from 'react-dom'
import Todos from './Todos'
import Toggle from './Toggle'
import styles from './styles.module.css'
import Cache from '../../src/components/Cache'

const wrapper = document.getElementById('root')

const Example = () => (
  <div>
    <h1>Cache Example</h1>
    <div className={styles.wrapper}>
      <Cache>
        {({ store, actions }) => (
          <Toggle title="Todos">
            <Todos cacheActions={actions} />
          </Toggle>
        )}
      </Cache>
      <Toggle title="Todos (No Cache)">
        <Todos skipCache/>
      </Toggle>
    </div>
  </div>
)

export default wrapper ? ReactDOM.render(<Example />, wrapper) : false
