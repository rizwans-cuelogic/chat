import config from 'config';
import { authHeader } from '../_helpers';
import { alertActions } from './';
export const chatService = {
    insertChannel,
    getChannels
};


function insertChannel(channel,sender,chatWith){
    debugger;
    let headers =authHeader();
    headers['Content-Type'] = 'application/json'
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ 'title':channel,'createdBy':sender,'chatWith':chatWith})
    };

    return fetch(`${config.apiUrl}/chat`, requestOptions)
        .then(handleResponse)
        .then(channel_chat => {
            debugger;
            // login successful if there's a jwt token in the response
            if (channel_chat) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('channel_insert', JSON.stringify(channel_chat));
            }
            return channel_chat;
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