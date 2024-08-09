import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import styles from 'src/components/moviesList/styles.module.scss';
import { CardMovie } from 'src/components/moviesList/CardMovie';

describe('CardMovie Component', () => {
  const mockMovie = {
    id: 1,
    title: 'Test Movie',
    poster_path: 'test-poster.jpg',
    vote_average: 7.5,
    release_date: '2023-01-01',
  };

  it('renders correctly with movie data', () => {
    mount(
      <MemoryRouter>
        <CardMovie movie={mockMovie} />
      </MemoryRouter>
    );

    cy.get(`.${styles.cardTitle}`).should('have.text', 'Test Movie');

    cy.get(`.${styles.cardImgTop}`)
      .should('have.attr', 'src')
      .and('equal', 'http://image.tmdb.org/t/p/w500/test-poster.jpg');

    cy.get(`.${styles.cardFooter}`).find('[class*="star"]').should('exist');

    cy.get(`.${styles.movieInfo}`).should('contain', '2023');

    cy.get('a').should('have.attr', 'href', '/movie/1');
  });

  it('uses fallback image when poster_path is not provided', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: '' };
    
    mount(
      <MemoryRouter>
        <CardMovie movie={movieWithoutPoster} />
      </MemoryRouter>
    );

    cy.get(`.${styles.cardImgTop}`)
      .should('have.attr', 'src')
      .and('include', 'bg.jpg');
  });

  it('handles zero rating correctly', () => {
    const movieWithZeroRating = { ...mockMovie, vote_average: 0 };
    
    mount(
      <MemoryRouter>
        <CardMovie movie={movieWithZeroRating} />
      </MemoryRouter>
    );

    cy.get(`.${styles.cardFooter}`).find('[class*="star"]').should('have.length.at.least', 1);
  });
});