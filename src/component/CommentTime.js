import React, {
  Component
} from 'react';

export default class CommentTime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }
  componentWillMount() {
    this.timer = setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 1000)
  }
  //销毁组件时
  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render() {
    return ( <
      div className = 'CommentTime' >
      <
      p >
      <
      span > 当前时间是： < /span> <
      span > {
        this.state.date.toLocaleTimeString()
      } < /span> < /
      p > <
      /div>
    )
  }
}
