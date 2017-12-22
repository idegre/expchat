import React, {Component} from 'react';

import * as firebase from 'firebase';
import {messagesRef} from '../firebase';

var key='passpasspasspass';

var encryptor = require('simple-encryptor')(key);

class ChatSlide extends Component{
	constructor(props){
		super(props);
		this.state={messages:[],keys:[],hasPass:false};
	}

	componentDidMount(){
		let newMessages=[];
		let newKeys=[];

		messagesRef.child(this.props.chatDir+'/messages').on('value',snap=>{
			snap.forEach((message)=>{
				if(this.state.keys.indexOf(message.key)<0){//chequea si ya tiene ese menasje
					if(this.state.hasPass){
						newMessages.push({text:encryptor.decrypt(message.val().message),user:encryptor.decrypt(message.val().user)});
					}else{
						newMessages.push({text:message.val().message,user:message.val().user});
					}
					newKeys.push(message.key);
				} else {console.log('ya tenia este')}
				console.log('message:',message.val());
			});
			this.setState({messages:newMessages,keys:newKeys});
		});
	}

	componentDidUpdate(prevState){
		if(this.props.password!=''&&key=='passpasspasspass'){//asi evito loops de set state(solo corre si la key todavia no se actualizo)
			this.setState({messages:[],keys:[],hasPass:true});//y aca tengo que borrar todo por si ya los bajo sin desencriptar
			key=this.props.password+'passpasspasspass';
			encryptor = require('simple-encryptor')(key);
			//TODO: find a way to make the messages reload on their own
		}
	}

	render(){
		console.log(this.props,this.state)
		let messages=[];
		messages = this.state.messages.map((message,index)=>(
			<div>{message.user}:{message.text}</div>))//more TODO: make the test slide always acroll to the bottom
		return(
			<div style={{position:'absolute',top:'0',left:'0',height:'90%',width:'100%',overflow:'auto',background:'#80bfff'}}>
				messages:
				{messages}
			</div>
			)
	}
}

//TODO add link parser that makes links html links in slide

export default ChatSlide;