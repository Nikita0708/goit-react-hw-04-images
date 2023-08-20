import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

export const Modal = ({ onClose, largeImageURL, tags }) => {
  useEffect(() => {
    const closeModalByEsc = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', closeModalByEsc);

    return () => {
      window.removeEventListener('keydown', closeModalByEsc);
    };
  }, [onClose]);

  const closeModalOverlay = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div className={style.Overlay} onClick={closeModalOverlay}>
      <div className={style.Modal}>
        <img src={largeImageURL} alt={tags} width="850" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
