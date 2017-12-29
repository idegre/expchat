import React, {Component} from 'react';

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
			usernameKey:null
		}
	}

	componentDidMount(){
		this.changeUsername(this.props.usrnm);
		messagesRef.child(this.props.chatDir+'/connected/').on('value',snap=>{
				var usrArray=[];
				messagesRef.child(this.props.chatDir+'/connected/'+this.state.usernameKey).onDisconnect().remove();
				snap.forEach(item=>{
					usrArray.push(item.val().username);
				})
				this.setState({currentUsers:usrArray});
			})	
	}

	changeUsername(usrnm){//checks usernem avalibality and reduxes new username
		var usernameKey=this.state.usernameKey;
		if(usrnm!=undefined){
			if(this.state.usernameKey!=null){//check if a username entry was alredy made
				messagesRef.child(this.props.chatDir+'/connected/'+usernameKey).set({username:usrnm});
			}else{
				usernameKey=messagesRef.child(this.props.chatDir+'/connected/').push({username:usrnm}).getKey();
			}
			bake_cookie(this.props.chatDir+'user',{username:''+usrnm});
			this.setState({usernameKey:usernameKey});
			this.props.changeUsernameAction(usrnm);
		}
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