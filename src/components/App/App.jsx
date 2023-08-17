import React from 'react';
import { Component } from 'react';
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

export class App extends Component {
    state = {
        images: null,
        query: '',
        page: 1,
        isLoading: false,
        error: null,
        totalHits: null,
    };

    async componentDidUpdate(_, prevState) {
        if (
            prevState.query !== this.state.query ||
            prevState.page !== this.state.page
        ) {
            this.setState({ isLoading: true });

            try {
                const { hits, totalHits } = await API.fetchImgs(
                    this.state.query,
                    this.state.page
                );

                this.setState(prevState => {
                    return {
                        images: [...prevState.images, ...imagesMap(hits)],
                        totalHits,
                    };
                });

                if (totalHits === 0) {
                    toast(
                        'There are no images matching your search query. Please try again.'
                    );
                }
                if (this.state.page === 1 && totalHits !== 0) {
                    toast(`We found ${totalHits} images`);
                }
            } catch (error) {
                this.setState({ error });
            } finally {
                this.setState({ isLoading: false });
            }
        }
    }

    handelSubmitForm = query => {
        if (query.trim() === '') {
            return toast.error('Enter data to search');
        }

        this.setState({ images: [], page: 1, query });
    };

    handleButtomLoad = () => {
        this.setState(prevState => ({ page: prevState.page + 1 }));
    };

    render() {
        const { images, isLoading, error, totalHits, page } = this.state;

        return (
            <Container>
                <Searchbar onSubmit={this.handelSubmitForm} />
                {error && <p>Whoops, something went wrong: {error.message}</p>}
                <Section>
                    {isLoading && <Loader />}
                    {images && <ImageGallery images={images} />}

                    {images && totalHits - page * 12 > 0 && (
                        <Button onClick={this.handleButtomLoad} />
                    )}
                </Section>
                <ToastContainer />
            </Container>
        );
    }
}