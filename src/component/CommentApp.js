import React, {
  Component
}
from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import CommentTime from './CommentTime';

export default class CommentApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowClock: true,
      comments: []
    }
  }
  //组件挂载的时取数据加载
  componentWillMount () {
    this._loadComments()
  }
  //取数据
  _loadComments () {
   let comments = localStorage.getItem('comments')
   if (comments) {
     comments = JSON.parse(comments)
     this.setState({ comments })
   }
 }
//存数据
 _saveComments (comments) {
   localStorage.setItem('comments', JSON.stringify(comments))
 }

  handleShowOrHide() {
    this.setState({
      isShowClock: !this.state.isShowClock
    })
  }
  //在 DOM 元素塞入页面以后调用  可以做dom操作
  componentDidMount() {
    console.log(document.querySelector('.wrapper'))
  }

  handleSubmitComment(comment) {
    if (!comment) return
   if (!comment.username) return alert('请输入用户名')
   if (!comment.content) return alert('请输入评论内容')
   const comments = this.state.comments
   comments.push(comment)
   this.setState({ comments })
   this._saveComments(comments)//存数据
  }
  //点击删除的传参  删除评论
  handleDeleteComment (index) {
    console.log(index)
    const comments = this.state.comments
    comments.splice(index, 1) //删除
    this.setState({ comments })//重新渲染
    this._saveComments(comments)//存数据
  }

  render() {
    return ( <
      div className = 'wrapper' >
			{this.state.isShowClock ? <CommentTime /> : null }
      <CommentInput onSubmit = {
        this.handleSubmitComment.bind(this)
      }/>
      <CommentList
      comments = {this.state.comments}
      onDeleteComment={this.handleDeleteComment.bind(this)}
      />
      <button className='button' onClick = {
        this.handleShowOrHide.bind(this)
      } >
      显示或隐藏时钟 </button> <
      /div>
    )
  }
}
