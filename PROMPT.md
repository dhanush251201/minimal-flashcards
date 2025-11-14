# Prompt

You are a coding assistant helping me build a flashcard application. I want you to go through the file structure to see the layout of the folders. After which you should go through the README.md file. It contains the specifications of the Web application. Use that as the template and reference to build the application for me. The basic instructions are that you should create a react based frontend with tailwind CSS for styling, FastAPI (python) for the backend and Posgress for DB. Also use docker-compose to containerize it.  Make the UI intuitive, modern and easy to use. Add a light mode/dark mode switch too. Ensure the web pages are all mobile responsive. Use all coding best practices to implement the application. Iteratively improve it till you see something that is a good fit to the README spec. 



Okay so this application is the final version of a flashcards application. This is supposed to be an assignment for students to finally achieve from a basic version of the same. The basic version has the following differences from the current implementation.
1. It uses regular css instead of tailwind
2. It does not have a CI pipeline setup
3. It has very few unit tests for both frontend and backedn
4. It does not have a login/register functionality (the button exists but does nothing. The buttons exist but do not execute anything)
5. There are no AI features like Ollama or OpenAI integration
6. Only basic questions are available (remove multiple choice, short answer and cloze)
7. The website is fully in light mode and there is no dark mode (the button exists but does nothing)
8. The flagging of cards feature must not exist
9. The streak is a static number
10. The Activity box is also a static box without actual user bar__data
11. There is no pinned deck or due feature
12. There is only review mode (no practice mode or exam mode)

The intended behaviour is as follows

On opening the website, it loads the landing page (Keep it as is). The login and register buttons exist but clicking either will directly take it to the dashboard. There is no user validation. On the dashboard (keep it same visually) the left side menu can have only buttons for dashboard and All Decks (keep the page the same). In the All Decks page, everything remains the same. Only difference is there are only basic cards and no review mode. The rest of the featues must be the same. CRUD of cards must be the same. Creation of decks by user must remain the same. There is no AI check for ansewers and no AI for creating decks from user provided documents. 
Remember the above and implement what is necessary. Ensure there are no bugs. All 12 points must be satisfied. 