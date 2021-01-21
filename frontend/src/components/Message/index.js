import React from "react";
import ReactAudioPlayer from 'react-audio-player';

import bg from '../../assets/images/bg.svg';
import sound from '../../assets/sounds/sound.mp3';

import "./styles.css";

function Message({ data, status }) {
  document.body.style.overflowY = "hidden";

  if (status) {
    return (
      <div className="box fadeout">
        <ReactAudioPlayer src={sound} autoPlay />
        <div className="box-image">
          <div className="row justify-content-center align-items-center">
            <div className="bar">
              <div className="progress"></div>
            </div>
          </div>
          <img src={bg} alt="Background" />
        </div>
        <div className="box-title">
          <span className="user">{data.message_user}</span>
          <span className="base">enviou uma</span>
          <span className="item">mensagem</span>
        </div>
        <div className="box-message">
          <small className="message">{data.message_content}</small>
        </div>
      </div>
    );
  }
}

export default Message;