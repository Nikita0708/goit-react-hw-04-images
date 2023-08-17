import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal';

export class ImageGalleryItem extends Component {
    state = {
        showModal: false,
    };

    static propTypes = {
        id: PropTypes.number,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    };

    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }));
    };

    render() {
        const { id, webformatURL, largeImageURL, tags } = this.props;
        const { showModal } = this.state;

        return (
            <>
                <li key={id} className={style.GalleryItem} onClick={this.toggleModal}>
                    <img
                        className={style.GalleryItemImg}
                        src={webformatURL}
                        width="400"
                        alt={tags}
                    />
                </li>

                {showModal && (
                    <Modal
                        largeImageURL={largeImageURL}
                        tags={tags}
                        onClose={this.toggleModal}
                    />
                )}
            </>
        );
    }
}