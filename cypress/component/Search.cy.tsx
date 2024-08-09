import React from 'react';
import { mount } from '@cypress/react';
import s from 'src/components/search/styles.module.scss';
import Search from 'src/components/search';

describe('Search Component', () => {
  it('renders correctly', () => {
    const searchValue = '';
    const setSearchMock = cy.stub().as('setSearchMock');

    mount(<Search search={searchValue} setSearch={setSearchMock} />);

    cy.get(`.${s.container}`).should('exist');
    cy.get('input[type="text"]').should('exist');
  });

  it('displays the correct placeholder', () => {
    const searchValue = '';
    const setSearchMock = cy.stub().as('setSearchMock');

    mount(<Search search={searchValue} setSearch={setSearchMock} />);

    cy.get('input[type="text"]').should('have.attr', 'placeholder', 'Search');
  });

  it('displays the correct search value', () => {
    const searchValue = 'test search';
    const setSearchMock = cy.stub().as('setSearchMock');

    mount(<Search search={searchValue} setSearch={setSearchMock} />);

    cy.get('input[type="text"]').should('have.value', 'test search');
  });

  it('calls setSearch for each character typed', () => {
    const searchValue = '';
    const setSearchMock = cy.stub().as('setSearchMock');

    mount(<Search search={searchValue} setSearch={setSearchMock} />);

    cy.get('input[type="text"]').type('new search');

    // Check if setSearch was called for each character
    'new search'.split('').forEach((char, index) => {
      cy.get('@setSearchMock').its('callCount').should('be.gte', index + 1);
    });
  });
});