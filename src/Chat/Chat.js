import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';
import './Chat.css'
import { Widget, addResponseMessage  } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

class Chat extends Component {

    constructor(props) {
        super(props)
        this.state = { oferta: {}, user: {}, fecha: "", hora: "" }
    }

    componentDidMount() {
        addResponseMessage("Welcome to this awesome chat!");
      }

    handleNewUserMessage = (newMessage) => {
        console.log(`New message incomig! ${newMessage}`);
        // Now send the message throught the backend API
        //addResponseMessage(response);
      }
    


    render() {
        return(
            <Widget 
                handleNewUserMessage={this.handleNewUserMessage}
                title={"Hola amigo"}
                launcher={handleToggle => (
                    <button onClick={handleToggle}>Toggle</button>
                  )}
            />
        );

    }
}

export default Chat;
                                                        
