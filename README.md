# to-do-app
to do app project 

*feature:
-adding project 
    -can add to dos and notes inside a project
-data persistance (data is saved in localStorage)
-to do states and properties for sorting and filtering
-to do states pages

tools used:
-webpack bundler
-npm 
-date-fns library
-vanilla html, css and js
-es6module

hardest project made yet.

live: https://guesswhojustme.github.io/to-do-app/

want to understand how the code works? this is the best i can explain it:
(I wrote most of them myself. this shi aint vibe coded, i swear)
project design:

*how creating a project works and creating a todo and note data inside of it:
-project tab -> project page -> (todopage -> createToDoModal) -> todocard -> todoData 
 (once you create a project, the project tab passes its id to each one of this modules forming a chain,
  so each module is basically dependent to the project tab or specifically its id)
-project tab -> project page -> notepage -> notecard
 (same logic, but theres is no modal that is appearing,)
