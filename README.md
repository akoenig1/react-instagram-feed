react-instagram-feed is a simple, barebones React.js component that performs an API
call to the Instagram API in order to fetch a given users Instagram media/data.

Inspired by Instafeed.js, react-instagram-feed was built to be a more straightforward
alternative for React Apps than what seems to be currently available in the open source
community. This React component is meant to get you up and running with instagram photos
pulled into your app as quickly as possible during development. Provide it with an 
Instagram User ID number and an Instagram API Access Token and you will have an Instagram
feed pulled into your React App in minutes. react-instagram-feed is built to be as 
simple as possible to get users up and running with the Instagram API, and leaves as
much flexibility and customizeability to the user as possible. Users are encouraged to 
alter the fields/data requested from the Instagram API, change the number of media loaded
(and how its loaded) on each render, and update the template the media is loaded into. 

react-instagram-feed is purely a development tool at this time. It is not recommended to
use the current version in production as the API Access Token is currently left visibile
in a React App. The API call from react-instagram feed should be moved to the backend of
your app in order to reduce this vulnerability. Future versions of react-instagram-feed
will patch this vulnerability and offer a secure method for making the API call in your
React App.