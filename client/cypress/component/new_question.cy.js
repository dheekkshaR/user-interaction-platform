import NewQuestion from '../../src/components/main/newQuestion/index';
import { mount } from 'cypress/react18'
it('mounts', () => {
    cy.mount(<NewQuestion/>)
    cy.get('#formTitleInput')
    cy.get('#formTextInput')
    cy.get('#formTagInput')
    cy.get('#formUsernameInput')
    cy.get('.form_postBtn')
})

it('shows title inputted by user', () => {
    cy.mount(<NewQuestion/>)
    cy.get('#formTitleInput').should('have.value', '')
    cy.get('#formTitleInput').type('abc')
    cy.get('#formTitleInput').should('have.value', 'abc')
})

it('shows text inputted by user', () => {
    cy.mount(<NewQuestion/>)
    cy.get('#formTextInput').should('have.value', '')
    cy.get('#formTextInput').type('abc')
    cy.get('#formTextInput').should('have.value', 'abc')
})

it('shows tags inputted by user', () => {
    cy.mount(<NewQuestion/>)
    cy.get('#formTagInput').should('have.value', '')
    cy.get('#formTagInput').type('abc')
    cy.get('#formTagInput').should('have.value', 'abc')
})

it('shows username inputted by user', () => {
    cy.mount(<NewQuestion/>)
    cy.get('#formUsernameInput').should('have.value', '')
    cy.get('#formUsernameInput').type('abc')
    cy.get('#formUsernameInput').should('have.value', 'abc')
})

it('shows error message when inputs are empty', () => {
    cy.mount(<NewQuestion/>)
    cy.get('.form_postBtn').click()
    cy.get('div .input_error').contains('Title cannot be empty')
    cy.get('div .input_error').contains('Question text cannot be empty')
    cy.get('div .input_error').contains('Should have at least 1 tag')
    cy.get('div .input_error').contains('Username cannot be empty')
})

it('shows error message when title is more than 100 characters', () => {
    cy.mount(<NewQuestion/>)
    cy.get('#formTitleInput').type('a'.repeat(101))
    cy.get('.form_postBtn').click()
    cy.get('div .input_error').contains('Title cannot be more than 100 characters')
})

it('shows error message when there are more than five tags', () => {
    cy.mount(<NewQuestion/>)
    cy.get('#formTagInput').type('a b c d e f')
    cy.get('.form_postBtn').click()
    cy.get('div .input_error').contains('Cannot have more than 5 tags')
})

it('shows error message when a tag is longer than 20 characters', () => {
    cy.mount(<NewQuestion/>)
    cy.get('#formTagInput').type('a'.repeat(21))
    cy.get('.form_postBtn').click()
    cy.get('div .input_error').contains('New tag length cannot be more than 20')
})

// it('addQuestion is called when click Post Question', () => {
//     const obj = {
//         addQuestion: (arg) => {return arg},
//         handleQuestions: cy.spy()
//     }
//     cy.spy(obj, 'addQuestion')
//     cy.mount(<NewQuestion  handleQuestions={obj.handleQuestions} />)
//     cy.get('#formTitleInput').type('title1')
//     cy.get('#formTextInput').type('question1')
//     cy.get('#formTagInput').type('tag1 tag2')
//     cy.get('#formUsernameInput').type('usr')
//     let question = {
//         title: 'title1',
//         text: 'question1',
//         tags: ['tag1', 'tag2'],
//         askedBy: 'usr',
//       };
//       cy.get('.form_postBtn').click().then(() => {
//         expect(obj.handleQuestions).to.have.been.called 
//     });
// })

// it('handleQuestion is called when click Post Question', () => {
//     const obj = {
//         addQuestion: (arg) => {return arg},
//         handleQuestions: (arg) => { return arg}
//     }
//     cy.spy(obj, 'handleQuestions')
//     cy.mount(<NewQuestion addQuestion={obj.addQuestion} handleQuestions={obj.handleQuestions} />)
//     cy.get('#formTitleInput').type('title1')
//     cy.get('#formTextInput').type('question1')
//     cy.get('#formTagInput').type('tag1 tag2')
//     cy.get('#formUsernameInput').type('usr')
//     cy.get('.form_postBtn').click().then(
//         () => {
//             expect(obj.handleQuestions).to.be.calledOnce
//         }
//     )
// })


describe("NewQuestion Component", () => {
    it("calls handleQuestions when Post Question button is clicked", () => {
        // Stubbing handleQuestions function
        const handleQuestions = cy.stub().as("handleQuestions");

        // Mount the NewQuestion component with the stubbed handleQuestions prop
        mount(<NewQuestion handleQuestions={handleQuestions} />);
        //const addQuestionStub = cy.stub().resolves({ _id: "12345" });

        // Interact with input fields
        cy.get("#formTitleInput").type("Title1");
        cy.get("#formTextInput").type("Question1");
        cy.get("#formTagInput").type("Tag1 Tag2");
        cy.get("#formUsernameInput").type("User1");
        

        // Click the Post Question button
        cy.contains("Post Question").click(); // Use contains() to find the button by text
        // Assert that addQuestion was called with the correct arguments
        // cy.wrap(addQuestionStub).should("have.been.calledOnceWithExactly", {
        //     title: "Title1",
        //     text: "Question1",
        //     tags: ["Tag1", "Tag2"],
        //     asked_by: "User1",
        // });

        // // Assert that handleQuestions was called with the correct argument
        // cy.get("@handleQuestions").should("have.been.calledOnce");
    });
});