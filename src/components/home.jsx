import React, {Component} from 'react';

import * as firebase from 'firebase';
import {messagesRef} from '../firebase';

//const randomWord = require('random-word');
var randomWords = require('random-words');

var passwordHash = require('password-hash');

class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			chatName:'',
			password:'',
			timeout:'',
			passHash:'',
			placeHolderName:'your chat name here',
			class:''
		}
	}

	createChat(){
		let dir=randomWords({exactly: 1})+randomWords({exactly: 1})+randomWords({exactly: 1});
		if(this.state.chatName!=''){
			messagesRef.child(dir+'/properties').push(
				{chatName:this.state.chatName,
				hasPassword:(this.state.password!='')?true:false,
				hasTimeout:(this.state.timeout!='')?true:false,
				timeout:this.state.timeout,
				hash:(this.state.password!='')?passwordHash.generate(this.state.password):'',
				messages:{}});
			this.props.history.push('/chat/'+dir);
		}else{this.setState({placeHolderName:"you can't have an empty chat name",class:'form-control is-invalid'})}
		//TODO:move tis to it's own thing and put it when vaniti url is used
	}

	render(){
		var inputfieldStyle={
			margin: 'auto',
	    width:'50%',
	    marginBottom:'5px' };

		return(
			<div style={{
				position:'absolute',
				top:'0',height:'100%',
				left:'0',width:'100%',
				background:'#3399ff'}}>
				<h1 style={{textAlign:'center'}}>tinychat</h1>
				<div class="input-group"
					style={inputfieldStyle}>
	    			<span class="input-group-addon">Name:</span>
					<input
						class={this.state.class}
						type="text"
						placeholder={this.state.placeHolderName}
						className="form-control"
						onChange={event=>this.setState({chatName:event.target.value})}
						onKeyPress={event=>{if (event.key==='Enter'){}}}
						/>
				</div>
				<div class="input-group"
					style={inputfieldStyle}>
	    			<span class="input-group-addon">password:</span>
					<input
						type="text"
						placeholder="leave blank for none"
						className="form-control"
						onChange={event=>this.setState({password:event.target.value})}
						/>
				</div>
				<div class="input-group"
					style={inputfieldStyle}>
	    			<span class="input-group-addon">message timeout:</span>
					<input
						type="text"
						placeholder="leave blank for none"
						className="form-control"
						onChange={event=>this.setState({timeout:event.target.value})}
						/>
				</div>
				<button type="button" class="btn btn-success" style={{display:'block',marginLeft:'auto',marginRight:'auto'}} onClick={()=>{this.createChat()}}>start a new chat</button>
			</div>
		)
	}
}

export default Home;