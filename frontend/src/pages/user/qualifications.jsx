import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

export default function Qualifications() {
  const [showmodal, setShowmodal] = useState(false);
  const [degreeType, setDegreeType] = useState("");
  const [institution, setInstitution] = useState("");
  const [graduationYear, setGraduationyear] = useState("");

  const [loading, setLoading] = useState(true);

  const [pageError, setPageError] = useState("");
  const [formError, setFormError] = useState("");

  const [success, setSuccess] = useState("");
  const [tutor, setTutor] = useState(null);
  const [quals, setQuals] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getTutor = async () => {
      try {
        const tutordata = await axios.get(
          `http://localhost:8080/tutors/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setTutor(tutordata.data);

        const qualifications = await axios.get(
          `http://localhost:8080/qualifications/tutor/${tutordata.data.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setQuals(qualifications.data);
      } catch (err) {
        console.log(err);

        if (err.response?.status === 404) {
          setPageError(
            "Tutor profile not found. Please create your tutor profile first.",
          );
        } else {
          setPageError("Failed to load qualifications.");
        }
      } finally {
        setLoading(false);
      }
    };

    getTutor();
  }, [token, userId]);

  const handlesubmit = async (e) => {
    e.preventDefault();

    setFormError("");
    setSuccess("");

    try {
      if (!tutor) {
        setFormError("Tutor profile not found.");
        return;
      }

      const data = await axios.post(
        "http://localhost:8080/qualifications",
        {
          degreeType,
          institution,
          graduationYear: Number(graduationYear),
          tutorId: tutor.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("DONE", data.data);

      if (!data.data?.id) {
        setFormError(
          data.data?.degreeType ||
            data.data?.institution ||
            data.data?.graduationYear ||
            data.data?.message ||
            "Failed to add qualification.",
        );
        return;
      }

      setQuals((prev) => [...prev, data.data]);

      setSuccess("Qualification added successfully!");

      setDegreeType("");
      setInstitution("");
      setGraduationyear("");

      setTimeout(() => {
        setShowmodal(false);
        setSuccess("");
      }, 2000);
    } catch (err) {
      console.log(err);

      setFormError(
        err.response?.data?.degreeType ||
          err.response?.data?.institution ||
          err.response?.data?.graduationYear ||
          err.response?.data?.message ||
          "Failed to add qualification.",
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
              My Qualifications
            </p>

            <p className="text-left text-sm font-normal text-gray-500 mt-1">
              Manage your academic qualifications and verification status.
            </p>
          </div>

          <button
            onClick={() => {
              setShowmodal(true);

              setFormError("");
              setSuccess("");
            }}
            className="flex w-fit items-center gap-1.5 px-4 py-2 cursor-pointer btn text-white font-bold"
          >
            <FaPlus />
            Add Qualification
          </button>
        </div>

        {loading && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">Loading qualifications...</p>
          </div>
        )}

        {!loading && pageError && (
          <div className="mt-8 text-center">
            <p className="text-red-700 text-sm">{pageError}</p>
          </div>
        )}

        {!loading && !pageError && quals.length === 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-700 font-medium">
              No qualifications added yet.
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Click "Add Qualification" to add your first qualification.
            </p>
          </div>
        )}

        {!loading && !pageError && quals.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {quals.map((qualification) => (
              <div
                key={qualification.id}
                className="bg-white rounded-xl shadow-sm p-5 sm:p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {qualification.degreeType}
                </h2>

                <p className="text-gray-600 mt-2 break-words">
                  {qualification.institution}
                </p>

                <p className="text-sm text-gray-500 mt-4">Graduation Year</p>

                <p className="font-medium text-gray-800">
                  {qualification.graduationYear}
                </p>

                <div className="mt-4">
                  <span className="text-sm font-medium text-gray-700">
                    Status: {qualification.verificationStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showmodal && (
        <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center p-4">
          <div className="h-auto bg-white rounded-2xl shadow-xl p-5 sm:p-6 w-full max-w-80">
            <div className="text-center font-bold text-gray-900 text-xl p-6 sm:p-8">
              Add Qualifications
            </div>

            <form
              className="flex flex-col items-center justify-center mb-2"
              onSubmit={handlesubmit}
            >
              <input
                type="text"
                value={degreeType}
                onChange={(e) => setDegreeType(e.target.value)}
                className="inp bg-slate-300 placeholder-gray-600 text-gray-800 mt-1 w-full"
                placeholder="Enter your DegreeType"
                required
              />

              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="inp bg-slate-300 placeholder-gray-600 text-gray-800 mt-1 w-full"
                placeholder="Enter your Institution"
                required
              />

              <input
                type="number"
                value={graduationYear}
                onChange={(e) => setGraduationyear(e.target.value)}
                className="inp bg-slate-300 placeholder-gray-600 text-gray-800 mt-1 w-full"
                placeholder="Enter graduation year"
                min="1950"
                max="2026"
                required
              />

              {formError && (
                <p className="text-red-500 text-sm mt-3 text-center">
                  {formError}
                </p>
              )}

              {success && (
                <p className="text-green-600 text-sm mt-3 text-center">
                  {success}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-2 w-full justify-between mt-3">
                <button
                  onClick={() => {
                    setShowmodal(false);
                    setFormError("");
                    setSuccess("");
                  }}
                  className="bg-gray-300 px-4 py-1 rounded-md w-full sm:w-33 cursor-pointer hover:bg-gray-400 duration-300"
                  type="button"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn w-full sm:w-33 bg-slate-700 text-white hover:bg-slate-800"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
