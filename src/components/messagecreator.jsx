import React, {Component} from 'react';

import * as firebase from 'firebase';
import {messagesRef} from '../firebase';

import ReactDOM from 'react-dom';

var key='passpasspasspass';

var encryptor = require('simple-encryptor')(key);

class MessageCreator extends Component{
	constructor(props){
		super(props);
		this.state={
			rawMessage:'',hasPass:false
		}
	}



	componentDidUpdate(prevState){
		if(this.props.password!=''&&key!='passpasspasspass'){//asi evito loops de set state
			this.setState({hasPass:true});
			key=this.props.password+'passpasspasspass';
			encryptor = require('simple-encryptor')(key);;
		}
	}

	componentDidUpdate(prevState){
		if(this.props.password!=''&&key=='passpasspasspass'){//asi evito loops de set state(solo corre si la key todavia no se actualizo)
			this.setState({hasPass:true});
			key=this.props.password+'passpasspasspass';
			encryptor = require('simple-encryptor')(key);
		}
	}

	parseThemes(text){
		var themeArray=[];
		var nextTheme=-1;
		do{
			nextTheme=text.indexOf('#',nextTheme+1);//it jumps the previous theme
			console.log('nexttheme:',nextTheme);
			if(nextTheme!==-1){
				if(text.indexOf(' ',nextTheme)!=-1){
					console.log(text.substr(nextTheme+1,text.indexOf(' ',nextTheme)-nextTheme).toLowerCase(),nextTheme,text.indexOf(' ',nextTheme),'1');
				}else{
					if(text.indexOf('#',nextTheme+1)!=-1){
						//has another hashtag but no space in between
						console.log(text.substr(nextTheme+1,text.indexOf('#',nextTheme+1)-nextTheme-1).toLowerCase(),nextTheme,text.indexOf('#',nextTheme)-nextTheme,'2');
					}else{
						//the hasthtag reaches EOF
						console.log(text.substr(nextTheme+1,text.length-nextTheme).toLowerCase(),nextTheme,text.length-nextTheme,'3');
					}
				}
			}
		}while(nextTheme!==-1);
		return themeArray;
	}

	sendMessage(){
		if(this.state.rawMessage!=''){
			console.log('sending message');
			this.parseThemes(this.state.rawMessage);
			messagesRef.child(this.props.chatDir+'/messages').push(
				{message:(this.state.hasPass)?encryptor.encrypt(this.state.rawMessage):this.state.rawMessage,
				user:(this.state.hasPass)?encryptor.encrypt(this.props.usrnm):this.props.usrnm});
			ReactDOM.findDOMNode(this.refs.textBox).value="";//and that kids, is how you clear a form...
			this.setState({rawMessage:''});
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

//TODO add anti-spamming thing
//TODO add character limit

export default MessageCreator;