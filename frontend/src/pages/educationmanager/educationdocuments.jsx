import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import axios from "axios";

export default function EducationDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/documents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDocuments(response.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load documents.");
      } finally {
        setLoading(false);
      }
    };

    getDocuments();
  }, [token]);

  const handleVerify = async (id) => {
    setError("");
    setSuccess("");

    try {
      const response = await axios.put(
        `http://localhost:8080/documents/${id}/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setDocuments((prev) =>
        prev.map((document) => (document.id === id ? response.data : document)),
      );

      setSuccess("Document verified successfully.");
    } catch (err) {
      console.log(err);
      setError("Failed to verify document.");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-300">
      <Sidebar />

      <div className="flex-1 ml-65 min-h-screen bg-slate-300 p-4 sm:p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Document Verification
          </h1>

          <p className="text-gray-600 mt-1">
            Review and verify tutor documents.
          </p>
        </div>

        {loading && <p className="text-gray-600">Loading documents...</p>}

        {!loading && error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

        {!loading && !error && documents.length === 0 && (
          <div className="text-center mt-10">
            <p className="text-gray-700 font-medium">
              No documents uploaded yet.
            </p>
          </div>
        )}

        {!loading && documents.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="hidden md:grid grid-cols-6 gap-4 p-4 bg-gray-100 font-semibold text-gray-700">
              <p>Tutor</p>
              <p>Document Type</p>
              <p>File Name</p>
              <p>Size</p>
              <p>Status</p>
              <p>Action</p>
            </div>

            {documents.map((document) => (
              <div
                key={document.id}
                className="flex flex-col md:grid md:grid-cols-6 gap-3 md:gap-4 md:items-center p-5 md:p-4 border-t border-gray-200"
              >
                <div>
                  <p className="text-xs text-gray-500 md:hidden">Tutor</p>
                  <p className="text-gray-800">
                    {document.tutorName || "Unknown"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 md:hidden">
                    Document Type
                  </p>
                  <p className="text-gray-700">{document.documentType}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 md:hidden">File Name</p>
                  <p className="text-gray-700 break-all md:truncate">
                    {document.originalFileName || "No file name"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 md:hidden">Size</p>
                  <p className="text-gray-600">
                    {document.fileSize
                      ? `${Math.round(document.fileSize / 1024)} KB`
                      : "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 md:hidden">Status</p>
                  <p
                    className={`font-medium ${
                      document.verificationStatus === "VERIFIED"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {document.verificationStatus}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 md:hidden mb-1">Action</p>

                  <div className="flex flex-wrap gap-2">
                    {document.documentUrl && (
                      <a
                        href={document.documentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
                      >
                        View
                      </a>
                    )}

                    {document.verificationStatus !== "VERIFIED" && (
                      <button
                        onClick={() => handleVerify(document.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 cursor-pointer"
                      >
                        Verify
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
