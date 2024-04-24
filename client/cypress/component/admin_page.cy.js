import React from 'react';
import { mount } from 'cypress/react18'
import AdminPage from '../../src/components/main/adminPage/adminPage';

describe('AdminPage Component', () => {
    beforeEach(() => {
      // Mount AdminPage component
      mount(<AdminPage />);
    });
  
    it('displays form elements', () => {
      // Check if the title "Admin Page" is present
      cy.contains('h1', 'Admin Page').should('exist');
  
      // Check if the "Select User" dropdown is present
      cy.get('label[for="userSelect"]').should('exist');
      cy.get('select#userSelect').should('exist');
  
      // Check if the "Select Privilege" dropdown is present
      cy.get('label[for="privilegeSelect"]').should('exist');
      cy.get('select#privilegeSelect').should('exist');
  
      // Check if the "Update Privilege" button is present
      cy.get('.form_postBtn').should('exist').and('contain', 'Update Privilege');
    });
  });