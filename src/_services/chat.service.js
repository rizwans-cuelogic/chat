import config from 'config';
import { authHeader } from '../_helpers';
import { alertActions } from './';
export const chatService = {
    insertChannel,
    getChannels
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

function handleResponse(response) {
    debugger;
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}