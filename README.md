# Urban Company

Welcome to Urban Company, your ultimate destination for professional services at your doorstep. Urban Company is a web application that connects users with professional service providers, offering a convenient and reliable way to get services at your doorstep. It's built using ReactJS for the frontend and JSON-Server for the backend (simulated data).

## Installation steps

- clone the repository

  ```bash
    git clone https://github.com/meet-bhimani/Urban-company.git
  ```

- navigate to the project folder
  ```bash
    cd Urban-company
  ```

### Client (React App)

- Navigate to the client directory:

  ```bash
    cd client
  ```

- Install dependencies

  ```bash
    npm install
  ```

- Start the React app

  ```bash
    npm run dev
  ```

### Server (JSON-Server)

- Navigate to the server directory:

  ```bash
  cd ../server
  ```

- Install dependencies

  ```bash
    npm install
  ```

- Start the JSON-Server

  ```bash
    npm start
  ```

## Functionalities

- User can register as normal user or service provider and login with their credentials

### Normal User ( Consumer )

- Browse and search for various services offered.
- View all available services with functionalities to search/sort/filter
- View detailed information about each service, including descriptions, pricing, and provider details.
- Book appointments for services after successful login.
- Track the status of your bookings.
- Manage your profile and update personal information.
- Send query or message via contact us form

### Service Provider

- Create and manage your profile, showcasing your expertise and services offered.
- Receive booking requests from users and manage appointments.
- Can add new services
- Filter various service request based on status like accepted service request or incoming service requests
- Send query or message via contact us form

### Admin

- Manage users and service providers accounts and profiles.
- Manage service provider's services and can delete inappropriate services.
- analyze data in tabular format with functionality of search/sort/filter
- Can add new services for any service provider providing their Id
- Handle customer support and address user queries received from contact form.

## Packages / Dependencies

- [Redux](https://redux.js.org/): State management library for JavaScript apps.
- [React Router DOM](https://reactrouter.com/en/6.22.3/start/tutorial): Declarative routing for React applications.
- [Formik](https://formik.org/): Form management library for React applications.
- [Yup](https://www.npmjs.com/package/yup): JavaScript schema builder for value parsing and validation.
- [Axios](https://axios-http.com/): Promise-based HTTP client for the browser and Node.js.
- [Material-UI Data Grid](https://mui.com/x/react-data-grid/): A customizable table component for displaying data.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for quickly building custom designs.
- [tailwind-merge](https://www.npmjs.com/package/tailwind-merge): A Tailwind CSS utility to merge multiple classes.
- [React Slick](https://react-slick.neostack.com/): Carousel component built with React.
- [React Icons](https://react-icons.github.io/react-icons/): Icon library for React applications.
- [React Helmet Async](https://www.npmjs.com/package/react-helmet-async): Declarative meta tags management for React.
- [React Spinners](https://www.npmjs.com/package/react-spinners): Loading spinner components for React applications.
- [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html): Type checking library for React props.
- [React Hot Toast](https://react-hot-toast.com/): Toast notification library for React applications.
- [Browser's localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage): Web API for storing data in the browser.
