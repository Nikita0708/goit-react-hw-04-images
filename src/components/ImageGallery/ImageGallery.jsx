import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import style from './ImageGallery.module.css';


export const ImageGallery = ({ images }) => {
    return (
        <ul className={style.ImageGallery}>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    tags={tags}
                />
            ))}
        </ul>
    );
};
ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            webformatURL: PropTypes.string,
            largeImageURL: PropTypes.string,
            tags: PropTypes.string,
        })
    ).isRequired,
};