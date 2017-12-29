import {CHANGE_USERNAME} from '../constants';

const reducers=(state={},action)=>{
	switch(action.type){
		case CHANGE_USERNAME:
			console.log('cambiando username', action);
			return action;

		default:
			return state;
	}
}
export default reducers;