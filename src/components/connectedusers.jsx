import React, {Component} from 'react';

import * as firebase from 'firebase';
import {messagesRef} from '../firebase';

class connectedUsers extends Component{
	constructor(props){
		super(props);
		this.state={
		}
	}

	render(){
		return(
			<div style={{position:'absolute',bottom:'0',left:'0',height:'10%',width:'100%'}} class="input-group">
				<input
					style={{height:'100%',background:'#80bfff'}}
					type="text"
					placeholder="message..."
					className="form-control"
					ref="textBox"
					onChange={event=>this.setState({rawMessage:event.target.value})}
					onKeyPress={event=>{if (event.key==='Enter'){this.sendMessage()}}}
					/>
				<span class="input-group-btn" >
					<button class="btn btn-secondary" type="button" onClick={()=>{this.sendMessage()}} style={{height:'100%'}}>send!</button>
				</span>
			</div>
			)
	}
}

export default connectedUsers;