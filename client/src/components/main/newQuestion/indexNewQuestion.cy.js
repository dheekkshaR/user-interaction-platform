import React from 'react'
import NewQuestion from './index'
import { mount } from 'cypress-react-unit-test';

// describe('<NewQuestion />', () => {
//   it('renders', () => {
//     // see: https://on.cypress.io/mounting-react
//     cy.mount(<NewQuestion />)
//   })
// })

describe('<NewQuestion />', () => {
  it('calls handleQuestions on valid form submission', () => {
    const handleQuestionsMock = cy.stub().as('handleQuestions');
    mount(<NewQuestion handleQuestions={handleQuestionsMock} />);

    cy.get('#formTitleInput').type('Test Title');
    cy.get('#formTextInput').type('Test Question Text');
    cy.get('#formTagInput').type('tag1 tag2');
    cy.get('#formUsernameInput').type('testuser');
    cy.get('.form_postBtn').click();

    cy.get('@handleQuestions').should('be.calledOnce');
  });

  it('does not call handleQuestions on invalid form submission', () => {
    const handleQuestionsMock = cy.stub().as('handleQuestions');
    mount(<NewQuestion handleQuestions={handleQuestionsMock} />);

    cy.get('.form_postBtn').click();

    cy.get('@handleQuestions').should('not.be.called');
  });
});
