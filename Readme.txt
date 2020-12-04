Teculescu Octavian-Alexandru (SSA1-B)
==================================================================

            Taskboard (Trello clone)

==================================================================

        Architecture

    I decided to use PostgreSQL instead of MongoDB as i am more
comfortable with relational databases. I used a docker container
initialized with the basic schema of the project database,
describing the model entities and their interactions  at a basic
level.

For the API, i used Node.js & Express, plus some scrippets from
my Web Programming course from 4th year. The backend exposes
a few basic CRUD endpoints and uses no authorization system.

For the UI, i used Vue.js with Vue-Bootstrap to get faster results.
I left the Vue logo on each page in order to add a bit of color,
as the page style itself is less than minimalist.

==================================================================

        Run instructions

    Start the postgres container using the docker-compose file
found in the /api directory. Start the API from /api and
the UI from /ui using 'npm run start' for both.

==================================================================

        Implementation

    Feature 1:
On the home page (/), the grid of boards should be displayed,
with the button to delete a board and the link to the board page.
Changing name of the board is possible only from the board page itself.
There is a small form for creating new boards at the bottom of the grid.

    Feature 2:
Using the link of a board from the home page, we can accest the board
page. Here we should be able to rename and delete lists. We also have
an option (as a form in the last column) to create new lists.

    Feature 3:
We can create a new card using the link presented at the bottom of each list.
After creating a new card, we have the option to delete it, edit it, move it
to other list or simply open it in a read only modal in order to scroll to
long blocks of text.