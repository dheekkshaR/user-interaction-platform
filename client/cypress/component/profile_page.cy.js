import React from 'react';
import { mount } from 'cypress/react18'
import Profile from '../../src/components/main/profilePage/profilePage';
import MyQuestionPage from '../../src/components/main/profilePage/myPosts';

describe('Profile Component', () => {
  const user = {
    name: 'John Doe',
    username: 'johndoe123',
    bio: 'Lorem ipsum dolor sit amet',
    age: 30,
  };

  beforeEach(() => {
    mount(<Profile user={user} />);
  });

  it('displays title, name, and age', () => {
    cy.contains('h2', 'My Profile').should('exist'); // Check if the title is present
    cy.contains('.profile-label', 'Name:').next('.profile-value').should('contain', user.name); // Check if the name is present
    cy.contains('.profile-label', 'Age:').next('.profile-value').should('contain', user.age); // Check if the age is present
  });
});

describe('MyQuestionPage Component', () => {
    const user = { _id: '123', name: 'John Doe' }; // Mock user object
  
    beforeEach(() => {
      // Mount MyQuestionPage component with mock props
      mount(
        <MyQuestionPage
          clickTag={() => {}}
          handleAnswer={() => {}}
          user={user}
        />
      );
    });
  
    it('displays title and "No Questions posted" message', () => {
      cy.contains('h2', 'My Questions').should('exist'); // Check if the title "My Questions" is present
      cy.contains('.bold_title.right_padding', 'No Questions posted').should('exist'); // Check if "No Questions posted" message is present
    });
  });