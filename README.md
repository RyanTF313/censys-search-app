# Censys Search App

This is a clone of the Censys search application that allows you to search a host name. Original found here: https://search.censys.io/search?resource=hosts

## Goals

- A text field to enter a plain-text search query
- A list of results that simply displays the IP address and number of protocols associated with each result
- A button/link to append the next page of results for the given query

### Technology used:

- React
  - Hooks (useState, useEffect, UseContext, etc.)
  - react-paginate
  - react-router-dom
- CSS
- HTML
- Axios

## How to run:

- Register for an account at 
- Clone this repo
- run `npm install`
- Create Env with these variables
  - VITE_CENSYS_API_URL
  - VITE_CENSYS_SEARCH_ENDPOINT
  - VITE_CENSYS_API_ID
  - VITE_CENSYS_SECRET
- run `npm run dev`
  - App will run at: http://localhost:5174/
- Enjoy!


Note: Bootstrapped using Vite