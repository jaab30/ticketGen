1. npm init
2. npm i express mongoose body-parser concurrently
3. Add Scripts to package.json. "start":"nodemon server.js or start server.js".
4. Create server file "serve.js"
5. fill out server file.
6. create "config" folder for mongo and other files. Create "keys.js" file.
7. start your file. make sure it connets with DB.
8. create model
9. create routes
10. create controllers folder and files
11. test
12. create "client" folder
13. cd to client and: npx create-react-app . 
<!-- (the dot creates the file inside the folder we are in) -->
14. add proxy to react's package.json
```
 "proxy": "http://localhost:8000",
```
15. add concurrently to back end package.json
```
"client-intall": "npm install --prefix client",
"client": "npm start --prefix client",
"dev": "concurrently \"npm run server\" \"npm run client\"",
```
16. Clean up react from default files
    - logo.svg
    - delete reference to logo.svg on App.js
    - index.css
    - delete reference to index.css on index.js
    - delete content from app.css
    - delete content inside render on App.js




