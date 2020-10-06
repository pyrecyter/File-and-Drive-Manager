# File and Event Manager

## Introduction
###### This application uses Google OAuth to gain access to Drive and Calendar
###### You Can Do the Following by this application,
 -  Read, Create, Delete and Download Drive Files
 -  Read, Create, Delete and View Calendar Events
 
##  How to Use
###### There is a hosted application you can access those in,
 -  [Frontend](https://oauth-application-289619.firebaseapp.com)
 - [Backend](https://us-central1-oauth-application-289619.cloudfunctions.net/api)

###### If you want to use this you can clone this to your local directory first then you have to get  the credentials file from GCP

### Get The Credentials File
- Log in to [Google Cloud Platform](https://console.cloud.google.com)
- Create or Select a Project
- Goto APIs and Services > Credentials
- Create OAuth consent screen
- Create OAuth Client ID
- Your React application will run on port 3000 so give redirect url as http://localhsot:3000 and for the origin http://localhost:5000
- Download the credentials file and rename it as credentials.json and put it in the root directory of the project

### Insatall Packages
###### open a terminal in the root directory and type the following commands (you need to have node installed)
`npm i` 
`cd .\frontend\oauth-fend\`
`npm i`

### Run the application
`npm run dev`

## API References
| Method  | API                  | Usage                                            | Body Parameters                                                                                                                                                                     | Response                                          |
|---------|----------------------|--------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------|
| GET     | /auth/oauth          | get the URL for complete the OAuth process       | -                                                                                                                                                                                   | status : 200 data : action  URL                   |
| POST    | /auth/validate       | validate the code and retrieve access token      | code:”Code Received from OAuth”                                                                                                                                                     | status : 200 data : access token                  |
| POST    | /user/getUserInfo    | get the current users Google profile information | token: {access token}                                                                                                                                                               | status : 200 data : profile information           |
| POST    | /drive/getFiles      | get the files information in drive               | token: {access token}                                                                                                                                                               | status : 200 data : files Informations JSON array |
| POST    | /drive/download/:id  | download the file mentioned by the id            | token: {access token}                                                                                                                                                               | status : 200 data : file (Stream)                 |
| POST    | /drive/delete/:id    | delete the file mentioned by the id              | token: {access token}                                                                                                                                                               | status : 200                                      |
| POST    | /drive/upload        | upload a file to drive                           | form :- { token: {access token} file : file }                                                                                                                                       | status : 200 data : “Successful”                  |
| POST    | /calendar/events     | get the events in the calendar                   | token: {access token}                                                                                                                                                               | status : 200 data : events information JSON array |
| POST    | /calendar/insert     | add an event to calendar                         | token: {access token}, event : {   summary : “”,   description: “”,   start:{    dateTime:start Date Time    },   end:{    dateTime:end Date Time   }   [others are not required] } | status : 200 data : “Success”                     |
| POST    | /calendar/delete/:id | delete an event mentioned by the id              | token: {access token}                                                                                                                                                               | status : 200                                      |



