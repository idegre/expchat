import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chat from './components/chat';
import Home from './components/home';


import {Router,Route,Switch} from 'react-router';
import {createBrowserHistory,createHashHistory,createMemoryHistory} from 'history';

const browserHistory = createBrowserHistory();

ReactDOM.render(
	<Router path="/" history={browserHistory}>
		<div>
				<Route exact path='/' component={Home} />
    			<Route path='/chat/:number' component={Chat}/>
    			<Route path='*' component={NotFound} />
		</div>
	</Router>, document.getElementById('root'));

//browserHistory.push('chat');

const NotFound = () =>(<div>addrress not found</div>)
//<Route path="/chat" component={Chat} />