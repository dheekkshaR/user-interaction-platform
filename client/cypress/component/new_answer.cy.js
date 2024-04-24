import NewAnswer from '../../src/components/main/newAnswer/index';
import { addAnswer } from '../../../client/src/services/answerService';
import { mount } from 'cypress/react18'
it('mounts', () => {
    const user = {
        name: 'John Doe',
        username: 'johndoe123',
        bio: 'Lorem ipsum dolor sit amet',
        age: 30,
      };
    cy.mount(<NewAnswer user={user}/>)
    cy.get('#answerTextInput')
    cy.get('.form_postBtn')
})

it('shows error message when both input is empty', () => {
    const user = {
        name: 'John Doe',
        _id:"1324",
        username: 'johndoe123',
        bio: 'Lorem ipsum dolor sit amet',
        age: 30,
      };
    cy.mount(<NewAnswer user={user}/>)
    cy.get('.form_postBtn').click()
    cy.get('div .input_error').contains('Answer text cannot be empty')
})

it('shows text inputted by user', () => {
    const user = {
        name: 'John Doe',
        username: 'johndoe123',
        bio: 'Lorem ipsum dolor sit amet',
        age: 30,
      };
    cy.mount(<NewAnswer user={user}/>)
    cy.get('#answerTextInput').should('have.value', '')
    cy.get('#answerTextInput').type('abc')
    cy.get('#answerTextInput').should('have.value', 'abc')
})


// it('addAnswer is called when click Post Answer', () => {
//     const obj = {
//         addAnswer: (arg) => {return arg}
//     }
//     const handleAnswer = cy.spy().as('handleAnswerSpy')
//     cy.spy(obj, 'addAnswer')
//     cy.mount(<NewAnswer qid={123} addAnswer={obj.addAnswer} handleAnswer={handleAnswer} />)
//     cy.get('#answerUsernameInput').type('usr')
//     cy.get('#answerTextInput').type('abc')
//     cy.get('.form_postBtn').click().then(
//         () => {
//             expect(obj.addAnswer).to.be.calledWith(123, {text: 'abc', ansBy: 'usr'}) 
//         }
//     )
// })

// it('handleAnswer is called when click Post Answer', () => {
//     const obj = {
//         addAnswer: (arg) => {return arg}
//     }
//     const handleAnswer = cy.spy().as('handleAnswerSpy')
//     cy.mount(<NewAnswer qid={123} addAnswer={obj.addAnswer} handleAnswer={handleAnswer} />)
//     cy.get('#answerUsernameInput').type('usr')
//     cy.get('#answerTextInput').type('abc')
//     cy.get('.form_postBtn').click()
//     cy.get('@handleAnswerSpy').should('have.been.calledWith', 123)
// })

// describe('NewAnswer Component', () => {
//     it('calls handleAnswer with qid when Post Answer button is clicked', () => {
//       // Mock addAnswer function
//       const addAnswer = cy.stub().resolves({ _id: 'sample_answer_id' }); // Resolve a mock response
  
//       // Mock handleAnswer function
//       const handleAnswer = cy.stub().as('handleAnswerStub');
  
//       // Mount the NewAnswer component
//       mount(<NewAnswer qid="sample_qid" handleAnswer={handleAnswer}  />);
  
//       // Type inputs if needed
//       cy.get('#answerUsernameInput').type('usrn');
//       cy.get('#answerTextInput').type('Sample answer text');
  
//       // Click the Post Answer button
//       cy.contains('Post Answer').click();
  
//       // Wait for addAnswer to be called and resolve
//       cy.wrap(addAnswer).should('have.been.calledOnce').and('been.calledWithExactly', 'sample_qid', {
//         text: 'Sample answer text',
//         ans_by: 'usrn',
//         ans_date_time: Cypress.sinon.match.date, // Matches any date object
//       }).as('addAnswerCall');
  
//       // Wait for handleAnswer to be called after successful addAnswer
//       cy.get('@addAnswerCall').then(() => {
//         cy.get('@handleAnswerStub').should('have.been.calledOnceWith', 'sample_qid');
//       });
//     });
//   });


// describe('NewAnswer Component', () => {
//     const mockUser = { _id: '123', name: 'Test User' }; // Mock user object
//     let handleAnswerSpy; // Declare a variable for the spy
  
//     beforeEach(() => {
//       // Create a spy for handleAnswer function
//       handleAnswerSpy = cy.spy();
      
//       // Mount NewAnswer component with mock props and spy
//       mount(
//         <NewAnswer
//           qid="456"
//           handleAnswer={handleAnswerSpy}
//           user={mockUser}
//         />
//       );
//     });
  
//     it('calls handleAnswer function when Post Answer button is clicked with valid input', () => {
//       // Enter valid answer text
//       cy.get('#answerTextInput').type('This is a valid answer text');
  
//       // Click the Post Answer button
//       cy.contains('Post Answer').click();
  
//       // Check that handleAnswer function was called
//       cy.wrap(handleAnswerSpy).should('be.calledWith', '456');
//     });
//   });


// it('calls handleAnswer function when Post Answer button is clicked with valid input', () => {
//     const mockUser = { _id: '123', name: 'Test User' }; // Mock user object
    
//     // Mount NewAnswer component with mock props and spy
//     mount(
//       <NewAnswer
//         qid="456"
//         user={mockUser}
//       />
//     );
//     // Enter valid answer text
//     cy.get('#answerTextInput').type('This is a valid answer text');
  
// //     // Click the Post Answer button
//     cy.contains('Post Answer').click();
  
// //     /// Check that postAnswerSpy was called
// //   cy.wrap(postAnswerSpy).should('have.been.called');
//   });



it('calls handleAnswer function when Post Answer button is clicked with valid input', () => {
    const mockUser = { _id: '123', name: 'Test User' }; // Mock user object
    let handleAnswerSpy = cy.spy(); // Initialize handleAnswerSpy as a spy function
  
    // Mount NewAnswer component with mock props and spy
    mount(
      <NewAnswer
        qid="456"
        handleAnswer={handleAnswerSpy}
        user={mockUser}
      />
    );
  

    // Enter valid answer text
    cy.get('#answerTextInput').type('This is a valid answer text');
  
    // Click the Post Answer button
    cy.contains('Post Answer').click().then(() => {
      // Check that handleAnswerSpy was called with the correct arguments
      
    });
  });
  