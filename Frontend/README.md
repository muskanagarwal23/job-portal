# CareerConnect – Job Portal 

A role-based job portal where employees can apply for jobs and employers can post and manage job listings.

## 📂 Folder Structure

```
Frontend/       # React frontend
backend/       # Express backend
```

##  Features

###  Employee
- View job listings
- View Job details
- Apply to jobs
- Bookmark jobs
- Track application statuses

###  Employer
- Dashboard 
- Post jobs
- View received applications
- Update application status (Viewed, Interviewed, Selected, Rejected)
- Deleted Posted Jobs

You can register both Employer and Employee with Email and Password

## 🛠 Tech Stack

- **Frontend**: React, React Router, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (role-based)
- **Others**: Toastify, Multer, Nodemailer,AOS,Skelton

## Backend Setup:
```
cd backend
npm install
npm start
npm run dev
```



### 🔐 Environment Variables
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Start the backend server

```bash
nodemon server.js
# or
node server.js
```

The backend will now be running at: `http://localhost:5000`

## Frontend Setup
```
cd Frontend
npm install
npm start
npm run dev
```

The frontend will now be running at: `http://localhost:5173`



