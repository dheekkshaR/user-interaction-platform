import Tag from '../../src/components/main/tagPage/tag';
import TagPage from '../../src/components/main/tagPage'
import { mount } from 'cypress/react18'

// // Tag Component
// it('Rendering Tag Component', () => {
//     const tag = {tid : 1, name : 'Sample Tag '}
//     const getQuestionCountByTag = (id) => id
//     const clickTag = (name) => console.log('Clicked on clickTag '+name)
    
//     cy.window().then((win) => {
//         cy.spy(win.console, 'log').as('consoleLogSpy');
//     });  
    
//     cy.mount(<Tag 
//         t={tag} 
//         getQuestionCountByTag={getQuestionCountByTag}
//         clickTag={clickTag}
//         />)
//     cy.get('.tagNode > .tagName').contains(tag.name)
//     cy.get('div.tagNode').invoke('text').then((text) => {
//         expect(text).to.equal(tag.name + getQuestionCountByTag(tag.tid) + ' questions');
//       })
// })

// // Tag Page Component
// it('Rendering Tag Page Component', () => {
//     const tag1 = {tid : 1, name : 'Sample Tag 1'}
//     const tag2 = {tid : 2, name : 'Sample Tag 2'}
//     const tlist = [tag1, tag2]
//     const getQuestionCountByTag = (id) => id
//     const clickTag = (name) => console.log('Clicked on clickTag '+name)
//     const onClickText = 'Ask a question'
//     const handleNewQuestion = () => console.log(onClickText)
//     cy.window().then((win) => {
//         cy.spy(win.console, 'log').as('consoleLogSpy');
//     });  
    
//     cy.mount(<TagPage 
//         tlist={tlist} 
//         getQuestionCountByTag={getQuestionCountByTag}
//         clickTag={clickTag}
//         handleNewQuestion = {handleNewQuestion}/>)
//     cy.get('.bold_title').contains(tlist.length + ' Tags')
//     cy.get('.bluebtn').click()
//     cy.get('@consoleLogSpy').should('have.been.called');
//     cy.get('@consoleLogSpy').then(consoleLogSpy => {
//       expect(consoleLogSpy).to.have.been.calledWith(onClickText);
//     });
//     cy.get('.tagNode > .tagName').contains(tag1.name)
//     cy.get('.tagNode > .tagName').contains(tag2.name)
//     cy.get('div.tagNode').invoke('text').then((text) => {
//         expect(text).to.equal(tag1.name + getQuestionCountByTag(tag1.tid) + ' questions' + tag2.name + getQuestionCountByTag(tag2.tid) + ' questions');
//       })
// })



describe('TagPage Component', () => {
    it('renders TagPage component with correct props', () => {
      // Mock props for the TagPage component
      const props = {
        clickTag: cy.stub().as('clickTag'),
        handleNewQuestion: cy.stub().as('handleNewQuestion'),
      };
  
      // Mount the TagPage component with mocked props
      mount(<TagPage {...props} />);
  
      // Assertions for the TagPage component
      cy.contains('.bold_title', '0 Tags');
      cy.get('.tagNode').should('not.exist');
  
      // Check if handleNewQuestion is called when the "Ask a Question" button is clicked
      cy.contains('Ask a Question').click();
      cy.get('@handleNewQuestion').should('have.been.calledOnce');
    });
  });


describe('Tag Component', () => {
    it('renders Tag component with correct props', () => {
      // Mock props for the Tag component
      const props = {
        t: { tid: 1, name: 'Sample Tag' },
        getQuestionCountByTag: cy.stub().as('getQuestionCountByTag'),
        clickTag: cy.stub().as('clickTag'),
      };
  
      // Mount the Tag component with mocked props
      mount(<Tag {...props} />);
  
      // Assertions for the Tag component
      cy.get('.tagName').contains('Sample Tag');
    //   cy.get('.tagNode').invoke('text').then((text) => {
    //     expect(text).to.equal('Sample Tag1 questions');
    //   });
  
      // Check if clickTag is called when the tag button is clicked
      cy.get('.tagName').click();
      cy.get('@clickTag').should('have.been.calledOnce');
    });
  });