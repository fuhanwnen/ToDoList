import React, {
	Component
} from 'react'
import PropTypes from 'prop-types'

export default class CommentInput extends Component {
	static propTypes = {
    onSubmit: PropTypes.func
  }

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			content: ''
		}
	}
	// value
	handleUsernameChange(event) {
		this.setState({
			username: event.target.value
		})
	}
	//textarea
	handleContentChange(event) {
		this.setState({
			content: event.target.value
		})
	}

	handleSubmit () {
	 if (this.props.onSubmit) {
		 this.props.onSubmit({
			 username: this.state.username,
			 content: this.state.content,
			 createdTime: +new Date()
		 })
	 }
	 this.setState({ content: '' })
 }
	//组件挂载的时候把用户名加载出来
	componentWillMount () {
    this._loadUsername()
  }

  _loadUsername () {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({ username })
    }
  }
	//name 持久化
	_saveUsername (username) {
    localStorage.setItem('username', username)
  }

  handleUsernameBlur (event) {
    this._saveUsername(event.target.value)
  }

	componentDidMount () {
    this.textarea.focus()
  }

	render() {
		return (
			<div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input
						ref='input'
						onBlur={this.handleUsernameBlur.bind(this)}
						value={this.state.username}
						onChange={this.handleUsernameChange.bind(this)}
            />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
              <textarea
							ref={(textarea) => this.textarea = textarea}
							value={this.state.content}
              onChange={this.handleContentChange.bind(this)}/>
          </div>
        </div>
        <div className='comment-field-button'>
          <button  onClick={this.handleSubmit.bind(this)}>
            发布
          </button>
        </div>
	    </div>
		)
	}
}
