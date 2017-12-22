import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ChatSlide from './chatslide';
import MessageCreator from './messagecreator';
import ConnectedUsers from './connectedusers';
import PropertyCreator from './propertyCreator'

import {read_cookie,bake_cookie} from 'sfcookies';

import * as firebase from 'firebase';
import {messagesRef} from '../firebase';

var randomWords = require('random-words');

var passwordHash = require('password-hash');

var a;

class Chat extends Component{
	constructor(props){
		super(props);
		this.state={
			title:'',
			password:'',
			timeout:'',
			hasPassword:null,
			hasTimeout:null,
			username:'',
			hash:'',
			passwordIsCorrect:false
		}
	}

	componentDidMount(){
		console.log('premountin');
		var cookie=read_cookie(this.props.match.params.number);//meto la config en las cookies para que haga carga instantanea dsps
		if (cookie.length==0||cookie.username==undefined||cookie.username==''){this.changeUsername(randomWords({exactly: 1}));console.log('no se encontro el usrnm',cookie.length==0,cookie.username==undefined,cookie.username=='');
		}else{this.changeUsername(cookie.username);console.log('se encontro el username',cookie)}
		this.setState({title:cookie.chatName,timeout:cookie.timeout,hasPassword:cookie.hasPassword,hasTimeout:cookie.hasTimeout});
		messagesRef.child(this.props.match.params.number+'/properties').once('value').then((snapshot)=>{
			snapshot.forEach(snap=>{
				this.setState({title:snap.val().chatName,timeout:snap.val().timeout,hasPassword:snap.val().hasPassword,hasTimeout:snap.val().hasTimeout,hash:snap.val().hash});
				bake_cookie(this.props.match.params.number,{title:snap.val().chatName,timeout:snap.val().timeout,hasPassword:snap.val().hasPassword,hasTimeout:snap.val().hasTimeout,username:this.state.username});
			})});
	
		//TODO fix this shit resetting your username on every refresh
	}

	changeUsername(usrnm){
		var sessionKey='';
		if(usrnm!=undefined){
			this.setState({username:''+usrnm},()=>{this.forceUpdate();console.log(usrnm,this.state.username);});
			bake_cookie(this.props.match.params.number,{username:''+usrnm});
			a=messagesRef.child(this.props.match.params.number+'/connected/')
			sessionKey=messagesRef.child(this.props.match.params.number+'/connected/').push({username:usrnm}).getKey()
			a.on('value',(snapshot)=> {
	   			messagesRef.child(this.props.match.params.number+'/connected/'+sessionKey).onDisconnect().remove();
	   			});//holy shit it works
		}
		//document.location.reload();//tener en cuenta para apagar la coneccion cuando s ecambia e usuario, cuaidado con los loops
	}

	verifyPassword(){
		if(passwordHash.verify(this.state.password,this.state.hash)){this.setState({passwordIsCorrect:true});console.log('pass was correct')}
		else{console.log('pass was incorrect');this.setState({passStatus:'wrong password'});ReactDOM.findDOMNode(this.refs.passwordInput).value="";}
			//TODO add sign to tell you the password was wrong
	}

	render(){
		if(this.state.hasPassword==true&&this.state.passwordIsCorrect==false)
			{var passStyle={
				position:'absolute',
				top:'0',height:'100%',
				left:'0',width:'100%',
				background:'red',
				zIndex:'10'}
			}else{
				var passStyle={
					zIndex:'-1',
					visibility: 'hidden'}
				};

		if(this.state.title==null&&this.state.hasPassword==null&&this.state.hasTimeout==null&&this.state.timeout==null){
			var configStyle={
				position:'absolute',
				top:'0',height:'100%',
				left:'0',width:'100%',
				background:'#3399ff',
				zIndex:'10'}
			}else{
				var configStyle={
					zIndex:'-1',
					visibility: 'hidden'}
				};//TODO this also seems not to be working


		return(
			<div style={{
				position:'absolute',
				top:'0',height:'100%',
				left:'0',width:'100%',
				background:'#3399ff'}}>
				<div style={passStyle}>
					<div style={{margin:'0 auto',width: '630px',height:'50px',marginTop:'20px',marginBottom:'20px',alignItems:'center'}}>
						<div style={{fontSize:'50px',float:'left'}} class="glyphicon glyphicon-exclamation-sign"></div>
						<div style={{marginLeft:'10px',fontSize:'40px',float:'right'}}>this chat is password protected</div>
					</div>
					<div class="input-group"
						style={{width:'50%',margin:'auto'}}>
	    			<span class="input-group-addon">password:</span>
						<input
							type="text"
							placeholder="password"
							className="form-control"
							onChange={event=>this.setState({password:event.target.value})}
							onKeyPress={event=>{if(event.key==='Enter'){this.verifyPassword()}}}
							ref="passwordInput"/>
						<span class="input-group-btn" >
							<button class="btn btn-secondary" type="button" 
							onClick={()=>{this.verifyPassword()}}>set</button>
						</span>
				</div>
				<div style={{width:'50%',margin:'auto'}}>{this.state.passStatus}</div>
				</div>




				<div style={configStyle}>
					<h2 style={{marginTop:'20px',marginBottom:'20px',textAlign:'center'}}>It seems you are the first here. Start this chat room!</h2>
					<PropertyCreator  text="set properties" dir={this.props.match.params.number}/>
				</div>

				<div style={{position:'absolute',
					top:'0',height:'10%',left:'0',width:'100%',borderBottom: '1px solid #D8D8D8'}}>
					<h1 style={{textAlign:'center',verticalAlign: 'middle'}}>{this.state.title}</h1>
				</div>


				<div style={{position:'absolute',
					top:'10%',height:'90%',left:'0',width:'20%',borderRight: '1px solid #D8D8D8'}}>
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
					<div>current username:{this.state.username}</div>
					<ConnectedUsers chatDir={this.props.match.params.number} usrnm={this.state.username}/>
				</div>


				<div style={{position:'absolute',
					top:'10%',height:'90%',left:'20%',width:'80%'}}>
					<ChatSlide chatDir={this.props.match.params.number} usrnm={this.state.username} password={this.state.password}/>
					<MessageCreator chatDir={this.props.match.params.number} usrnm={this.state.username} password={this.state.password}/>
				</div>
			</div>
		)
	}
}

//TODO add all timeot functionality
//TODO remove the hardcoding on title centering

export default Chat;