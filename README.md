# Blook blogging application

- [Online Demo](https://blook-blogger.netlify.app/ "Online Demo")
- [Story book documentation](https://63ea939d221d94af0615e664-guxaeamljh.chromatic.com/)

### About:
This is a web application built using React (Create React App), template - Typescript and Sanity-IO serving as our Content Management System.

#### Available Pages
1. Landing
2. Home - landing page for a signed in user
3. Categories
4. Search
5. Article - single view for an article
6. Articles per selected category
7. Articles per author
8. Create article
8. User profile - Both my profile and edit profile pages

### Backend / Server
- The data on the application is from Sanity.io CMS.
- I also used firebase authentication for user management.

### Component documentation
- I used storybook js to document all common or shared components. To view published components click [here](https://63ea939d221d94af0615e664-guxaeamljh.chromatic.com/)

### Tech Stack:
**Dependencies**
- Mantine v5.8.2: Base CSS framework
- Redux v4.2.0: State management
- Date-fns v2.29.3: Date formatting and methods
- React-router-dom v6.4.2: Navigation in between pages and routes
- Portable-text-react v1.0.6 : Rendering rich text as HTML
- React-helmet v6.1.0: Accessing native HTML tags in react components
- React icons v4.6.0 and Tabler icons v1.112.0: Icons usage
- Slugify v1.6.5: Dynamic URL sanitization
- Storybook v6.5.16: Component documentation

**Dev dependencies**
- eslint v8.26.0 - https://eslint.org/docs/latest/user-guide/getting-started

### Screenshot
![image](https://user-images.githubusercontent.com/26582923/218576896-f8487090-5d05-434d-b957-685013bc4d20.png)

### Software
Before proceeding, please ensure you have the following software installed on your computer.
- Node
- Yarn (optional but recommended)
- Git command line tools

### Useful links
- Download Git cli -
    - Windows: https://git-scm.com/download/windows
    - Mac: https://git-scm.com/download/mac
- Download Node - https://nodejs.org/en/
- Download Yarn cli - https://yarnpkg.com/lang/en/docs/install/
- Download VSCode - https://code.visualstudio.com/

### Getting started
Please fork a copy of this repository. Forking a repository allows you to freely experiment with changes without affecting the original project. Alternatively download or clone the master branch.

##### Download & Install Dependencies on your machine
Clone the repo to your machine
`git clone <CloneURL>`

##### Launch the frontend
1. Open a new terminal window and navigate in your root folder
   `cd <../root>`
   `yarn install OR npm install`
2. Run the start script
   `yarn run start OR npm run start`

Your app should be running on: http://localhost:3000

### Versions
v1.0
- Default project implementation

### Authors
1. Kelvin Kiptum Kiprop - https://github.com/kelvink96

### License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/kelvink96ltd/flick-city/blob/master/LICENSE.md) file for details
