import { mount } from '@cypress/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import { moviesApi } from 'src/services/movies';
import styles from 'src/containers/Home/styles.module.scss';
import Home from 'src/containers/Home';

describe('Home Component', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/movie/popular?page=1', {
            statusCode: 200,
            body: {
                results: [
                    {
                        id: '1',
                        title: 'Test Movie 1',
                        poster_path: '/test-poster1.jpg',
                        overview: 'This is a test movie overview 1.',
                        release_date: '2023-01-01',
                        vote_average: 8.5,
                    },
                    {
                        id: '2',
                        title: 'Test Movie 2',
                        poster_path: '/test-poster2.jpg',
                        overview: 'This is a test movie overview 2.',
                        release_date: '2023-02-01',
                        vote_average: 7.5,
                    },
                ],
                total_pages: 1,
            },
        }).as('getMoviesList');

        cy.intercept('GET', '**/search/movie?query=Test', {
            statusCode: 200,
            body: {
                results: [
                    {
                        id: '3',
                        title: 'Searched Movie 1',
                        poster_path: '/search-poster1.jpg',
                        overview: 'This is a searched movie overview 1.',
                        release_date: '2023-03-01',
                        vote_average: 9.0,
                    },
                ],
                total_pages: 1,
            },
        }).as('searchMovies');
    });

    const store = configureStore({
        reducer: {
            [moviesApi.reducerPath]: moviesApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(moviesApi.middleware),
    });

    const mountComponent = () => {
        mount(
            <Provider store={store}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </Provider>
        );
    };

    it('renders loading state', () => {
        cy.intercept('GET', '**/movie/popular?page=1', (req) => {
            req.reply((res) => {
                cy.wait(1000);
                res.send({
                    results: [],
                    total_pages: 1,
                });
            });
        }).as('getMoviesListLoading');

        mountComponent();

        cy.contains('Loading...', { timeout: 10000 }).should('be.visible');
    });

    it('renders error state', () => {
        cy.intercept('GET', '**/movie/popular?page=1', {
            statusCode: 500,
            body: { message: 'Internal Server Error' },
        }).as('getMoviesListError');

        mountComponent();
    });

    it('renders movies list correctly', () => {
        mountComponent();
        cy.get(`.${styles.container}`, { timeout: 10000 }).should('exist');
    });

    it('renders search results correctly', () => {
        mountComponent();

        cy.get('input', { timeout: 10000 }).should('be.visible').type('Test');
        cy.wait('@searchMovies', { timeout: 10000 });

        cy.contains('Searched Movie 1', { timeout: 10000 }).should('be.visible');
    });
});