import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number  //评论的下标
  }
  constructor () {
    super()
    this.state = { timeString: '' }
  }
  //点击删除调用
  handleDeleteComment () {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index)
    }
  }
  componentWillMount () {
    this._updateTimeString()
    //5秒更新评论时间
    this._timer = setInterval(
      this._updateTimeString.bind(this),
      5000
    )
  }
  //删除数据调用
  componentWillUnmount () {
    clearInterval(this._timer)
  }
  //评论时间
  _updateTimeString () {
   const comment = this.props.comment
   const duration = (+Date.now() - comment.createdTime) / 1000
   const other = duration % 3600;//小时 为了计分使用
   const days = `${Math.floor(duration / (24*3600))}`; //天
   const second = `${Math.floor(Math.max(duration, 1))} 秒前` //秒
   const Minute = `${Math.floor(other / 60)} 分钟前` //分
   const hour = `${Math.floor(duration / 3600)} 小时 ${Minute}` //时
   //如果小时=0 就不显示
   const n = `${Math.floor((duration / 3600)-24*days)}` == 0 ? '' : `${Math.floor((duration / 3600)-24*days)}小时`
   const day = `${days} 天 ${n} ${Minute}`
   if(duration >= 86400){
     this.setState({
       timeString: duration >= 86400 ? day : hour
     })
   } else if(duration >= 3600){
     this.setState({
       timeString: duration >= 3600 ? hour : Minute
     })
   } else if(duration >= 60){
     this.setState({
       timeString: duration >= 60 ? Minute : second
     })
   } else {
     this.setState({
       timeString: duration > 60 ? Minute : second
     })
   }
 }

 render () {
   const  comment  = this.props.comment
   return (
     <div className='comment'>
       <div className='comment-user'>
         <span className='comment_username'>{comment.username} </span>：

         <p className='comment_content'>{comment.content}</p>

         <span className='comment-delete'
          onClick={this.handleDeleteComment.bind(this)}>
            删除
          </span>
       </div>
       <span className='comment-createdtime'>
         {this.state.timeString}
       </span>

     </div>
   )
 }
}
