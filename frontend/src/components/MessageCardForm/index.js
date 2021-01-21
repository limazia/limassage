import React, { useState } from 'react';
import { Form } from '@rocketseat/unform';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import MessageCardPreview from '../MessageCardPreview';

import api from '../../services/api';

import './styles.css';

function MessageCardForm() {
  const [messageUser, setMessageUser] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [messageCharacter, setMessageCharacter] = useState(0);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  async function handleSubmit() {
    try {
      setLoading(true);
      const { data } = await api.post("/api/messages", {
        message_user: messageUser,
        message_content: messageContent,
      });

      await api.post("/api/history", {
        history_user: messageUser,
        history_content: messageContent,
      });

      const { message, error } = data;
      console.log(data);

      if (message) {
        toast.success(message);
        history.push("/");
      } else {
        toast.error(error);
      }
    } catch (err) {
      console.log(err);
      //toast.error("Erro no servidor!");
    } finally {
      setLoading(false);
    }
  }

  function handleMessageChange(e) {
    setMessageContent(e.target.value);
    setMessageCharacter(e.target.value);
  }
  return (
    <>
      <div className="col-md-8">
        <div className="card" style={{ borderTop: "4px solid #007bff" }}>
          <div className="card-body">
            <h3>Enviar Mensagem</h3>
            <hr />
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="text-muted">Nome</label>
                    <input
                      type="text"
                      name="message_user"
                      className="form-control"
                      placeholder="Seu nome"
                      maxLength={29}
                      value={messageUser}
                      onChange={(e) => setMessageUser(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="text-muted">Mensagem</label>
                    <textarea
                      name="message_content"
                      className="form-control"
                      placeholder="Digite sua mensagem"
                      maxLength={255}
                      rows="4"
                      value={messageContent}
                      onChange={(e) => handleMessageChange(e)}
                    ></textarea>
                    <span className="message--counter">
                      {messageCharacter.length || "0"}/255
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {!messageUser ||
                  !messageContent ||
                  messageUser.length <= 4 ||
                  messageContent.length <= 14 ? (
                    <button disabled className="btn btn-message btn-block">
                      Enviar Mensagem
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-message btn-block">
                      {loading ? "Enviando..." : "Enviar Mensagem"}
                    </button>
                  )}
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <MessageCardPreview
          messageUser={messageUser}
          messageContent={messageContent}
        />
      </div>
    </>
  );
}

export default MessageCardForm;