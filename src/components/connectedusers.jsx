import React, {Component} from 'react';

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
		messagesRef.child(this.props.chatDir+'/connected/').on('value',snap=>{
			var usrArray=[];
			if(this.state.usernameKey!=undefined){
				messagesRef.child(this.props.chatDir+'/connected/'+this.state.usernameKey).onDisconnect().remove();
				this.changeUsername(this.props.usrnm);
			}
			snap.forEach(item=>{
				usrArray.push(item.val().username);
			})
			this.setState({currentUsers:usrArray});
			console.log('usrarray:',usrArray)
		})
	}

	shouldComponentUpdate(nextProps){
		return nextProps!=this.props
	}

	changeUsername(usrnm){//checks usernem avalibality and reduxes new username
		var usernameKey='';
		if(usrnm!=undefined){
			usernameKey=messagesRef.child(this.props.chatDir+'/connected/').push({username:this.props.usrnm}).getKey();
			bake_cookie(this.props.chatDir,{username:''+usrnm});
			this.setState({usernameKey});			
	  }
		//document.location.reload();//tener en cuenta para apagar la coneccion cuando s ecambia e usuario, cuaidado con los loops
	}

	render(){
		return(
			<div>
				<div class="input-group">
					<input
					style={{background:'#80bfff'}}
					type="text"
					placeholder="username"
					className="form-control"
					onChange={event=>this.setState({usernamebox:event.target.value})}
					onKeyPress={event=>{if (event.key==='Enter'){this.changeUsername(event.target.value);document.location.reload()}}}
					/>
					<span class="input-group-btn" >
						<button class="btn btn-secondary" type="button" onClick={()=>{this.changeUsername(this.state.usernamebox);document.location.reload()}}>set</button>
					</span>
				</div>
				<div>current username:{this.props.usrnm}</div>
			Users online:{this.state.currentUsers.length}
				<ul>
					{this.state.currentUsers.map((usr)=>{return(<li>{usr}</li>)})}
				</ul>
			</div>
			)
	}
}

export default connectedUsers;