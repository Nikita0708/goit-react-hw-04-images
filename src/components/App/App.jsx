import React from 'react';
import { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { imagesMap } from '../../utils/imagesMap.js';
import * as API from '../../API/api';

import { Container } from './App.styled';
import { Button } from 'components/Button';
import { ImageGallery } from 'components/ImageGallery';
import { Loader } from 'components/Loader';
import { Searchbar } from '../Searchbar';
import { Section } from 'components/Section';

export const App = () => {
  const [images, setImages] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (query === '') return;

      setIsLoading(true);

      try {
        const { hits, totalHits } = await API.fetchImgs(query, page);

        setImages(prevImages => [...prevImages, ...imagesMap(hits)]);
        setTotalHits(totalHits);

        if (totalHits === 0) {
          toast(
            'There are no images matching your search query. Please try again.'
          );
        }
        if (page === 1 && totalHits !== 0) {
          toast(`We found ${totalHits} images`);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handelSubmitForm = newQuery => {
    if (newQuery.trim() === '') {
      toast.error('Enter data to search');
      return;
    }

    setImages([]);
    setPage(1);
    setQuery(newQuery);
  };

  const handleButtonLoad = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handelSubmitForm} />
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      <Section>
        {isLoading && <Loader />}
        {images && <ImageGallery images={images} />}

        {images && totalHits - page * 12 > 0 && (
          <Button onClick={handleButtonLoad} />
        )}
      </Section>
      <ToastContainer />
    </Container>
  );
};
