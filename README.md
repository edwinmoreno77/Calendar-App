# Calendar Web App

Calendar web application designed to easily manage events. Includes user authentication and capabilities to create, edit, and delete events.



<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="https://github.com/edwinmoreno77/calendar-backend/blob/main/assets/calendar.gif" alt="calendar" width="500">
  <img src="https://github.com/edwinmoreno77/calendar-backend/blob/main/assets/calendarEvent.gif" alt="events" width="500">
</div>


## Deployed in

```
https://calendar-backend-38sm.onrender.com
```



## Characteristics

- Registration and login with JWT authentication.
- Event management:
  - Create, edit and delete events.
  - Calendar view with events organized by date.
- Responsive design with React and React-Big-Calendar.
- Backend with Express and MongoDB.

## Technologies used

### Frontend:
- **React** and **Redux Toolkit** for state management.
- **React-Big-Calendar** and **date-fns** for event display.
- **React-Modal** and **SweetAlert2** for an improved user experience.
- Packaged with **Vite**.

### Backend:
- **Express** for the REST API.
- **Mongoose** for the database in MongoDB.
- **JWT** and **bcryptjs** for authentication.
- Data validation with **Express Validator**.

## install

### Clone the repository:
```
git clone https://edwinmoreno77/calendar-backend.git
cd calendar-backend
```

run `npm install ` to rebuild node modules.

### Set environment variables to a Backend file .env

- PORT= (default: 4000)
- DB_CNN=uri_mongo
- SECRET_JWT_SEED=you_secret_jwt
- ALLOWED_ORIGIN=you_allowed_origin

### Set environment variables to a Frontend file .env

- VITE_API_URL=http://localhost:4000/api

### rebuild frontend node modules 

```
cd frontend
yarn install
```

### Start the development environment

```
cd ..
node index.js
```

