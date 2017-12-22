import React, {Component} from 'react';

import * as firebase from 'firebase';
import {messagesRef} from '../firebase';

class connectedUsers extends Component{
	constructor(props){
		super(props);
		this.state={
			currentUsers:[]
		}
	}

	componentDidMount(){
		messagesRef.child(this.props.chatDir+'/connected/').on('value',snap=>{
			var usrArray=[];
			snap.forEach(item=>{
				usrArray.push(item.val().username);
				console.log('usr:',snap.val());
			})
			this.setState({currentUsers:usrArray});
			console.log(usrArray)
		})
	}

	render(){
		return(
			<div>
			Users online:{this.state.currentUsers.length}
				<ul>
					{this.state.currentUsers.map((usr)=>{return(<li>{usr}</li>)})}
				</ul>
			</div>
			)
	}
}

export default connectedUsers;