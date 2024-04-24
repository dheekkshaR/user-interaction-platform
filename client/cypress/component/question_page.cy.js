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

it('calls setQuestionOrder function when button is clicked', () => {
  // Mock props
  const message = 'Newest'; // Example message
  const setQuestionOrder = cy.stub().as('setQuestionOrder'); // Create a stub for setQuestionOrder

  // Mount OrderButton component with mock props
  mount(
    <OrderButton
      message={message}
      setQuestionOrder={setQuestionOrder}
    />
  );

  // Click the button
  cy.contains(message).click().then(() => {
    // Check that setQuestionOrder was called with the correct message
    expect(setQuestionOrder).to.have.been.calledWith(message);
  });
});


it('calls handleNewQuestion function when "Ask a Question" button is clicked', () => {
  // Mock props
  const title_text = 'Questions'; // Example title text
  const qcnt = 10; // Example question count
  const setQuestionOrder = cy.stub().as('setQuestionOrder'); // Create a stub for setQuestionOrder
  const handleNewQuestion = cy.stub().as('handleNewQuestion'); // Create a stub for handleNewQuestion
  const user = { typeOfUser: 'moderator' }; // Mock user object
  const setLoginPage = cy.stub().as('setLoginPage'); // Create a stub for setLoginPage

  // Mount QuestionHeader component with mock props
  mount(
    <QuestionHeader
      title_text={title_text}
      qcnt={qcnt}
      setQuestionOrder={setQuestionOrder}
      handleNewQuestion={handleNewQuestion}
      user={user}
      setLoginPage={setLoginPage}
    />
  );

  // Click the "Ask a Question" button
  cy.contains('Ask a Question').click().then(() => {
    // Check that handleNewQuestion was called
    expect(handleNewQuestion).to.have.been.called;
  });
});

// Question Page - Header Component
it('renders the QuestionHeader component', () => {
    // Mount QuestionHeader component
    mount(
      <QuestionHeader
        title_text="Questions"
        qcnt={10}
        setQuestionOrder={() => {}}
        handleNewQuestion={() => {}}
        user={{ typeOfUser: 'moderator' }}
        setLoginPage={() => {}}
      />
    );
  
    // Check if the header text is rendered
    cy.contains('Questions').should('exist');
  });


  it('renders the Question component with given info', () => {
    // Define a mock question object
    const mockQuestion = {
      _id: '123',
      title: 'Test Question',
      answers: [],
      views: 0,
      tags: [{ name: 'Test Tag' }],
      asked_by: { _id: '456', username: 'TestUser' },
      ask_date_time: new Date().toString(),
      flagged: 0,
    };
  
    // Mount Question component with mock props
    mount(
      <Question
        q={mockQuestion}
        clickTag={() => {}}
        handleAnswer={() => {}}
        user={{ _id: '456', typeOfUser: 'regular' }}
        change={0}
        setChange={() => {}}
      />
    );
  
    // Check if the question title is rendered
    cy.contains('Test Question').should('exist');
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
