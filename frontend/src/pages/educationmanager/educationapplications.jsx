import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import axios from "axios";

export default function EducationApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageerror, setPageError] = useState("");

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const [actionError, setActionError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const getApplications = async () => {
      try {
        const response = await axios.get("http://localhost:8080/applications", {
          headers,
        });

        setApplications(response.data);
      } catch (err) {
        console.log(err);
        setPageError("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    getApplications();
  }, [token]);

  const handleApprove = async (id) => {
    setActionError("");
    setSuccess("");

    try {
      const response = await axios.put(
        `http://localhost:8080/applications/${id}/approve`,
        {},
        {
          headers,
        },
      );

      setApplications((prev) =>
        prev.map((application) =>
          application.id === id ? response.data : application,
        ),
      );

      setSuccess("Application approved successfully.");
    } catch (err) {
      console.log(err);
      setActionError(
        err.response?.data?.message || "Failed to approve application.",
      );
    }
  };

  const handleReject = async () => {
    setActionError("");
    setSuccess("");

    if (!selectedApplication) {
      return;
    }

    if (!rejectionReason.trim()) {
      setActionError("Please enter a rejection reason.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/applications/${selectedApplication.id}/reject`,
        {},
        {
          params: {
            reason: rejectionReason,
          },
          headers,
        },
      );

      setApplications((prev) =>
        prev.map((application) =>
          application.id === selectedApplication.id
            ? response.data
            : application,
        ),
      );

      setShowRejectModal(false);
      setSelectedApplication(null);
      setRejectionReason("");

      setSuccess("Application rejected successfully.");
    } catch (err) {
      console.log(err);
      setActionError(
        err.response?.data?.message || "Failed to reject application.",
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-300">
        <Sidebar />

        <div className="flex-1 ml-65 p-4 sm:p-6 md:p-8">
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (pageerror) {
    return (
      <div className="flex min-h-screen bg-slate-300">
        <Sidebar />

        <div className="flex-1 ml-65 p-4 sm:p-6 md:p-8">
          <p className="text-red-600">{pageerror}</p>
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
            Applications
          </h1>

          <p className="text-gray-600 mt-1">
            Review and manage tutor applications.
          </p>
        </div>

        {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

        {actionError && (
          <p className="text-red-600 text-sm mb-4">{actionError}</p>
        )}

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center">
            <p className="text-gray-600">No applications found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 sm:p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                All Applications
              </h2>
            </div>

            <div className="divide-y">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="p-5 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-5"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      Application #{application.id}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Tutor: {application.tutorName}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Submitted:{" "}
                      {application.submissionDate
                        ? new Date(
                            application.submissionDate,
                          ).toLocaleDateString()
                        : "Not submitted"}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium text-gray-600">
                      {application.applicationStatus}
                    </span>

                    {application.applicationStatus === "SUBMITTED" && (
                      <>
                        <button
                          onClick={() => handleApprove(application.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => {
                            setSelectedApplication(application);
                            setShowRejectModal(true);
                            setActionError("");
                            setRejectionReason("");
                          }}
                          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 w-full max-w-96">
            <h2 className="text-xl font-bold text-gray-800 text-center">
              Reject Application
            </h2>

            <p className="text-sm text-gray-500 mt-2 text-center">
              Application #{selectedApplication?.id}
            </p>

            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full mt-5 p-3 border rounded-lg outline-none"
              rows="4"
              placeholder="Enter rejection reason"
            />

            {actionError && (
              <p className="text-red-500 text-sm mt-2">{actionError}</p>
            )}

            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-5">
              <button
                type="button"
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedApplication(null);
                  setRejectionReason("");
                  setActionError("");
                }}
                className="bg-gray-300 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleReject}
                className="bg-red-600 text-white px-5 py-2 rounded-md cursor-pointer hover:bg-red-700"
              >
                Reject Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
