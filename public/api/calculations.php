/*

Objective: Run calculations based on the databases' most up to date comparables funding information

We would retrieve the comparable IDs from the projects_comparables table and then grab all of the comparable pictures related to that project
    We would then run the calculations on the server and return an object to the client with all of the most up to date information regarding funding, pictures, inflation
    This object still needs to be completely created based on the calculations that need to be made.

The data would not need to be sanitized other than making sure the id of the project is valid.

*/