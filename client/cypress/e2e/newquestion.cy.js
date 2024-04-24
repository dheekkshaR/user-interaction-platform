describe('New Question Form', () => {
    beforeEach(() =>{
        cy.exec("node ../server/populate_db.js mongodb://127.0.0.1:27017/fake_so");
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#username').type('alice123');
        cy.get('#password').type('password123');
        cy.contains('button','Login').click();
    })

    afterEach(() => {
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
      });
    
    it('Ask a Question creates and displays in All Questions', () => {

        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript');
        // cy.get('#formUsernameInput').type('joym');
        cy.contains('Post Question').click();
        cy.contains('Fake Stack Overflow');
        const qTitles = ['Test Question 1', 'Quick question about storage on android', 'Object storage for a web application', 'android studio save string shared preference', 'Programmatically navigate using React router'];
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        });
    })
});

describe('New Question Form Metadata', () => {

    beforeEach(() =>{
        cy.exec("node ../server/populate_db.js mongodb://127.0.0.1:27017/fake_so");
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#username').type('alice123');
        cy.get('#password').type('password123');
        cy.contains('button','Login').click();
    })

    afterEach(() => {
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
      });

    it('Ask a Question creates and displays expected meta data', () => {

        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript');
        cy.contains('Post Question').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('5 questions');
        cy.contains('alice123 asked 0 seconds ago');
        const answers = ['0 answers', '3 answers','2 answers'];
        const views = ['0 views', '121 views','10 views'];
        // cy.get('.postStats').each(($el, index, $list) => {
        //     cy.wrap($el).should('contain', answers[index]);
        //     cy.wrap($el).should('contain', views[index]);
        // });
        cy.contains('Unanswered').click();
        cy.get('.postTitle').should('have.length', 1);

    })
})

describe('New Question Form with many tags 1', () => {
    beforeEach(() =>{
        cy.exec("node ../server/populate_db.js mongodb://127.0.0.1:27017/fake_so");
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#username').type('alice123');
        cy.get('#password').type('password123');
        cy.contains('button','Login').click();
    })

    afterEach(() => {
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
      });
    it('Ask a Question creates and displays in All Questions with necessary tags', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript t1 t2');
        cy.contains('Post Question').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('javascript');
        cy.contains('t1');
        cy.contains('t2');
    })
})



describe('New Question Form Error Empty Title', () => {

    

    beforeEach(() =>{
        cy.exec("node ../server/populate_db.js mongodb://127.0.0.1:27017/fake_so");
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#username').type('alice123');
        cy.get('#password').type('password123');
        cy.contains('button','Login').click();
    })

    afterEach(() => {
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
      });

    it('Ask a Question with empty title shows error', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript');

        cy.contains('Post Question').click();
        cy.contains('Title cannot be empty');
    })
})

describe('New Question Form Error Long Title', () => {
    beforeEach(() =>{
        cy.exec("node ../server/populate_db.js mongodb://127.0.0.1:27017/fake_so");
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#username').type('alice123');
        cy.get('#password').type('password123');
        cy.contains('button','Login').click();
    })

    afterEach(() => {
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
      });
    it('Ask a Question with long title shows error', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript');

        cy.contains('Post Question').click();
        cy.contains('Title cannot be more than 100 characters');
    })
});

describe('New Question Form Error Empty Text', () => {
    beforeEach(() =>{
        cy.exec("node ../server/populate_db.js mongodb://127.0.0.1:27017/fake_so");
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#username').type('alice123');
        cy.get('#password').type('password123');
        cy.contains('button','Login').click();
    })

    afterEach(() => {
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
      });
    it('Ask a Question with empty text shows error', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTagInput').type('javascript');

        cy.contains('Post Question').click();
        cy.contains('Question text cannot be empty');
    })
});

describe('New Question Form Error Extra Tags', () => {
    beforeEach(() =>{
        cy.exec("node ../server/populate_db.js mongodb://127.0.0.1:27017/fake_so");
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#username').type('alice123');
        cy.get('#password').type('password123');
        cy.contains('button','Login').click();
    })

    afterEach(() => {
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
      });
    it('Ask a Question with more than 5 tags shows error', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('t1 t2 t3 t4 t5 t6');

        cy.contains('Post Question').click();
        cy.contains('Cannot have more than 5 tags');
    })
});

describe('New Question Form Error Long New Tag', () => {
    beforeEach(() =>{
        cy.exec("node ../server/populate_db.js mongodb://127.0.0.1:27017/fake_so");
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#username').type('alice123');
        cy.get('#password').type('password123');
        cy.contains('button','Login').click();
    })

    afterEach(() => {
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
      });
    it('Ask a Question with a long new tag', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('t1 t2 t3t4t5t6t7t8t9t3t4t5t6t7t8t9');

        cy.contains('Post Question').click();
        cy.contains('New tag length cannot be more than 20');
    })
});
