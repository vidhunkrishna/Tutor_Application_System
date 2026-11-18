import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [tutor, setTutor] = useState(null);
  const [application, setApplication] = useState(null);
  const [qualifications, setQualifications] = useState([]);
  const [documents, setDocuments] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const tutorData = await axios.get(
          `http://localhost:8080/tutors/user/${userId}`,
          { headers },
        );

        setTutor(tutorData.data);

        try {
          const applicationData = await axios.get(
            `http://localhost:8080/applications/tutor/${tutorData.data.id}`,
            { headers },
          );

          setApplication(applicationData.data);
        } catch (err) {
          if (err.response?.status === 404) {
            setApplication(null);
          } else {
            throw err;
          }
        }

        const qualificationData = await axios.get(
          `http://localhost:8080/qualifications/tutor/${tutorData.data.id}`,
          { headers },
        );

        setQualifications(qualificationData.data);

        const documentData = await axios.get(
          `http://localhost:8080/documents/tutor/${tutorData.data.id}`,
          { headers },
        );

        setDocuments(documentData.data);
      } catch (err) {
        console.log(err);

        if (err.response?.status === 404) {
          setError(
            "Tutor profile not found. Please create your tutor profile first.",
          );
        } else {
          setError("Failed to load dashboard.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [token, userId]);

  const getApplicationStatus = () => {
    if (!application) {
      return "Not Started";
    }

    return application.applicationStatus;
  };

  const getApplicationMessage = () => {
    if (!application) {
      return "No application created";
    }

    if (application.applicationStatus === "DRAFT") {
      return "Application is still a draft";
    }

    if (application.applicationStatus === "SUBMITTED") {
      return "Waiting for review";
    }

    if (application.applicationStatus === "APPROVED") {
      return "Application approved";
    }

    if (application.applicationStatus === "REJECTED") {
      return "Application rejected";
    }

    if (application.applicationStatus === "RESUBMITTED") {
      return "Application resubmitted";
    }

    return "Application status";
  };

  const getQualificationStatus = () => {
    if (qualifications.length === 0) {
      return "Not Added";
    }

    const allVerified = qualifications.every(
      (qualification) => qualification.verificationStatus === "VERIFIED",
    );

    if (allVerified) {
      return "Verified";
    }

    return "Pending";
  };

  const getQualificationMessage = () => {
    if (qualifications.length === 0) {
      return "No qualifications added";
    }

    const allVerified = qualifications.every(
      (qualification) => qualification.verificationStatus === "VERIFIED",
    );

    if (allVerified) {
      return "All qualifications verified";
    }

    return "Waiting for verification";
  };

  const getProgress = () => {
    let progress = 0;

    if (tutor) {
      progress += 20;
    }

    if (qualifications.length > 0) {
      progress += 20;
    }

    if (documents.length > 0) {
      progress += 20;
    }

    if (application) {
      progress += 20;
    }

    if (application?.applicationStatus === "SUBMITTED") {
      progress += 10;
    }

    if (application?.applicationStatus === "RESUBMITTED") {
      progress += 10;
    }

    if (application?.applicationStatus === "APPROVED") {
      progress += 20;
    }

    return Math.min(progress, 100);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-300">
        <Sidebar />

        <div className="flex-1 ml-65 min-h-screen bg-slate-300 p-4 sm:p-6 md:p-8">
          <p className="text-gray-600 mt-10 text-center">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-slate-300">
        <Sidebar />

        <div className="flex-1 ml-65 min-h-screen bg-slate-300 p-4 sm:p-6 md:p-8">
          <p className="text-red-600 mt-10 text-center">{error}</p>
        </div>
      </div>
    );
  }

  const applicationStatus = getApplicationStatus();
  const applicationMessage = getApplicationMessage();

  const qualificationStatus = getQualificationStatus();
  const qualificationMessage = getQualificationMessage();

  const progress = getProgress();

  return (
    <div className="flex min-h-screen bg-slate-300">
      <Sidebar />

      <div className="flex-1 ml-65 min-h-screen bg-slate-300 p-4 sm:p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h1>

          <p className="text-gray-600 mt-1">Manage your tutor applications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-gray-500">Application Status</p>

            <h2 className="text-2xl font-bold text-gray-800 mt-3">
              {applicationStatus}
            </h2>

            <p
              className={`text-sm mt-2 ${
                applicationStatus === "APPROVED"
                  ? "text-green-600"
                  : applicationStatus === "REJECTED"
                    ? "text-red-600"
                    : "text-yellow-600"
              }`}
            >
              ● {applicationMessage}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-gray-500">Qualification Status</p>

            <h2 className="text-2xl font-bold text-gray-800 mt-3">
              {qualificationStatus}
            </h2>

            <p
              className={`text-sm mt-2 ${
                qualificationStatus === "Verified"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              ● {qualificationMessage}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm md:col-span-2 lg:col-span-1">
            <p className="text-gray-500">Application Progress</p>

            <h2 className="text-2xl font-bold text-gray-800 mt-3">
              {progress}%
            </h2>

            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            {!application && (
              <NavLink to="/applications">
                <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 cursor-pointer w-full sm:w-auto">
                  Apply as Tutor
                </button>
              </NavLink>
            )}

            <NavLink to="/qualifications">
              <button className="bg-white text-gray-700 px-5 py-2.5 rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer w-full sm:w-auto">
                Manage Qualifications
              </button>
            </NavLink>

            <NavLink to="/documents">
              <button className="bg-white text-gray-700 px-5 py-2.5 rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer w-full sm:w-auto">
                Manage Documents
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
