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
		return(
			<div>
				<div class="container">
					<div class="row">
						<div class="col-md-2"></div>

							<div class="col-md-8 nopadding">
								<form class="form-inline">
									<div class="form-row" style={{marginBottom:'5px'}}>
										<div class="input-group" style={{width:'100%'}}>
											<div class="input-group-addon" style={{width:'80px'}}>Title:</div>
											<input
												type="text"
												placeholder={this.state.placeHolderName}
												className="form-control"
												onChange={event=>this.setState({chatName:event.target.value})}/>
										</div>
									</div>

									<div class="form-row" style={{marginBottom:'5px'}}>
										<div class="input-group" style={{width:'100%'}}>
													<span class="input-group-addon" style={{width:'80px'}}>Password:</span>
													<input
														type="text"
														placeholder="leave blank for none"
														className="form-control"
														onChange={event=>this.setState({password:event.target.value})}/>
										</div>
									</div>
								</form>

								<button
								  type="button"
								  class="btn btn-success"
								  style={{display:'block',margin:'auto'}}
								  onClick={()=>{this.createChat();console.log(this.props.dir)}}>{this.props.text}</button>
							</div>			

							<div class="col-md-2 nopadding" style={{display:'table'}}>
								<div style={{width:'30px',display:'table-cell'}}>
									<span 
										class="glyphicon glyphicon-info-sign infoButton" 
										id="titleButton" 
										style={{fontSize:'20px',verticalAlign:'middle',margin:'5px',height:'30px'}}
										onClick={()=>{this.setState({titleBut:!this.state.titleBut})}}></span>
									<span 
										class="glyphicon glyphicon-info-sign infoButton" 
										id="passButton" 
										style={{fontSize:'20px',verticalAlign:'middle',margin:'5px',height:'30px'}}
										onClick={()=>{this.setState({passBut:!this.state.passBut})}}></span>
								</div>

								<div style={{display:'table-cell'}}>
									<div 
										class={this.state.titleBut?'infoBlock visible':'infoBlock'}
										className="infoBlock" 
										id="titleInfo">
											This will be the title on the chat-room not the URL
									</div>
									<div
										class={this.state.passBut?'infoBlock visible':'infoBlock'}
										className="infoBlock" 
										id="passInfo">
										Using a password allows end-to-end encryption. Don't loose it as it can't be recovered.
									</div>
								</div>
							</div>
						</div>
					</div>

			</div>
		)
	}
}
export default PropertyCreator;
