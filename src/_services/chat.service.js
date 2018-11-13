import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    insertChannel
};


function insertChannel(channel,sender,chatWith){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'title':channel,sender,chatWith})
    };

    return fetch(`${config.apiUrl}/chat`, requestOptions)
        .then(handleResponse)
        .then(chat => {
            debugger;
            // login successful if there's a jwt token in the response
            if (chat.id) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('chat', JSON.stringify(user));
            }
            return chat;
        });


}

function getChannels(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),

    };
    return fetch(`${config.apiUrl}/chats`, requestOptions).then(handleResponse);


}