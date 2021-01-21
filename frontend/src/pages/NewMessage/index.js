import React, { useState, useEffect } from 'react';

import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';
import MessageCardForm from '../../components/MessageCardForm';

import './styles.css';

export default function NewMessage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <div className="container">
            <div className="row mt-5 pb-5">
              <MessageCardForm />
            </div>
          </div>
        </>
      )}
    </>
  );
}