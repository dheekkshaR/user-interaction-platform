import React from 'react';
import { mount } from 'cypress/react18'
import Question from '../../src/components/main/questionPage/question';

it('renders delete and approve options for moderator user', () => {
  // Define a mock question object for testing
  const mockQuestion = {
    _id: '123',
    title: 'Test Question',
    answers: [],
    views: 0,
    tags: [{ name: 'Test Tag' }],
    asked_by: { _id: '456', username: 'TestUser' },
    ask_date_time: new Date().toString(),
    flagged: 1, // Set flagged to 1 for testing moderator privileges
  };

  // Mount Question component with mock props and a moderator user
  mount(
    <Question
      q={mockQuestion}
      clickTag={() => {}}
      handleAnswer={() => {}}
      user={{ _id: '456', typeOfUser: 'moderator' }}
      change={0}
      setChange={() => {}}
    />
  );

  // Check if the delete icon is rendered for moderator user
  cy.get('.fa-trash').should('exist');

  // Check if the approve icon is rendered for moderator user
  cy.get('.fa-check').should('exist');
});
