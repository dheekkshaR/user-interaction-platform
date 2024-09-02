# User Interaction platform - twitter clone
Documentation: The essential features required by feature engineering:	

## Viewposts
Can view all posts in the DB, can view details of a single post on clicking on it.
Can be filtered by unanswered, active, ordered by newest.
Server endpoint: /question/getQuestion, question/getQuestionById/:qid
Path to the e2e test file: client/cypress/e2e/home.cy.js
Path to the component test: client/cypress/component/question_page.cy.js
Path to server endpoint jest test: server/tests/questionForProfile.test.js
 	
## Create new posts
Ensures logged in users can create a new post by entering title, text and tags. ( If Guest clicks, redirected to login.)
Server endpoint: /question/addQuestion
Path to the e2e test file: client/cypress/e2e/newquestion.cy.js
Path to the component test: client/cypress/component/new_question.cy.js
Path to server endpoint jest test: server/tests/newQuestion.test.js

## Search for existing posts.
Search by typing in search bar, both tags and post titles.
Server endpoint: /question/getQuestion
Path to the e2e test file: client/cypress/e2e/search.cy.js
Path to the component test: client/cypress/component/header.cy.js
Path to server endpoint jest test: server/tests/getquestionbyid.test.js

## Commenting on posts.
Logged in users can comment on a post.( If Guest clicks, redirected to login.)
Server endpoint: answer/addAnswer
Path to the e2e test file: client/cypress/e2e/newanswer.cy.js
Path to the component test: client/cypress/component/new_answer.cy.js
Path to server endpoint jest test: server/tests/newAnswer.test.js

## Voting on posts.
Logged in users can see the thumbs up and down symbols. Clicking on up increases upvotes by 1, clicking on it again undoes the upvote, if the user has previously downvoted, the downvote gets deleted and upvote is added.
Similarly for downvotes too.
Same functionality added to answers as well, so users can up and downvote the answers to judge how useful it is.
Server endpoint: /question/upvoteQuestion, /question/downvoteQuestion,
/answer/upvoteAnswer, /answer/upvoteAnswer
Path to the e2e test file: client/cypress/e2e/voteonposts.cy.js
Path to the component test: client/cypress/component/answer_page.cy.js
Path to server endpoint jest test: server/tests/votingOnAnswer.test.js

## Tagging posts.
While creating a post tag is added. Tags page displays tag with number of questions which are tagged with that tag. Clicking on the tag displays questions page filtered by that tag. 
Server endpoint: tags/getTagsWithQuestionNumber
Path to the e2e test file: client/cypress/e2e/tags.cy.js
Path to the component test: client/cypress/component/tag_page.cy.js
Path to server endpoint jest test: server/tests/tags.test.js

## User profiles.
Register enables a new profile to be created with username, password, name, age, bio.
Only logged in users can view this tab option on the sidenavbar below tags.
Clicking on profile displays all you details like bio.
Profile also displays all your own posts below that.
Server endpoint: user/loginUser, user/addNewUser, question/getQuestionsByUser/:author
Path to the e2e test file: client/cypress/e2e/userprofile.cy.js
Path to the component test: client/cypress/component/profile_page.cy.js
Path to server endpoint jest test: server/tests/getUsers.test.js

## Post moderation. 
All types of users have the option to flag any post they want to flag.
Normal/admin users cannot see if a (any) post is flagged or not previously.
Moderators have another option after newest, active and unanswered called FLAGGED to view all flagged posts. 
Moderators also see 2 options for flagged posts: approve, delete. 
If they approve, the post gets flagged set to 0 and it disappears from the flagged list.
If they reject/delete the post gets deleted from the database.
Server endpoint: /question/moderatorAccept/:qid , /question/reportQuestion/:qid
Path to the e2e test file: client/cypress/e2e/postmoderation.cy.js
Path to the component test: client/cypress/component/side_bar.cy.js
Path to server endpoint jest test: 						
	
## Deleting post.
If the post is your own post, the option is visible to you. (eg users(author) can go to their profile and delete their post, or even delete it from the allQuestions main page)
Deletes the post from the database.
Server endpoint: /question/deleteQuestion/:qid

## Admin functionality.
Admin has another tab below tags and profile on the sidenavbar: called admin functionality. On clicking: Admin can see all users and the type of user they are. 
They have an option to select the user and set what type of access they have.
(eg admin can see Sam is a regular user and change that to moderator or admin)
Changes the type of user privilege of the selected user in the DB.
Server endpoint: user/getAllUsers, user/editUserType
Path to the test:client/cypress/component/admin_page.cy.js
