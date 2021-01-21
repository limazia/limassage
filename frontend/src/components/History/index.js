import React from 'react';

import './styles.css';

function History({ data }) {
  return (
    <div
      key={data.history_id}
      className="card mb-4"
      style={{ borderTop: "4px solid #007bff" }}
    >
      <div className="card-body">
        <h5 className="card-title">
          {data.history_user}{" "}
          <span className="text-muted">
            enviou uma <b>mensagem</b>
          </span>
        </h5>
        <p className="card-text">
          <blockquote className="blockquote--content">
            {data.history_content}
          </blockquote>
        </p>
      </div>
      <div className="card-footer">
        <span className="text-muted" style={{ fontSize: 15 }}>{data.createdAt}</span>
      </div>
    </div>
  );
}

export default History;