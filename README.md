##  Install dependencies (run BOTH)
```powershell
# In repo root
npm install
run dev
```

## Questions
```
1. can/should the user be allowed to created cases?
```

## Features/comments

- Wanted to be sure to compartmentalize some logic like the modals the status badge, this just seems like good practice and makes it easier for feature implementation down the road. Anything that that was either utilized more than once or was a large function, was made into its own file and called upon.

- opted to use a modal to view case details, the sidebar left a lot of empty space. Having the modal in the center of the screen seemed more appropriate for the amount of detail shown.

- I also added a confirmation modal, that way the user knows the case was submitted and are brought back to the main page automatically.