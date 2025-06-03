# React TypeScript CRUD Application

A modern React application built with TypeScript and Vite that implements CRUD (Create, Read, Update, Delete) operations for user management.

## Project Requirements

The application was built based on the following requirements:

1. Create a CRUD application that can:
   - Add user data (name, email, mobile number, city)
   - Edit existing user data
   - Delete user records
   - Display all users in a table format

2. User Interface Requirements:
   - Registration form with proper spacing
   - Table to display user data
   - Edit and Delete functionality for each user
   - Clean and modern UI design

3. Styling Requirements:
   - High contrast colors for better readability
   - Light background colors with dark text
   - Professional form styling
   - Responsive table design
   - Clear visual hierarchy

## Features Implemented

1. User Management:
   - Create new user records
   - View all users in a table format
   - Edit existing user information
   - Delete user records

2. Form Fields:
   - Username
   - Email
   - Mobile Number
   - City

3. UI/UX Features:
   - Form validation
   - Error messages
   - Loading states
   - Success feedback
   - Responsive design
   - User-friendly table layout

4. Styling:
   - GitHub-inspired color scheme
   - Clear visual hierarchy
   - Proper spacing and padding
   - Hover effects
   - Focus states for form elements
   - Modern button styling

## Technology Stack

- React
- TypeScript
- Vite
- CSS3
- React Router DOM

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```
### 📝 Prompt Used

- `@workspace /new` scaffold new React project with TypeScript  
- `@workspace` Add React Router DOM version 6 and add routes: Home and Register page  
- Add Register Form  
- Add validation for username and email  
  - Display error below input and highlight it if there is an error  
  - On changing input, validate in real-time  
  - Do not let submit if there is an error  
- `@workspace /tests` Generate unit test for suggested code  
  - Also add test for rendering and button  
  - Fix errors in testing file (I am using this package.json)  

#### ⚙️ Agent Mode Instructions

- Access the whole project  
- Create a CRUD app which can add:  
  - User name  
  - Email  
  - Mobile number  
  - City  
- Use Register route  
- Add some CSS and ensure proper spacing  
- Support add/edit/delete user data  
- Display users’ data in a table 
- The color of input is not good  
  - Take reference from somewhere and fix it  
- Same for table styling  
  - Colors sho

#### 🎨 Styling Notes





