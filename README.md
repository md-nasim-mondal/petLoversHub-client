# PetLoversHub

Welcome to PetLoversHub! This platform aims to create a user-friendly interface for individuals to search for, connect with, and adopt pets in need of loving homes. Built using the MERN stack, PetLoversHub strives to make pet adoption as seamless and efficient as possible.

## Live Site

[PetLoversHub](https://pet-lovers-hub.netlify.app)

## Repositories

- [Client-Side GitHub Repository](https://github.com/programming-hero-web-course1/b9a12-client-side-nasim-programmer24)
- [Server-Side GitHub Repository](https://github.com/programming-hero-web-course1/b9a12-server-side-nasim-programmer24)

## Features

### Homepage

1. **Navbar**:
    - Website logo
    - Links: Home, Pet Listing, Donation Campaigns, Login/Register
    - Profile picture dropdown with links to dashboard and logout

2. **Banner Section**:
    - Normal banner or slider

3. **Pets Category Section**:
    - Buttons/cards/links for pet categories: Cats, Dogs, Rabbits, Fish, etc.

4. **Call to Action Section**:
    - Inspirational images and text encouraging pet adoption

5. **About Us Section**:
    - Short introduction about the website's purpose

6. **Additional Sections**:
    - Relevant sections to enhance the theme (e.g., Success Stories, Volunteer Opportunities)

### Pet Listing Page

1. Display all non-adopted pets in a 3-column grid layout with cards.
2. Sort pets by date in descending order.
3. Search field to filter pets by name and category.
4. Each card displays:
    - Pet image
    - Pet name
    - Pet age
    - Pet location
    - View Details button
5. Implement infinite scrolling using Tanstack Query and React Intersection Observer.

### Pet Details Page

1. Show detailed information of the pet with an `Adopt` button.
2. Adoption form modal with fields:
    - Pet information (auto-filled and non-editable)
    - User information (auto-filled and non-editable)
    - Phone number
    - Address
    - Submit button
3. Save adoption requests to the database.

### Donation Campaigns Page

1. Display all donation campaigns in a 3-column grid layout.
2. Sort campaigns by date in descending order.
3. Each card displays:
    - Pet name
    - Pet image
    - Maximum donation amount
    - Donated amount
    - View Details button
4. Implement infinite scrolling.

### Donation Details Page

1. Display all details of the donation with a `Donate Now` button.
2. Donation modal with:
    - Donation amount input field
    - Credit Card element by Stripe
3. Save donation details and display the donation in the campaign.

### Authentication

1. Email and password authentication with error handling.
2. Registration with additional fields for image and full name.
3. Use Firebase to update profile image and name.
4. Implement two additional login methods (e.g., Google, Facebook, GitHub).
5. Save user information to the database with a default role of 'user'.
6. Admins can promote users to admin role.
7. Implement JWT for login and store the access token securely.

### User Dashboard

1. Sidebar and top navbar layout.
2. Pages:
    - Add a Pet
    - My Added Pets
    - Adoption Requests
    - Create Donation Campaign
    - My Donation Campaigns
    - My Donations

### Admin Dashboard

1. Access all user pages plus additional admin pages.
2. Pages:
    - Users
    - All Pets
    - All Donations

### Challenges

1. Use modern UI libraries (e.g., Shadcn-UI, Flowbite, Material-Tailwind).
2. Show skeletons as loaders using `react-loading-skeleton`.
3. Implement infinite scrolling in the Pet Listing page.
4. Use WYSIWYG text editors for long descriptions (e.g., Tiptap, Slate, React-Quill).

### Important Information

1. Admins can access user routes on the dashboard.
2. Ensure responsive design for all screens.
3. Implement dark and light modes.

### Prohibited

1. Do not copy design elements from previous projects.
2. Follow best coding practices.
3. Write meaningful git commit messages.

## Submission

1. **Assignment Category/variant**:
2. **Admin Email**:
3. **Admin Password**:
4. **Front-end Live Site Link**: [PetLoversHub](https://pet-lovers-hub.netlify.app)
5. **Client-Side GitHub Repository Link**: [Client Repo](https://github.com/programming-hero-web-course1/b9a12-server-side-nasim-programmer24)
6. **Server-Side GitHub Repository Link**: [Server Repo](https://github.com/programming-hero-web-course1/b9a12-server-side-nasim-programmer24)

Join us in our mission to unite pets with their forever families!
