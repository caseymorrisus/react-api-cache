import React, { Component } from 'react'
import { toggle, title, icon } from './Toggle.module.css'

class Toggle extends Component {
  static defaultProps = {
    title: '',
  }

  state = {
    open: true,
  }

  toggle = () => this.setState((prevState) => ({
    open: !prevState.open,
  }))

  render() {
    return (
      <div className={toggle}>
        <h2 className={title} onClick={this.toggle}>
          <span>{this.props.title}</span>
          <span className={icon}>
            {`[${this.state.open ? '+' : '-'}]`}
          </span>
        </h2>
        {this.state.open && this.props.children}
      </div>
    )
  }
}

export default Toggle
