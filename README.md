# Libraries
Calendar: https://www.npmjs.com/package/react-awesome-calendar
<br />
Phosophor Icons: https://phosphoricons.com
<br />
Chart.js: https://www.chartjs.org
<br />
HeadlessUI: https://headlessui.com/react/combobox

# Bugs
2. Conditional schedule refresh
3. text field message doesn't display after tasks are deleted

# Fixed Bugs
1. logout button stays highlighted after clicking
2. side bar tab highlighting

# Todo (Implement before beta testing)
1. redesign & re-implement schedule dashboard
2. create a help feature
3. overview page
4. display welcome for user's first session & welcome back for every session afterwards
5. Tasks completed out of order should float to the top, schedule resort.
6. Calendar view (set events days or weeks ahead of time, schedule several days in advance)
7. Clean up functions on login (if it is a new day)


## Sorting Algorithm
1. Add a better free time system to sorting algorithm (divided somewhat equally throughout day)
2. Implement chained tasks
3. Add resort (shaving) functionality to revised sorting algorithm.

## Schedule Page
1. Clean up functions on day completion (mark all tasks as incomplete. Empty Schedule.
2. Render "call it a day" button conditionally on task completion or nearing end hours

## Time Component
1. Fix the buggy time editing component in task form
2. Add fixed time editing to update task form

## Statistics
2. Optional productivity value in tasks, task stats
3. Add time completed to task stats
4. Scatterplots between productivity & duration, productivity & time of day
5. Custom task stats

## Tasks Page
1. Search bars in task display to search for specific task
2. Apply tags to tasks for specific focuses (work, school, etc.)
3. Filters for tags
5. sort tasks in task display from newest to oldest by default
6. create and update task form validation
7. multiselect tasks

## Completed Task Page To-Do
1. Set fixed height for task displays and implement scrolling
2. display text in field if there are no tasks to display

## Account settings pages
1. populate fields with current values
2. implement update values
3. implement change password
4. Upload profile picture
5. Change profile picure
6. Write user patch function to update account information

# Todo 2 (Implement before & during beta testing)
1. Google, Apple calendar integration
2. Friend system
3. Schedule sharing between friends
4. Time Finder (will find a time to meet based on two users' schedules)
5. Current Task (will display on overview page based on time of day)
6. Some animation or sound effect when the day is marked as over (think NYT Crossword)
7. Task attachments (e.g. a "pay bills" task might have hotlinks to electric, water, internet company websites)
8. Theme options (light, dark, etc.)
9. Refactor time to use momentjs instead of Datejs

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
12. add time editing component to task creation/update menu (exists on updateHours, needs to be refactored)
13. implement time of day into scheduling algorithm
14. User Statistics & Streaks (front & back end)

# Optimization
1. use flex to display task fields in task display instead of grid to reduce code redundancy
2. use tailwind for loops to apply the same styles to multiple elements and reduce code redundancy
3. use tailwind to set task color

# Taskapp
## Backend
To run the backend, open the server folder and run the "nodemon server" command
## Frontend
To run the frontend, open the client folder and run the "npm start" command
