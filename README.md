# Creatively Named iTunes App

## Features:
* Light / Dark mode
* Works offline using [next-pwa](https://github.com/shadowwalker/next-pwa)
* Search the iTunes api for music and artists, with the ability to "like" songs
* View liked songs in your library
* View artists and their discography
* View a chart of your top genres and top artists
* Firebase authentication and cloud storing of user likes

This project was my first time using Material UI and Next.js, both of which quickly grew on me. I definitely plan on using these technologies in future projects! I really liked Next.js's paging system. While I didn't get the opportunity to use them here, I would have loved to have used other Next features, many of which would suit the project.

Material UI was also really fun to use! With their theming system, I was able to make a light/dark mode with just a couple lines of code

## Screenshots
![Dark mode](https://github.com/will-turner123/itunes-app/blob/main/repo-images/darkmode.gif?raw=true)
Ease your eyes with dark mode!

![Your taste](https://github.com/will-turner123/itunes-app/blob/main/repo-images/taste.png?raw=true)
View your music taste

![Search results](https://github.com/will-turner123/itunes-app/blob/main/repo-images/search.png?raw=true)
Search results. Clicking the name of the song will take you to the album page, clicking the artist will take you to the artist's page

![offline mode](https://github.com/will-turner123/itunes-app/blob/main/repo-images/offlineapp.gif?raw=true)
What I think is probably the coolest part about the app is the fact it still works while the user does not have an internet connection, relying on cached data. 

## Improvements
* Better front-end styling (especially on the login and register page). More interactivity, such as hover effects on cards
* A better solution for storing data. Currently, we store every artist and their discography under local storage. There are a couple reasons for this:
* * iTunes API does not provide the artists profile picture, so we make a request to their iTunes artist page and extract it from the HTML response.
* * Keeps the amount of requests down for improved performance
* * iTunes API has a rate limit of 20 requests per minute which we want to avoid hitting (although there are potential ways to work around this!)
* * Storing a user's liked songs locally is really helpful for our offline data handling. If the user likes or unlikes a song without internet connection, the next successful request to firebase will include all their offline changes.
* This solution does have a few problems, though:
* * If a user views a ton of artists or albums, local storage would become really bloated and take up excessive space on the user's machine.
* * We aren't able to see the newest data on an artist. If they release a new song or album after the user has saved their data to local storage, they wouldn't be able to find it unless they specifically search for it. This could perhaps be worked around by having a timestamp of when the artist's page was last stored and deleting it if x time has passed
* Error handling. The iTunes API will sometimes have missing data. For example, an album will have an artistId yet when you look up the artist by this id there are no results found
* Better responsiveness, especially on the datagrids songs are displayed in. Getting them to look good on smaller screen sizes is a challenge