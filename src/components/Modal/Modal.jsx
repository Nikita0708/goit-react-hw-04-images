import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

export class Modal extends Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
    };
    componentDidMount() {
        window.addEventListener('keydown', this.closeModalByEsc);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.closeModalByEsc);
    }

    closeModalByEsc = event => {
        if (event.code === 'Escape') {
            this.props.onClose();
        }
    };
    closeModalOverlay = event => {
        if (event.currentTarget === event.target) {
            this.props.onClose();
        }
    };

    render() {
        const { largeImageURL, tags } = this.props;
        return (
            <div className={style.Overlay} onClick={this.closeModalOverlay}>
                <div className={style.Modal}>
                    <img src={largeImageURL} alt={tags} width="850" />
                </div>
            </div>
        );
    }
}