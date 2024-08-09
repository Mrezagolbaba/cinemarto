import { mount } from '@cypress/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import styles from 'src/components/details/styles.module.scss';
import Details from 'src/components/details';
import { moviesApi } from 'src/services/movies';

describe('MovieDetails Component', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/movie/1', {
            statusCode: 200,
            body: {
                id: '1',
                title: 'Test Movie',
                poster_path: '/test-poster.jpg',
                overview: 'This is a test movie overview.',
                release_date: '2023-01-01',
                vote_average: 8.5,
            },
        }).as('getMovieDetails');
    });

    const store = configureStore({
        reducer: {
            [moviesApi.reducerPath]: moviesApi.reducer, 
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(moviesApi.middleware),
    });

    const mountComponent = (props = {}) => {
        mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/movie/1']}>
                    <Routes>
                        <Route path="/movie/:id" element={<Details {...props} />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    };

    it('renders loading state (optional)', () => {
       
        cy.intercept('GET', '**/movie/1', (req) => {
            req.reply((res) => {
                cy.wait(1000); 
                res.send({
                    id: '1',
                    title: 'Test Movie',
                    poster_path: '/test-poster.jpg',
                    overview: 'This is a test movie overview.',
                    release_date: '2023-01-01',
                    vote_average: 8.5,
                });
            });
        }).as('getMovieDetails');

        mountComponent();

        
        cy.contains('Loading...').should('be.visible');
    });

    it('renders error state (optional)', () => {
        cy.intercept('GET', '**/movie/1', {
            statusCode: 404,
            body: { message: 'Not Found' },
        }).as('getMovieDetails');

        mountComponent();

       
        cy.wait('@getMovieDetails');

       
        cy.contains(/error/i).should('be.visible');
    });

    it('renders movie details correctly', () => {
        mountComponent();

        
        cy.wait('@getMovieDetails');

       
        cy.get(`.${styles.container}`).should('exist');
        cy.get(`.${styles.header}`).should('exist');
        cy.get(`.${styles.content}`).should('exist');
        cy.get('img').click({ multiple: true })
        cy.get('img').should('have.attr', 'src', 'src/assets/arrowRight.svg');
        cy.get('img').should('have.attr', 'src', 'http://image.tmdb.org/t/p/w500//test-poster.jpg');
        cy.get('h1').should('have.text', 'Test Movie');
        cy.contains('This is a test movie overview.').should('be.visible');
        cy.contains('Release Date: 2023-01-01').should('be.visible');
        cy.get('.rating').should('exist');
    });
});
