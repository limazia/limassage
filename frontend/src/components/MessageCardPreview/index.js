import React from 'react';

import bg from '../../assets/images/bg.svg';

import './styles.css';

function MessageCardPreview({ messageUser, messageContent }) {
  return (
    <div
      className="card card--preview"
      style={{ borderTop: "4px solid #007bff" }}
    >
      <img
        src={bg}
        className="card-img-top img-fluid"
        alt="Background"
        style={{ borderRadius: 0 }}
      />
      <div className="card-body" style={{ paddingTop: 0 }}>
        <div className="text-center" style={{ margin: 0 }}>
          <div className="mt-2">
            <h5 className="card-title">
              {messageUser ? messageUser : "{name}"}{" "}
              <span className="text-muted">
                enviou uma <b>mensagem</b>
              </span>
            </h5>
          </div>
          <div className="mt-2">
            <span style={{ fontSize: 15 }}>
              {messageContent ? messageContent : "{message}"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageCardPreview;