import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {changeUsernameAction} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'; 

import * as firebase from 'firebase';
import {messagesRef} from '../firebase';

import {read_cookie,bake_cookie} from 'sfcookies';

var randomWords = require('random-words');

class connectedUsers extends Component{
	constructor(props){
		super(props);
		this.state={
			currentUsers:[],
			username:null
		}
	}

	componentDidMount(){
		this.changeUsername(this.props.usrnm);
	}

	componentWillReceiveProps(nextProps) {
		messagesRef.child(nextProps.chatDir+'/connected/').on('value',snap=>{
			var usrArray=[];
			messagesRef.child(nextProps.chatDir+'/connected/'+nextProps.usrnm).onDisconnect().remove();
			snap.forEach(item=>{
				usrArray.push(item.key);
			})
			this.setState({currentUsers:usrArray});
		})
	}

	changeUsername(usrnm){//checks usernem avalibality and reduxes new username
		let username=usrnm;
		if(usrnm==undefined||usrnm==''){
			username=randomWords({exactly: 1})+'';
		}
		if(this.state.username!=username&&this.state.username!=null){
			messagesRef.child(this.props.chatDir+'/connected/'+this.state.username).remove();
		}
		messagesRef.child(this.props.chatDir+'/connected/'+username).set(true);
		bake_cookie(this.props.chatDir+'user',{username:''+username});
		this.props.changeUsernameAction(username);
		this.setState({username:username});
		ReactDOM.findDOMNode(this.refs.setUserBox).value="";
		//document.location.reload();//tener en cuenta para apagar la coneccion cuando s ecambia e usuario, cuaidado con los loops
	}

	render(){
		let users=[];
		users = this.state.currentUsers.map((user,index)=>(
			<li>{user}</li>))
		return(
			<div>
				<div class="input-group">
					<input
						style={{background:'#80bfff'}}
						type="text"
						placeholder="username"
						className="form-control"
						ref="setUserBox"
						onChange={event=>this.setState({usernamebox:event.target.value})}
						onKeyPress={event=>{if (event.key==='Enter'){this.changeUsername(event.target.value);}}}
						/>
					<span class="input-group-btn" >
						<button 
							class="btn btn-secondary" 
							type="button" 
							onClick={()=>{this.changeUsername(this.state.usernamebox);}}>
								set
							</button>
					</span>
				</div>
				<div>current username:{this.props.usrnm}</div>
					Users online:{this.state.currentUsers.length}
					<ul>
						{users}
					</ul>
			</div>
			)
	}
}

export default connect(null,{changeUsernameAction})(connectedUsers);