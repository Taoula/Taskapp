# Libraries

Phosophor Icons: https://phosphoricons.com
<br />
Chart.js: https://www.chartjs.org
<br />
HeadlessUI: https://headlessui.com/react/combobox
<br />
Popper.js: https://popper.js.org
<br />
Day.js: https://www.npmjs.com/package/dayjs
<br />
Framer Motion: https://www.framer.com/motion/
<br />
TailwindCSS: https://tailwindcss.com
<br />
Zutstand

# Bugs

1. Set time toggle stays active and doesn't disable when the create task slideover is closed

# Fixed Bugs

1. logout button stays highlighted after clicking
2. side bar tab highlighting
3. Conditional schedule refresh
4. "no inactive tasks" message doesn't appear in the field when tasks are deleted. Works fine when tasks are toggled between active and inactive.

# Todo (Implement before beta testing)

1. redesign & re-implement schedule dashboard
2. create a help feature
3. overview page
4. ~~display welcome for user's first session & welcome back for every session afterwards~~
5. Tasks completed out of order should float to the top, schedule resort.
6. Clean up functions on login (if it is a new day)

## Landing page

1. ~~make landing page responsive~~
2. ~~auto-scroll on nav link click~~
3. ~~make sign up & login pages responsive~~

## Login page

1. ~~front end validation~~
2. back end validation
3. ~~responsive~~
4. ~~return error if no inputs are passed or incorrect info is passed~~
5. reset password

## Sign up page

1. ~~front end validation~~
2. back end validation
3. ~~responsive~~
4. ~~progress bar~~
5. select plan
6. 2FA/verify email
7. payment

## Sorting Algorithm

1. Add a better free time system to sorting algorithm (divided somewhat equally throughout day)
2. Implement chained tasks

## Schedule Page

1. Clean up functions on day completion (mark all tasks as incomplete. Empty Schedule.
2. Render "call it a day" button conditionally on task completion or nearing end hours

## Statistics

2. Optional productivity value in tasks, task stats
3. Add time completed to task stats
4. Scatterplots between productivity & duration, productivity & time of day
5. Custom task stats
6. Possible metrics to measure - https://www.activtrak.com/solutions/productivity-management/productivity-metrics/#metrics
7. Burnup charts

## Tasks Page

1. ~~Search bars in task display to search for specific task~~
2. ~~Filters~~
3. ~~sort tasks in task display from newest to oldest by default~~
4. create and update task form validation
5. ~~Set fixed height for task displays and implement scrolling~~
6. ~~display text in field if there are no tasks to display~~

## Account settings pages

1. ~~populate fields with current values~~
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
5. Some animation or sound effect when the day is marked as over (think NYT Crossword)
6. Theme options (light, dark, etc.)
7. Refactor time to use dayjs instead of Datejs (started)

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
15. Add fixed time editing to update task form
16. Set events days or weeks ahead of time, schedule several days in advance
17. Fix the buggy time editing component in task form
18. Current Task (will display on overview page based on time of day)
19. Task attachments (e.g. a "pay bills" task might have hotlinks to electric, water, internet company websites)

# Optimization

1. use flex to display task fields in task display instead of grid to reduce code redundancy
2. use tailwind for loops to apply the same styles to multiple elements and reduce code redundancy
3. use tailwind to set task color

# Taskapp

## Backend

To run the backend, open the server folder and run the "nodemon server" command

## Frontend

To run the frontend, open the client folder and run the "npm start" command
