import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getProfile = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/tutors/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setProfile(response.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setProfile(null);
        } else {
          console.log(err);
          setError("Failed to load profile.");
        }
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [userId, token]);

  const handlesubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/tutors",
        {
          name,
          subject,
          phoneNumber,
          status: "DRAFT",
          userId: Number(userId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("CREATE RESPONSE:", response.data);

      if (!response.data?.id) {
        const validationError =
          response.data?.phoneNumber ||
          response.data?.name ||
          response.data?.subject ||
          "Failed to create tutor profile.";

        setError(validationError);
        return;
      }

      setProfile(response.data);
      localStorage.setItem("tutorId", response.data.id);

      setSuccess(
        "Your tutor profile has been created. Please logout and login again to activate your tutor account and access all tutor features.",
      );

      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("tutorId");
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      console.log("CREATE ERROR:", err);

      setProfile(null);

      const validationError =
        err.response?.data?.phoneNumber ||
        err.response?.data?.name ||
        err.response?.data?.subject ||
        err.response?.data?.message ||
        "Failed to create tutor profile.";

      setError(validationError);
    }
  };

  const handleEdit = () => {
    setName(profile.name);
    setSubject(profile.subject);
    setPhonenumber(profile.phoneNumber);
    setSuccess("");
    setError("");
    setEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    try {
      const data = await axios.put(
        `http://localhost:8080/tutors/${profile.id}`,
        {
          name,
          subject,
          phoneNumber,
          status: profile.status,
          userId: Number(userId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProfile(data.data);
      setEditing(false);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message || "Failed to update tutor profile.",
      );
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setSuccess("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-300 p-4 sm:p-6 md:p-8">
      {loading ? (
        <p className="text-gray-700">Loading...</p>
      ) : profile ? (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Tutor Profile
            </h1>

            <p className="text-gray-600 mt-1">
              Manage your tutor profile information.
            </p>
          </div>

          {editing ? (
            <div className="bg-white rounded-xl shadow-sm p-5 sm:p-7 w-full max-w-2xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Edit Tutor Profile
              </h2>

              <form onSubmit={handleUpdate} className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>

                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 cursor-pointer"
                  >
                    Update Profile
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                {success && <p className="text-green-600 text-sm">{success}</p>}
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 w-full max-w-xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  My Profile
                </h2>

                <button
                  onClick={handleEdit}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer"
                >
                  Edit Profile
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium text-gray-800">{profile.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Subject</p>
                  <p className="font-medium text-gray-800">{profile.subject}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium text-gray-800">
                    {profile.phoneNumber}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium text-gray-800">{profile.status}</p>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

              {success && (
                <p className="text-green-600 text-sm mt-4">{success}</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Tutor Profile
            </h1>

            <p className="text-gray-600 mt-1">
              Create your tutor profile to continue.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 sm:p-7 w-full max-w-2xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Create Tutor Profile
            </h2>

            <form onSubmit={handlesubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Enter your subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>

                <input
                  type="text"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 cursor-pointer"
              >
                Create Profile
              </button>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              {success && <p className="text-green-600 text-sm">{success}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
