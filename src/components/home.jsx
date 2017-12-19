import React, {Component} from 'react';
import PropertyCreator from './propertyCreator'

import * as firebase from 'firebase';
import {messagesRef} from '../firebase';

//const randomWord = require('random-word');
var randomWords = require('random-words');

class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			directory:''
		}
	}

	componenentDidMount(){
		let dir=randomWords({exactly: 1})+randomWords({exactly: 1})+randomWords({exactly: 1});
		this.setState({directory:dir});
	}

	render(){
		return(
			<div
			style={{
				position:'absolute',
				top:'0',height:'100%',
				left:'0',width:'100%',
				background:'#3399ff'
				}}>
				<h1 style={{textAlign:'center'}}>tinychat</h1>
				<PropertyCreator text="start a new chat" dir={randomWords({exactly: 1})+randomWords({exactly: 1})+randomWords({exactly: 1})}/>
				<div style={{position:'absolute',top:'40%',fontSize:'20px',textAlign:'center',width:'100%'}}>Just create a new chat, share the URL and chat...</div>
			</div>
		)
	}
}

export default Home;