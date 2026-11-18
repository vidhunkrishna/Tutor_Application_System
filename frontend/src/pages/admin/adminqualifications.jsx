import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import axios from "axios";

export default function AdminQualifications() {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getQualifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/qualifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setQualifications(response.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load qualifications.");
      } finally {
        setLoading(false);
      }
    };

    getQualifications();
  }, [token]);

  const handleVerify = async (id) => {
    setError("");
    setSuccess("");

    try {
      const response = await axios.put(
        `http://localhost:8080/qualifications/${id}/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setQualifications((prev) =>
        prev.map((qualification) =>
          qualification.id === id ? response.data : qualification,
        ),
      );

      setSuccess("Qualification verified successfully.");
    } catch (err) {
      console.log(err);
      setError("Failed to verify qualification.");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-300">
      <Sidebar />

      <div className="flex-1 ml-65 min-h-screen bg-slate-300 p-4 sm:p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Qualification Verification
          </h1>

          <p className="text-gray-600 mt-1">
            Review and verify tutor qualifications.
          </p>
        </div>

        {loading && <p className="text-gray-600">Loading qualifications...</p>}

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

        {!loading && qualifications.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center">
            <p className="text-gray-700">No qualifications found.</p>
          </div>
        )}

        {!loading && qualifications.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="hidden md:grid grid-cols-6 gap-4 p-4 bg-gray-100 font-semibold text-gray-700">
              <p>Tutor</p>
              <p>Degree</p>
              <p>Institution</p>
              <p>Year</p>
              <p>Status</p>
              <p>Action</p>
            </div>

            {qualifications.map((qualification) => (
              <div
                key={qualification.id}
                className="flex flex-col md:grid md:grid-cols-6 gap-3 md:gap-4 md:items-center p-5 md:p-4 border-t border-gray-200"
              >
                <div>
                  <p className="text-xs text-gray-500 md:hidden">Tutor</p>
                  <p className="text-gray-800 font-medium">
                    {qualification.tutorName || "Unknown"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 md:hidden">Degree</p>
                  <p className="text-gray-700">{qualification.degreeType}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 md:hidden">Institution</p>
                  <p className="text-gray-700 break-words">
                    {qualification.institution}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 md:hidden">Year</p>
                  <p className="text-gray-700">
                    {qualification.graduationYear}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 md:hidden">Status</p>
                  <p
                    className={`font-medium ${
                      qualification.verificationStatus === "VERIFIED"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {qualification.verificationStatus}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 md:hidden mb-1">Action</p>

                  {qualification.verificationStatus === "VERIFIED" ? (
                    <p className="text-green-600 font-medium">Verified</p>
                  ) : (
                    <button
                      onClick={() => handleVerify(qualification.id)}
                      className="w-fit px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 cursor-pointer"
                    >
                      Verify
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
