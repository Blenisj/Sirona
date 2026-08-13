##  Install dependencies
```powershell
npm install
run dev
```

## Questions

Q. can/should the user be allowed to created cases?
A.created refresh and new assignment buttons just to fill up space, no function

Q. should the initial sorting when the page is loaded be based on ID, patient name, or study date? 
A. sorted by studyDate

## Features/comments

- Wanted to be sure to compartmentalize some logic like the modals the status badge, this just seems like good practice and makes it easier for feature implementation down the road. Anything that that was either utilized more than once or was a large function, was made into its own file and called upon.

- opted to use a modal to view case details, the sidebar left a lot of empty space. Having the modal in the center of the screen seemed more appropriate for the amount of detail shown.

- I also added a confirmation modal, that way the user knows the case was submitted and are brought back to the main page automatically.

- Added the column sorting feature. I also added a new case in the JSON file that wasn't in the original tro verify that the sorting for the date was functioning properly rather than sorting alphabetically by the month.

- one thing I noticed is many variables are defined as "any", I know this is not desirable but for the sake of the task figured it's okay. But i thought it was worth mentioning

- I would have opted to use bootstrap CSS so that the css is much simpler, but I was unsure how long the task would take and didn't want to allocate too much time to setting it up. nearly all css was AI assisted for the sake of efficiency.