import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import socketio from 'socket.io-client';

import bg from '../../assets/images/bg.svg';
import sound from '../../assets/sounds/sound.mp3';

import api from '../../services/api';

import './styles.css';

export default function OverlayMessage() {
  document.body.style.background = "none";

  const [request, setRequest] = useState([]);
  const [requestStatus, setRequestStatus] = useState(false);
  const [statusCountStatus, setStatusCountStatus] = useState(false);
  const [messageCountStatus, setMessageCountStatus] = useState(true);
  const [statusCount, setStatusCount] = useState(10);
  const [messageCount, setMessageCount] = useState(5);

  const statusTimer = () => setStatusCount(statusCount - 1);
  const messageTimer = () => setMessageCount(messageCount - 1);

  useEffect(() => {
    if (messageCountStatus) {
      if (messageCount <= 0) {
        getMessage();
        setMessageCount(5);
      }
    }
    const messageRefresh = setInterval(messageTimer, 1000);
    return () => clearInterval(messageRefresh);
  }, [statusCount]);

  useEffect(() => {
    if (statusCountStatus) {
      if (statusCount <= 0) {
        setStatusCount(10);
        setMessageCount(5);
        setRequestStatus(false);
        setMessageCountStatus(true);
      }
    }
    const statusRefresh = setInterval(statusTimer, 1000);
    return () => clearInterval(statusRefresh);
  }, [statusCount]);

  useEffect(() => {
    const socket = socketio(process.env.REACT_APP_SOCKET_URL);

    socket.on("newMessage", (data) => {
      setRequest([data]);
      setRequestStatus(true);
      setStatusCount(10);
      setMessageCount(5);
      setMessageCountStatus(false);
      setStatusCountStatus(true);

      deleteMessage(data.message_id);
    });
  }, []);

  async function getMessage() {
    await api.get("/api/messages");
  }

  async function deleteMessage(message_id) {
    await api.delete(`/api/messages/${message_id}`);
  }

  function renderMessage(item, requestStatus) {
    if (requestStatus) {
      return (
        <div key={item.message_id} className="box fadeout">
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
            <span className="user">{item.message_user}</span>
            <span className="base">enviou uma</span>
            <span className="item">mensagem</span>
          </div>
          <div className="box-message">
            <small className="message">{item.message_content}</small>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      {request.length > 0 ? (
        <>{request.map((item) => renderMessage(item, requestStatus))}</>
      ) : (
        <div className="box"></div>
      )}
    </>
  );
}