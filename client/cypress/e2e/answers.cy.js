describe('Answer Page 1', () => {
    it('Answer Page displays expected header', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Programmatically navigate using React router').click();
        cy.get('#answersHeader').should('contain', 'Programmatically navigate using React router');
        cy.get('#answersHeader').should('contain', '2 answers');
        cy.get('#answersHeader').should('contain', 'Ask a Question');
        cy.get('#sideBarNav').should('contain', 'Questions');
        cy.get('#sideBarNav').should('contain', 'Tags');
    })
})

// describe('Answer Page 2', () => {
//     it('Answer Page displays expected question text', () => {
//         const text = "the alert shows the proper index for the li clicked, and when I alert the variable within the last function I'm calling, moveToNextImage(stepClicked), the same value shows but the animation isn't happening. This works many other ways, but I'm trying to pass the index value of the list item clicked to use for the math to calculate.";
//         cy.visit('http://localhost:3000');
//         cy.contains('Programmatically navigate using React router').click();
//         cy.get('#questionBody').should('contain', '11 views');
//         cy.get('#questionBody').should('contain', text);
//         cy.get('#questionBody').should('contain', 'JoJi John');
//         cy.get('#questionBody').should('contain', 'Dec 17, 2020');
//         cy.get('#questionBody').should('contain', '3:24');
//     })
// })

// describe('Answer Page', () => {
//     it('displays the expected question details', () => {
//         const text = "the alert shows the proper index for the li clicked, and when I alert the variable within the last function I'm calling, moveToNextImage(stepClicked), the same value shows but the animation isn't happening. This works many other ways, but I'm trying to pass the index value of the list item clicked to use for the math to calculate.";
        
//         // Visit the page and navigate to a specific question
//         cy.visit('http://localhost:3000');
//         cy.contains('Programmatically navigate using React router').click();

//         // Assert the question details
//         cy.get('.questionBody').should('contain', '11 views'); // Assuming class name is 'questionBody'
//         cy.get('.questionBody').should('contain', text);
//         cy.get('.question_author').should('contain', 'JoJi John'); // Assuming class name is 'question_author'
//         cy.get('.answer_question_meta').should('contain', 'Dec 17, 2020'); // Assuming class name is 'answer_question_meta'
//         cy.get('.answer_question_meta').should('contain', '3:24'); // Assuming class name is 'answer_question_meta'

//     })
// })

describe('Answer Page 3', () => {
    it('Answer Page displays expected answers', () => {
        const answers = ["React Router is mostly a wrapper around the history library.", "On my end, I like to have a single history object that I can carry even outside components."];
        cy.visit('http://localhost:3000');
        cy.contains('Programmatically navigate using React router').click();
        cy.get('.answerText').each(($el, index) => {
            cy.wrap($el).should('contain', answers[index]);
        });
    });
});

// describe('Answer Page 4', () => {
//     it('Answer Page displays expected authors', () => {
//         const authors = ['hamkalo', 'azad'];
//         const date = ['Mar 02','Jan 31'];
//         const times = ['15:30','15:30'];
//         cy.visit('http://localhost:3000');
//         cy.contains('Programmatically navigate using React router').click();
//         cy.get('.answerAuthor').each(($el, index) => {
//             cy.wrap($el).should('contain', authors[index]);
//             cy.wrap($el).should('contain', date[index]);
//             cy.wrap($el).should('contain', times[index]);
//         });
//     });
// });
