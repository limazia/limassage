import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';
import History from '../../components/History';

import api from '../../services/api';

import './styles.css';

export default function Home() {
  document.body.style.overflowY = "auto";

  const [historys, setHistorys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistorys();

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadHistorys(page = 1) {
    try {
      const { data } = await api.get(`/api/history?page=${page}`);
      if (data) {
        setHistorys(data);
      }
    } catch (err) {
      toast.error("Erro ao carregar o histórico de mensagens!");
    }
  }

  function paginationList() {
    let pageNumbers = [];
    for (let i = 1; i <= historys.pages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number) => {
      let classes = historys.page === number ? "page-item active" : "page-item";
      return (
        <li key={number} className={classes}>
          <button className="page-link" onClick={() => loadHistorys(number)}>
            {number}
          </button>
        </li>
      );
    });
  }

  function firstPage() {
    const pageNumber = 1;
    loadHistorys(pageNumber);
  }

  function lastPage() {
    const pageNumber = historys.pages;
    loadHistorys(pageNumber);
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <div className="container mt-5">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-6">
                <h3 className="pb-3">
                  HISTÓRICO{" "}
                  <small className="text-muted">
                    ({historys.items.length || "0"})
                  </small>
                </h3>
                {historys.items.length >= 1 ? (
                  <>
                    {historys.items.map((history) => (
                      <History data={history} />
                    ))}
                    <nav>
                      <ul className="pagination justify-content-center">
                        <li className="page-item">
                          <button
                            className="page-link"
                            disabled={historys.page === 1}
                            onClick={firstPage}
                          >
                            <span>&laquo;</span>
                            <span className="sr-only">Anterior</span>
                          </button>
                        </li>
                        {paginationList()}
                        <li className="page-item">
                          <button
                            className="page-link"
                            disabled={historys.page === historys.pages}
                            onClick={lastPage}
                          >
                            <span>&raquo;</span>
                            <span className="sr-only">Próximo</span>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </>
                ) : (
                  <div className="alert alert-danger mt-3">
                    <p style={{ margin: 0 }}>
                      Nenhuma mensagem foi encontrada.
                    </p>
                    <small className="mb-0">
                      Seja o primeiro a enviar uma mensagem clicando no botão "
                      <b>Enviar mensagem</b>".
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}