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
		messagesRef.child(this.props.chatDir+'/connected').on('value',snap=>{
			snap.forEach(item=>{console.log('conn:',item.key);})
		})
	}

	render(){
		return(
			<div>
			Users online:{}
			</div>
			)
	}
}

export default connectedUsers;