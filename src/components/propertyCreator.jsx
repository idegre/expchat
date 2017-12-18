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
				<form class="form-inline" style={{position:'relative',left:'25%'}}>

					<div class="form-row" style={{marginBottom:'5px'}}>
						<div class="input-group" style={{width:'50%'}}>
							<div class="input-group-addon" style={{width:'80px'}}>Title:</div>
							<input
								type="text"
								placeholder={this.state.placeHolderName}
								className="form-control"
								onChange={event=>this.setState({timeout:event.target.value})}/>
						</div>
						<span class="glyphicon glyphicon-info-sign" style={{fontSize:'20px',verticalAlign:'middle',margin:'5px'}}></span>
					</div>

					<div class="form-row" style={{marginBottom:'5px'}}>
						<div class="input-group" style={{width:'50%'}}>
									<span class="input-group-addon" style={{width:'100px'}}>password:</span>
									<input
										type="text"
										placeholder="leave blank for none"
										className="form-control"
										onChange={event=>this.setState({password:event.target.value})}/>
						</div>
						<span class="glyphicon glyphicon-info-sign" style={{fontSize:'20px',verticalAlign:'middle',margin:'5px'}}></span>
					</div>
				</form>
				<button
					  type="button"
					  class="btn btn-success"
					  style={{display:'block',margin:'auto'}}
					  onClick={()=>{this.createChat()}}>{this.props.text}</button>
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
//style={{position:'relative',left:'75%',fontSize:'25px','}}

/*<div>
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
						<form class="form-inline" style={inputfieldStyle}>
							<div class="form-row  align-items-center">
								<div class="input-group ">
									<span class="input-group-addon">password:</span>
									<input
										style={{}}
										type="text"
										placeholder="leave blank for none"
										className="form-control"
										onChange={event=>this.setState({password:event.target.value})}/>
								</div> 
								<div  class="glyphicon glyphicon-info-sign" style={{fontSize:'20px'}}></div>
						  </div>
						</form>*/