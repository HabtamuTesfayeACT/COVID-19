# COVID dashbord

## Introduction

Welcome to my web! I am excited to have you here and hope you enjoy your browsing experience. In this README blog, we will provide you with information on what you can expect to find on our web, how to navigate it, and some of the key features that we offer.

## **Getting Started:**

To start browsing our web, simply type[https://habtamutesfayeact.github.io/COVID-19/](https://habtamutesfayeact.github.io/Hotel-Ekub-paring/) or click on the link above. Once you arrive on our homepage, you will be greeted with a clean, simple design that is easy to navigate. 

## Navigation

To navigate simply scroll down since it's a one page dashboard

## How does it work

This is a HTML code for a COVID Information Dashboard. The page includes a header, a navigation bar, and several sections with different types of data and charts related to the COVID pandemic. Some notable features of the page include:

- A mobile navigation toggle button
- A profile section with a logo and the name of the country (Ethiopia)
- A navigation menu with two items: "Cases" and "Status"
- A section displaying the total number of COVID cases, deaths, and recoveries in Ethiopia
- A section displaying a map of the world with COVID data for each country, as well as a search bar to look up individual countries
- A section displaying several charts and graphs with global COVID data
- A table displaying COVID data for all countries, including new and total confirmed cases, deaths, and recoveries.

the  JavaScript code that fetches and displays COVID-19 data from the "**[https://api.covid19api.com/summary](https://api.covid19api.com/summary)**" API. The data is displayed using charts and tables from the Highcharts library. The code also includes a search function that allows users to search for COVID-19 data for a specific country. Here is a brief summary of the code:

- The code starts by declaring several arrays and variables to store COVID-19 data.
- The fetchinfo function fetches COVID-19 data from the "**[https://api.covid19api.com/summary](https://api.covid19api.com/summary)**" API and saves it to localStorage. The data is then parsed and used to display a table of COVID-19 data and several charts.
- The fetchlive function fetches live COVID-19 data for Ethiopia and displays the number of cases on the webpage.
- The storeCountryDate function randomly selects five countries from the COVID-19 data and saves their names, total confirmed cases, total deaths, and new confirmed cases to arrays. These arrays are used to display a chart comparing the total confirmed cases, total deaths, and new confirmed cases for the selected countries.
- The appendDataToTable function appends COVID-19 data to an HTML table.
- The fun function displays a pie chart showing the percentage of COVID-19 data to the world.
- The draw1 function displays a map chart showing the total confirmed cases of COVID-19 for each country.
- The draw4 function displays a chart comparing the total confirmed cases, total deaths, and new confirmed cases for five randomly selected countries.
- The fetchdata function fetches COVID-19 data for South Africa and passes it to the passdata function to display a chart comparing the number of confirmed cases, deaths, recovered cases, and active cases for South Africa.
- The compare function displays a chart comparing the number of confirmed cases, deaths, recovered cases, and active cases for a specific country.
- The drawSearch function fetches COVID-19 data for a country entered by the user in a search bar and displays a chart comparing the number of confirmed cases, deaths, recovered cases, and active cases for that country.
- The code ends with a function that handles toggling the navbar.

## Conclusion

We hope that this README blog has been helpful in providing you with an overview of our web and what you can expect to find here. If you have any questions or feedback, please don't hesitate to get in touch with us. We are always happy to hear from our visitors and are committed to providing you with the best browsing experience possible. Thanks for visiting our web, and we look forward to seeing you again soon!
