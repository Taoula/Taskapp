# Libraries
Calendar: https://www.npmjs.com/package/react-awesome-calendar
<br />
Phosophor Icons: https://phosphoricons.com
<br />
Chart.js: https://www.chartjs.org

# Bugs
2. Conditional schedule refresh

# Fixed Bugs
1. logout button stays highlighted after clicking
2. side bar tab highlighting

# Todo (Implement before beta testing)
1. add time editing component to task creation/update menu (exists on updateHours, needs to be refactored)
2. implement time of day into scheduling algorithm
4. redesign & re-implement schedule dashboard
5. create account settings page
6. create a help feature
7. Refactor time to use momentjs instead of Datejs
9. overview page
10. resort schedule
11. display welcome for user's first session & welcome back for every session afterwards
12. set max height for task display fields and add scroll for each field
13. User Statistics & Streaks (front & back end)
14. Tasks completed out of order should float to the top, schedule resort.
15. Optimize Sort & Resort algorithms
16. Calendar view (set events days or weeks ahead of time)
17. Optional productivity value in tasks, task stats
18. sort tasks in task display from newest to oldest by default
19. create and update task form validation

# Todo 2 (Implement before & during beta testing)
1. Google, Apple calendar integration
2. Friend system
3. Schedule sharing between friends
4. Time Finder (will find a time to meet based on two users' schedules)
5. Current Task (will display on overview page based on time of day)
6. Some animation or sound effect when the day is marked as over (think NYT Crossword)
7. Task attachments (e.g. a "pay bills" task might have hotlinks to electric, water, internet company websites)
8. Theme options (light, dark, etc.)

# Todo 3 (Implement during & after beta testing)
1. Linear Regression on user data to provide insights, reccomendations
2. Expand social capabilities of the app
   2a. Users can attach some kind of evidence of their progress upon task completion. Shared with friends as a post on their feed.
   2b. Users can challenge friends to maintain a streak, or put in the most time on a certain task
   2c. Leaderboards based on streaks and/or total task time

# Completed
1. Custom time input component
2. Render time component conditionally with button press (schedule page)
3. Fix time change error on schedule page reload
4. Create task form values reset after submission/cancelation
5. Style time component & edit hours button (paul)
6. use modals for the task creation/update dialogue
7. navbar drop down converted to modal element
8. highlight active tab in the sidebar
9. outlet content scrolls
10. Statistics (task) front end & back end.
11. re-implement task editing with modals

# Optimization
1. use flex to display task fields in task display instead of grid to reduce code redundancy
2. use tailwind for loops to apply the same styles to multiple elements and reduce code redundancy
3. use tailwind to set task color

# Taskapp
## Backend
To run the backend, open the server folder and run the "nodemon server" command
## Frontend
To run the frontend, open the client folder and run the "npm start" command
