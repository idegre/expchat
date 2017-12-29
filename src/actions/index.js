import {CHANGE_USERNAME} from '../constants';

export const changeUsernameAction=(username)=>{
	const action={
		type:CHANGE_USERNAME,
		username
	}
	return action;
}