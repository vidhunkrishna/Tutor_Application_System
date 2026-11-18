import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function EducationDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getApplications = async () => {
      try {
        const response = await axios.get("http://localhost:8080/applications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setApplications(response.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    getApplications();
  }, [token]);

  const pendingApplications = applications.filter(
    (application) => application.applicationStatus === "SUBMITTED",
  );

  const approvedApplications = applications.filter(
    (application) => application.applicationStatus === "APPROVED",
  );

  const rejectedApplications = applications.filter(
    (application) => application.applicationStatus === "REJECTED",
  );

  const draftApplications = applications.filter(
    (application) => application.applicationStatus === "DRAFT",
  );

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-300">
        <Sidebar />

        <div className="flex-1 ml-65 p-4 sm:p-6 md:p-8">
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-slate-300">
        <Sidebar />

        <div className="flex-1 ml-65 p-4 sm:p-6 md:p-8">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-300">
      <Sidebar />

      <div className="flex-1 ml-65 min-h-screen p-4 sm:p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Education Manager Dashboard
          </h1>

          <p className="text-gray-600 mt-1">
            Manage tutor applications and verification.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-gray-500">Total Applications</p>

            <h2 className="text-3xl font-bold text-gray-800 mt-3">
              {applications.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-gray-500">Pending Review</p>

            <h2 className="text-3xl font-bold text-yellow-600 mt-3">
              {pendingApplications.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-gray-500">Approved</p>

            <h2 className="text-3xl font-bold text-green-600 mt-3">
              {approvedApplications.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-gray-500">Rejected</p>

            <h2 className="text-3xl font-bold text-red-600 mt-3">
              {rejectedApplications.length}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Applications
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Review tutor applications.
              </p>
            </div>

            <NavLink
              to="/education-manager/applications"
              className="btn text-white px-4 py-2"
            >
              View Applications
            </NavLink>
          </div>

          {pendingApplications.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No applications waiting for review.
            </p>
          ) : (
            <div className="space-y-3">
              {pendingApplications.slice(0, 5).map((application) => (
                <div
                  key={application.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-3"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      Application #{application.id}
                    </p>

                    <p className="text-sm text-gray-500">
                      Tutor ID: {application.tutorId}
                    </p>
                  </div>

                  <span className="text-sm text-yellow-600">
                    {application.applicationStatus}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-sm p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Application Overview
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
            <div>
              <p className="text-sm text-gray-500">Draft Applications</p>

              <p className="text-2xl font-bold text-gray-800 mt-1">
                {draftApplications.length}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Approved Applications</p>

              <p className="text-2xl font-bold text-green-600 mt-1">
                {approvedApplications.length}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Rejected Applications</p>

              <p className="text-2xl font-bold text-red-600 mt-1">
                {rejectedApplications.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
