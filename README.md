# 📚 Library Management System

A modern, full-stack Library Management System built with **ASP.NET Core Web API** (Backend) and **React + TypeScript** (Frontend) with **Tailwind CSS**. This project was developed as part of a Software Engineering Internship assignment.

---

## 🎥 Demo Video

https://github.com/user-attachments/assets/fb7c704a-4cef-488f-8308-c8591dd1a630

---

## 🚀 Quick Start

### 1. Prerequisites
- **.NET 8 SDK**: [Download here](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js (v18+)**: [Download here](https://nodejs.org/)
- **Git**: For version control.
- **SQLite**: Database is file-based (included), no server setup required.

### 2. Backend Setup
1. Open a terminal in `./backend/LibraryApi`.
2. Run the application:
   ```bash
   dotnet restore
   dotnet run
   ```
   - **API URL**: `http://localhost:5000`
   - **Swagger UI**: [http://localhost:5000/swagger](http://localhost:5000/swagger)

### 3. Frontend Setup
1. Open a terminal in `./frontend/library-ui`.
2. Install & Start:
   ```bash
   npm install
   npm run dev
   ```
   - **Web UI**: [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```text
library-management-system/
├── backend/LibraryApi/           # ASP.NET Core Web API
│   ├── Controllers/              # API Endpoints (BooksController)
│   ├── Data/                     # EF Core Context & Migrations
│   ├── Models/                   # Data Models (Book.cs)
│   ├── Program.cs                # Entry Point & Dependency Injection
│   └── library.db                # SQLite Database File
├── frontend/library-ui/          # React + TypeScript App
│   ├── src/
│   │   ├── api/                  # Axios Services (bookService.ts)
│   │   ├── components/           # Reusable UI (BookForm, BookList)
│   │   ├── pages/                # Page Components (Home, EditBook)
│   │   ├── types/                # TS Interfaces (Book.ts)
│   │   ├── App.tsx               # Main Component & Routing
│   │   └── main.tsx              # Entry Point
│   ├── tailwind.config.js        # UI Styling Config
│   └── vite.config.ts            # Build Tool Config
└── Report.pdf                    # Project Report
```

---

## 📡 API Documentation

The backend exposes a RESTful API for book management:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/books` | Retrieve all book records |
| `GET` | `/api/books/{id}` | Retrieve a specific book by ID |
| `POST`| `/api/books` | Create a new book record |
| `PUT` | `/api/books/{id}` | Update an existing book record |
| `DELETE`| `/api/books/{id}` | Delete a book record |

---

## ✨ Key Features
- **Full CRUD**: Comprehensive book management (Create, Read, Update, Delete).
- **Modern UI**: Dark navy theme powered by **Tailwind CSS** with smooth animations.
- **Interactive Forms**: Real-time validation and responsive editing experiences.
- **Type Safety**: End-to-end TypeScript integration on the frontend.
- **Lightweight DB**: SQLite integration for zero-config database setup.

---

## 📄 License & Contact

MIT © 2026 [Yashith Chandeepa](https://github.com/yashith03)
