/// <reference types="cypress" />
import { mount } from '@cypress/react';
import Rating from '../../src/components/Rating';

describe('Rating Component', () => {
  it('renders the Rating component with default stars', () => {
    mount(<Rating />);

    cy.get('.star').should('have.length', 10);
  });

  it('renders the Rating component with custom total stars', () => {
    mount(<Rating totalStars={5} />);

    cy.get('.star').should('have.length', 5);
  });

  it('handles star click events correctly', () => {
    mount(<Rating totalStars={5} />);

    cy.get('.star').eq(2).click();

    cy.get('.star.filled').should('have.length', 3);
  });

  it('handles star hover events correctly', () => {
    mount(<Rating totalStars={5} />);

    cy.get('.star').eq(3).trigger('mouseover');

    cy.get('.star').eq(3).trigger('mouseleave');
  });
});
