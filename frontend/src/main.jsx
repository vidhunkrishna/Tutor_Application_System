import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import App from "./App.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/register.jsx";

import Dashboard from "./pages/user/dashboard.jsx";
import Applications from "./pages/user/applications.jsx";
import Qualifications from "./pages/user/qualifications.jsx";
import Profile from "./pages/user/Profile.jsx";
import Documents from "./pages/user/Documents.jsx";

import AdminDashboard from "./pages/admin/admindashboard.jsx";
import AdminApplications from "./pages/admin/adminapplications.jsx";
import AdminDocuments from "./pages/admin/admindocuments.jsx";
import AdminTutors from "./pages/admin/admintutors.jsx";
import AdminQualifications from "./pages/admin/adminqualifications.jsx";

import EducationDashboard from "./pages/educationmanager/educationdashboard.jsx";
import EducationApplications from "./pages/educationmanager/educationapplications.jsx";
import EducationDocuments from "./pages/educationmanager/educationdocuments.jsx";
import EducationTutors from "./pages/educationmanager/educationtutors.jsx";
import EducationQualifications from "./pages/educationmanager/educationqualifications.jsx";

import ProtectedRoute from "./components/protectedroutes.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["TUTOR"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <ProtectedRoute roles={["TUTOR"]}>
              <Applications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/qualifications"
          element={
            <ProtectedRoute roles={["TUTOR"]}>
              <Qualifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/documents"
          element={
            <ProtectedRoute roles={["TUTOR"]}>
              <Documents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute roles={["TUTOR", "GUEST"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/education-manager/dashboard"
          element={
            <ProtectedRoute roles={["EDUCATION_MANAGER"]}>
              <EducationDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/education-manager/applications"
          element={
            <ProtectedRoute roles={["EDUCATION_MANAGER"]}>
              <EducationApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/education-manager/documents"
          element={
            <ProtectedRoute roles={["EDUCATION_MANAGER"]}>
              <EducationDocuments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/education-manager/tutors"
          element={
            <ProtectedRoute roles={["EDUCATION_MANAGER"]}>
              <EducationTutors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/education-manager/qualifications"
          element={
            <ProtectedRoute roles={["EDUCATION_MANAGER"]}>
              <EducationQualifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute roles={["ADMIN", "EDUCATION_MANAGER"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute roles={["ADMIN", "EDUCATION_MANAGER"]}>
              <AdminApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/documents"
          element={
            <ProtectedRoute roles={["ADMIN", "EDUCATION_MANAGER"]}>
              <AdminDocuments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/tutors"
          element={
            <ProtectedRoute roles={["ADMIN", "EDUCATION_MANAGER"]}>
              <AdminTutors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/qualifications"
          element={
            <ProtectedRoute roles={["ADMIN", "EDUCATION_MANAGER"]}>
              <AdminQualifications />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
