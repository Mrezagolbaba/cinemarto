import { mount } from '@cypress/react';
import styles from 'src/components/pagination/styles.module.scss';
import Pagination from 'src/components/pagination';

describe('Pagination Component', () => {
  it('renders correctly', () => {
    const onPageChangeMock = cy.stub().as('onPageChangeMock');
    mount(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChangeMock} />);

    cy.get(`.${styles.pagination}`).should('exist');
    cy.get(`.${styles.paginationButton}`).should('have.length', 2);
    cy.get(`.${styles.pageNumber}`).should('exist');
  });

  it('disables Previous button on first page', () => {
    const onPageChangeMock = cy.stub().as('onPageChangeMock');
    mount(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChangeMock} />);

    cy.get(`.${styles.paginationButton}`).first().should('be.disabled');
  });

  it('disables Next button on last page', () => {
    const onPageChangeMock = cy.stub().as('onPageChangeMock');
    mount(<Pagination currentPage={10} totalPages={10} onPageChange={onPageChangeMock} />);

    cy.get(`.${styles.paginationButton}`).last().should('be.disabled');
  });

  it('calls onPageChange when a page number is clicked', () => {
    const onPageChangeMock = cy.stub().as('onPageChangeMock');
    mount(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChangeMock} />);

    cy.get(`.${styles.pageNumber}`).contains('2').click();
    cy.get('@onPageChangeMock').should('have.been.calledWith', 2);
  });

  it('calls onPageChange when Next button is clicked', () => {
    const onPageChangeMock = cy.stub().as('onPageChangeMock');
    mount(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChangeMock} />);

    cy.get(`.${styles.paginationButton}`).last().click();
    cy.get('@onPageChangeMock').should('have.been.calledWith', 2);
  });

  it('calls onPageChange when Previous button is clicked', () => {
    const onPageChangeMock = cy.stub().as('onPageChangeMock');
    mount(<Pagination currentPage={2} totalPages={10} onPageChange={onPageChangeMock} />);

    cy.get(`.${styles.paginationButton}`).first().click({force: true});
    cy.get('@onPageChangeMock').should('have.been.calledWith', 1);
  });
  it('displays correct page numbers for middle pages', () => {
    const onPageChangeMock = cy.stub().as('onPageChangeMock');
    mount(<Pagination currentPage={5} totalPages={10} onPageChange={onPageChangeMock} />);
  
    cy.get(`.${styles.pageNumber}`).should('have.length', 10);
    cy.get(`.${styles.pageNumber}`).first().should('contain', '1');
    cy.get(`.${styles.pageNumber}`).last().should('contain', '10');
    cy.get(`.${styles.pageNumber}.${styles.active}`).should('contain', '5');
    
    for (let i = 1; i <= 10; i++) {
      cy.get(`.${styles.pageNumber}`).contains(i.toString()).should('exist');
    }
  
    cy.get(`.${styles.dots}`).should('not.exist');
  });

  it('limits total pages to 499', () => {
    const onPageChangeMock = cy.stub().as('onPageChangeMock');
    mount(<Pagination currentPage={1} totalPages={1000} onPageChange={onPageChangeMock} />);

    cy.get(`.${styles.pageNumber}`).last().should('contain', '499');
  });

  it('shows all page numbers when total pages is less than or equal to 10', () => {
    const onPageChangeMock = cy.stub().as('onPageChangeMock');
    mount(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChangeMock} />);

    cy.get(`.${styles.pageNumber}`).should('have.length', 10);
    cy.get(`.${styles.dots}`).should('not.exist');
  });
});