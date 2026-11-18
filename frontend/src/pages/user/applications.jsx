import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

export default function Applications() {
  const [showmodal, setShowmodal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [pageerror, setPageError] = useState("");
  const [formerror, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  const [tutor, setTutor] = useState(null);
  const [application, setApplication] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadData = async () => {
      try {
        const tutorData = await axios.get(
          `http://localhost:8080/tutors/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const tutorInfo = tutorData.data;
        setTutor(tutorInfo);

        try {
          const applicationData = await axios.get(
            `http://localhost:8080/applications/tutor/${tutorInfo.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          setApplication(applicationData.data);
        } catch (err) {
          if (err.response?.status !== 404) {
            setPageError("Failed to load application.");
          }
        }
      } catch (err) {
        console.log(err);

        if (err.response?.status === 404) {
          setPageError(
            "Tutor profile not found. Please create your tutor profile first.",
          );
        } else {
          setPageError("Failed to load tutor profile.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token, userId]);

  const handleCreateApplication = async () => {
    setFormError("");
    setSuccess("");

    if (!tutor) {
      setFormError("Tutor profile not found.");
      return;
    }

    try {
      const data = await axios.post(
        "http://localhost:8080/applications",
        {
          tutorId: tutor.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setApplication(data.data);
      setSuccess("Application draft created successfully!");

      setTimeout(() => {
        setShowmodal(false);
        setSuccess("");
      }, 1500);
    } catch (err) {
      console.log(err);

      setFormError(
        err.response?.data?.message || "Failed to create application.",
      );
    }
  };

  const handleSubmitApplication = async () => {
    setFormError("");
    setSuccess("");

    if (!application) {
      setFormError("Application not found.");
      return;
    }

    try {
      const data = await axios.put(
        `http://localhost:8080/applications/${application.id}/submit`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setApplication(data.data);

      if (application.applicationStatus === "REJECTED") {
        setSuccess("Application resubmitted successfully!");
      } else {
        setSuccess("Application submitted successfully!");
      }
    } catch (err) {
      console.log(err);

      setFormError(
        err.response?.data?.message || "Failed to submit application.",
      );
    }
  };

  return (
    <div>
      <Sidebar />

      <div className="flex-1 ml-65 min-h-screen bg-slate-300 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-left text-2xl sm:text-3xl font-semibold text-gray-800">
              My Application
            </p>

            <p className="text-left text-sm font-normal text-gray-500">
              Manage your tutor application and track its status.
            </p>
          </div>

          {!application && (
            <button
              onClick={() => {
                setShowmodal(true);
                setFormError("");
                setSuccess("");
              }}
              className="flex w-fit items-center gap-1.5 px-4 py-2 cursor-pointer btn text-white font-bold"
            >
              <FaPlus />
              Apply Now
            </button>
          )}
        </div>

        {loading && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">Loading application...</p>
          </div>
        )}

        {!loading && pageerror && (
          <div className="mt-8 text-center">
            <p className="text-red-700 text-sm">{pageerror}</p>
          </div>
        )}

        {!loading && !pageerror && !application && (
          <div className="mt-8 bg-white rounded-xl shadow-sm p-5 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              Become a Tutor
            </h2>

            <p className="text-gray-500 mt-2">
              Submit your application to become a tutor.
            </p>

            <div className="mt-6">
              <p className="text-sm text-gray-500">Applying for Subject</p>

              <p className="text-xl font-semibold text-gray-800">
                {tutor?.subject || "Subject not specified"}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500">Tutor Name</p>

              <p className="font-medium text-gray-800">{tutor?.name}</p>
            </div>
          </div>
        )}

        {!loading && !pageerror && application && (
          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div>
                  <p className="text-sm text-gray-500">Application ID</p>

                  <h2 className="text-2xl font-semibold text-gray-800">
                    #{application.id}
                  </h2>
                </div>

                <p className="text-sm font-medium text-gray-600">
                  {application.applicationStatus}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-500">Applying for</p>

                <p className="text-xl font-semibold text-gray-800">
                  {tutor?.subject}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">Tutor</p>

                <p className="font-medium text-gray-800">{tutor?.name}</p>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">Submission Date</p>

                <p className="font-medium text-gray-800">
                  {application.submissionDate
                    ? new Date(application.submissionDate).toLocaleDateString()
                    : "Not submitted"}
                </p>
              </div>

              {application.applicationStatus === "DRAFT" && (
                <div className="mt-6">
                  <p className="text-gray-600 text-sm">
                    Your application is saved as a draft.
                  </p>

                  <button
                    onClick={handleSubmitApplication}
                    className="btn px-5 py-2 mt-3 text-white cursor-pointer"
                  >
                    Submit Application
                  </button>
                </div>
              )}

              {application.applicationStatus === "SUBMITTED" && (
                <p className="text-yellow-600 text-sm mt-6">
                  Your application has been submitted and is waiting for review.
                </p>
              )}

              {application.applicationStatus === "RESUBMITTED" && (
                <div className="mt-6">
                  <p className="text-yellow-600 text-sm">
                    Your application has been resubmitted and is waiting for
                    review.
                  </p>
                </div>
              )}

              {application.applicationStatus === "APPROVED" && (
                <p className="text-green-600 text-sm mt-6">
                  Your application has been approved.
                </p>
              )}

              {application.applicationStatus === "REJECTED" && (
                <div className="mt-6">
                  <p className="text-red-600 text-sm">
                    Your application has been rejected.
                  </p>

                  {application.rejectionReason && (
                    <p className="text-red-500 text-sm mt-1">
                      Reason: {application.rejectionReason}
                    </p>
                  )}

                  <button
                    onClick={handleSubmitApplication}
                    className="btn px-5 py-2 mt-4 text-white cursor-pointer"
                  >
                    Resubmit Application
                  </button>
                </div>
              )}

              {success && (
                <p className="text-green-600 text-sm mt-4">{success}</p>
              )}

              {formerror && (
                <p className="text-red-500 text-sm mt-4">{formerror}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {showmodal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 w-full max-w-96">
            <div className="text-center font-bold text-gray-900 text-xl p-5">
              Tutor Application
            </div>

            <div className="bg-slate-100 rounded-lg p-4 mt-2">
              <p className="text-sm text-gray-500">You are applying to teach</p>

              <p className="text-xl font-semibold text-gray-800 mt-1">
                {tutor?.subject}
              </p>

              <p className="text-sm text-gray-500 mt-3">Tutor Name</p>

              <p className="font-medium text-gray-800">{tutor?.name}</p>
            </div>

            {formerror && (
              <p className="text-red-500 text-sm text-center mt-4">
                {formerror}
              </p>
            )}

            {success && (
              <p className="text-green-600 text-sm text-center mt-4">
                {success}
              </p>
            )}

            <div className="flex flex-col-reverse sm:flex-row gap-2 justify-between mt-5">
              <button
                type="button"
                onClick={() => {
                  setShowmodal(false);
                  setFormError("");
                  setSuccess("");
                }}
                className="bg-gray-300 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCreateApplication}
                className="btn px-5 py-2 text-white cursor-pointer"
              >
                Create Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
