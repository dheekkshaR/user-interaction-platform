//import QuestionObj from '../../../server/models/questions'
// '../../src/models/question';
import QuestionHeader from '../../src/components/main/questionPage/header/index';
import OrderButton from '../../src/components/main/questionPage/header/orderButton/index';
//import OrderButton from '../../src/components/main/questionPage/header/orderButton/index';
import Question from '../../src/components/main/questionPage/question';
import QuestionPage from '../../src/components/main/questionPage';
// import Answer from '../../src/models/answer';
import React from 'react';
import { mount } from 'cypress/react18'

import { getQuestionsByFilter } from '../../src/services/questionService';


// Question Page - Order Button
it('Rendering Order Button', () => {
    const message = 'Test Message'
    const setQuestionOrderSpy = cy.spy('').as('setQuestionOrderSpy')
    
    cy.mount(<OrderButton 
        message={message} 
        setQuestionOrder={setQuestionOrderSpy}/>)
     cy.get('.btn').click()
     cy.get('@setQuestionOrderSpy').should('have.been.calledWith', message);

})

// Question Page - Header Component
it('Rendering Question Header', () => {
    const title = 'Sample Title'
    const count = 1
    // const newQuestionButton = 'Add a new question'
    const handleNewQuestionSpy = cy.spy().as('handleNewQuestionSpy')
    const setQuestionOrderSpy = cy.spy().as('setQuestionOrderSpy')
    
    cy.mount(<QuestionHeader 
        title_text={title} 
        qcnt = {count}
        setQuestionOrder={setQuestionOrderSpy}
        handleNewQuestion={handleNewQuestionSpy}/>)

    cy.get('.bold_title').contains(title)
    cy.get('.bluebtn').click()
    cy.get('@handleNewQuestionSpy').should('have.been.called');
    // cy.get('@consoleLogSpy').then(consoleLogSpy => {
    //   expect(consoleLogSpy).to.have.been.calledWith(newQuestionButton);
    // });
    cy.get('#question_count').contains(count + ' questions')
    cy.get('.btns .btn').eq(0).should('have.text', 'Newest');
    cy.get('.btns .btn').eq(1).should('have.text', 'Active');
    cy.get('.btns .btn').eq(2).should('have.text', 'Unanswered');
    cy.get('.btns .btn').each(($el, index, $list) => {
        cy.wrap($el).click();
        cy.get('@setQuestionOrderSpy').should('have.been.calledWith', $el.text());
    })
})

describe('Question Component', () => {
    it('renders question with correct elements and functionality', () => {
      const q = {
        _id: 'sample_id',
        title: 'Sample Question Title',
        answers: [{}, {}], // Simulate having two answers
        views: 100,
        asked_by: 'sample_user',
        ask_date_time: new Date().toISOString(), // Convert date to ISO string
        tags: [{ name: 'Sample Tag 1' }, { name: 'Sample Tag 2' }],
      };
      const clickTagSpy = cy.spy().as('clickTagSpy');
      const handleAnswerSpy = cy.spy().as('handleAnswerSpy');
  
      mount(
        <Question q={q} clickTag={clickTagSpy} handleAnswer={handleAnswerSpy} />
      );
  
      // Assertions
      cy.get('.postTitle').contains('Sample Question Title');
      cy.get('.postStats').contains('2 answers');
      cy.get('.postStats').contains('100 views');
      cy.get('.question_author').contains('sample_user');
      cy.get('.question_meta').contains('asked'); // Assuming you have a helper function for metadata
      cy.get('.question_tag_button').should('have.length', 2); // Assuming there are two tags
      cy.get('.question_tag_button').eq(0).click();
      cy.get('@clickTagSpy').should('have.been.calledWith', 'Sample Tag 1');
    });
  });


describe('Question Component', () => {
    it('should call handleAnswer on click with "sample_id"', () => {
      // Create a spy to spy on the handleAnswer function
      const handleAnswerSpy = cy.spy();
  
      // Mount the Question component with the spy as a prop
      const q = { _id: 'sample_id', title: 'Sample Question', answers: [], views: 0, tags: [] };
      mount(<Question q={q} handleAnswer={handleAnswerSpy} />);
  
      // Simulate a click event on the .question element
      cy.get('.question').click();
  
      // Wait for the handleAnswer function to be called
      cy.wrap(handleAnswerSpy).should('have.been.calledOnce');
  
      // Assert that handleAnswerSpy was called with 'sample_id'
      cy.wrap(handleAnswerSpy).should('have.been.calledWith', 'sample_id');
    });
  });

  describe('QuestionPage Component', () => {
    it('renders QuestionPage with correct props', () => {
      // Mock props for the QuestionPage component
      const props = {
        title_text: 'All Questions',
        order: 'newest',
        search: '',
        setQuestionOrder: cy.stub().as('setQuestionOrder'),
        clickTag: cy.stub().as('clickTag'),
        handleAnswer: cy.stub().as('handleAnswer'),
        handleNewQuestion: cy.stub().as('handleNewQuestion'),
      };
  
      // Mount the QuestionPage component with mocked props
      mount(<QuestionPage {...props} />);
  
      // Assertions for header component
      cy.contains('.bold_title', 'All Questions');
  
      // Assertions for question component
      cy.get('.question_list').children().should('have.length', 0); // Assuming no questions are rendered initially
  
      // Check if setQuestionOrder is called with the correct argument when OrderButton is clicked
      cy.get('.btns').contains('Newest').click();
      cy.get('@setQuestionOrder').should('have.been.calledOnceWithExactly', 'Newest');
  
    });
  });
