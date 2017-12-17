import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../custom.css';//i'll have a css file for the animations and styling of the info tables

import * as firebase from 'firebase';
import {messagesRef} from '../firebase';

var passwordHash = require('password-hash');



class PropertyCreator extends Component{
	static contextTypes = {
  	router: PropTypes.object.isRequired
	}

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
		if(this.state.chatName!=''){
			messagesRef.child(this.props.dir+'/properties').push(
				{chatName:this.state.chatName,
				hasPassword:(this.state.password!='')?true:false,
				hasTimeout:(this.state.timeout!='')?true:false,
				timeout:this.state.timeout,
				hash:(this.state.password!='')?passwordHash.generate(this.state.password):'',//if password!= from none it generates a hash
				messages:{}});
			//this.context.history.push('/chat/'+this.props.directory);//this either redirect or reload the page
			document.location = '../chat/'+this.props.dir;
		}else{this.setState({placeHolderName:"you can't have an empty chat name",class:'form-control is-invalid'})}

		//fix history.push as it doesn't work in home
	}

	render(){
		var inputfieldStyle={
			position:'relative',
			left:'25%',
	    width:'50%',
	  	marginBottom:'5px'};

		return(
					<div>
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
					<div style={{width:'100%'}}> 
						<div style={inputfieldStyle}>
						<div class="input-group" >
							<span class="input-group-addon">password:</span>
							<input
								type="text"
								placeholder="leave blank for none"
								className="form-control"
								onChange={event=>this.setState({password:event.target.value})}
								/>
						</div>
						</div>
						<div style={{position:'absolute',left:'75.5%',top:'12%',fontSize:'25px'}} class="glyphicon glyphicon-info-sign"></div>
					</div>
					<button type="button" class="btn btn-success" style={{display:'block',marginLeft:'auto',marginRight:'auto'}} onClick={()=>{this.createChat()}}>{this.props.text}</button>
				</div>
		)
	}//the height in the info ball is totally broken, try the same with a relative prosition
}
export default PropertyCreator;

/*
					<div style={inputfieldStyle}>
						<div class="input-group" style={{float:'left'}}>
			    		<span class="input-group-addon">message timeout:</span>
							<input
								type="text"
								placeholder="leave blank for none"
								className="form-control"
								onChange={event=>this.setState({timeout:event.target.value})}/>
								
						</div>
						
					</div>
*///this will go unimplemented for now

