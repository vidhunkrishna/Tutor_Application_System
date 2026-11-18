import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import axios from "axios";

export default function EducationTutors() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getTutors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/tutors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTutors(response.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load tutors.");
      } finally {
        setLoading(false);
      }
    };

    getTutors();
  }, [token]);

  const filteredTutors = tutors.filter((tutor) => {
    const searchText = search.toLowerCase();

    return (
      tutor.name?.toLowerCase().includes(searchText) ||
      tutor.subject?.toLowerCase().includes(searchText) ||
      tutor.phoneNumber?.toString().includes(searchText)
    );
  });

  return (
    <div className="flex min-h-screen bg-slate-300">
      <Sidebar />

      <div className="flex-1 ml-65 min-h-screen bg-slate-300 p-4 sm:p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Tutor Management
          </h1>

          <p className="text-gray-600 mt-1">
            View registered tutors.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-5">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, subject or phone number..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 outline-none focus:border-indigo-500"
          />
        </div>

        {loading && <p className="text-gray-600">Loading tutors...</p>}

        {!loading && error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        {!loading && !error && filteredTutors.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center">
            <p className="text-gray-700 font-medium">No tutors found.</p>
          </div>
        )}

        {!loading && filteredTutors.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="hidden md:grid grid-cols-4 gap-4 p-4 bg-gray-100 font-semibold text-gray-700">
              <p>Name</p>
              <p>Subject</p>
              <p>Phone</p>
              <p>Status</p>
            </div>

            {filteredTutors.map((tutor) => (
              <div
                key={tutor.id}
                className="flex flex-col md:grid md:grid-cols-4 gap-3 md:gap-4 md:items-center p-5 md:p-4 border-t border-gray-200"
              >
                <div>
                  <p className="text-xs text-gray-500 md:hidden">Name</p>
                  <p className="text-gray-800 font-medium">{tutor.name}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 md:hidden">Subject</p>
                  <p className="text-gray-700">{tutor.subject}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 md:hidden">Phone</p>
                  <p className="text-gray-700">{tutor.phoneNumber}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 md:hidden">Status</p>
                  <p
                    className={`font-medium ${
                      tutor.status === "APPROVED"
                        ? "text-green-600"
                        : tutor.status === "REJECTED"
                          ? "text-red-600"
                          : "text-yellow-600"
                    }`}
                  >
                    {tutor.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
