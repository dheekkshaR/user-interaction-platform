import React from 'react';
import { mount } from 'cypress/react18'
import SideBarNav from '../../src/components/main/sideBarNav';

describe('SideBarNav Component - Regular User', () => {
  const regularUser = { name: 'John Doe', typeOfUser: 'regular' }; // Mock regular user object

  beforeEach(() => {
    // Mount SideBarNav component with regular user props
    mount(
      <SideBarNav
        selected=""
        handleQuestions={() => {}}
        handleTags={() => {}}
        handleProfile={() => {}}
        handleAdmin={() => {}}
        user={regularUser}
      />
    );
  });

  it('displays menu buttons for regular user', () => {
    // Check if the "Questions" and "Tags" menu buttons are present
    cy.contains('#menu_question', 'Questions').should('exist');
    cy.contains('#menu_tag', 'Tags').should('exist');

    // Check if the "My Profile" menu button is present for regular user
    cy.contains('#menu_profile', 'My profile').should('exist');

    // Check if the "Administration" menu button is not present for regular user
    cy.contains('#menu_admin', 'Administration').should('not.exist');
  });
});

describe('SideBarNav Component - Admin User', () => {
    const adminUser = { name: 'Admin', typeOfUser: 'admin' }; // Mock admin user object
  
    beforeEach(() => {
      // Mount SideBarNav component with admin user props
      mount(
        <SideBarNav
          selected=""
          handleQuestions={() => {}}
          handleTags={() => {}}
          handleProfile={() => {}}
          handleAdmin={() => {}}
          user={adminUser}
        />
      );
    });
  
    it('displays menu buttons for admin user', () => {
      // Check if the "Questions" and "Tags" menu buttons are present
      cy.contains('#menu_question', 'Questions').should('exist');
      cy.contains('#menu_tag', 'Tags').should('exist');
  
      // Check if the "My Profile" menu button is present for admin user
      cy.contains('profile').should('exist');
  
      // Check if the "Administration" menu button is present for admin user
      cy.contains('Adminstration').should('exist');
    });
  });

  describe('SideBarNav Component - User is not logged in', () => {
    const nullUser = null; // Mock null user (not logged in)
  
    beforeEach(() => {
      // Mount SideBarNav component with null user props (not logged in)
      mount(
        <SideBarNav
          selected=""
          handleQuestions={() => {}}
          handleTags={() => {}}
          handleProfile={() => {}}
          handleAdmin={() => {}}
          user={nullUser}
        />
      );
    });
  
    it('does not display hidden menu buttons for null user', () => {
      // Check that no menu buttons are present for null user
      cy.contains('#menu_question', 'Questions').should('exist');
      cy.contains('#menu_tag', 'Tags').should('exist');
      cy.contains('My profile').should('not.exist');
      cy.contains('Administration').should('not.exist');
    });
  });