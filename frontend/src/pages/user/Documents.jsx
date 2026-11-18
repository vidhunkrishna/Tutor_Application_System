import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

export default function Documents() {
  const [showmodal, setShowmodal] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [originalFileName, setOriginalFileName] = useState("");

  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  const [tutor, setTutor] = useState(null);
  const [documents, setDocuments] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const tutorData = await axios.get(
          `http://localhost:8080/tutors/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setTutor(tutorData.data);

        const documentData = await axios.get(
          `http://localhost:8080/documents/tutor/${tutorData.data.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setDocuments(documentData.data);
      } catch (err) {
        console.log(err);

        if (err.response?.status === 404) {
          setPageError(
            "Tutor profile not found. Please create your tutor profile first.",
          );
        } else {
          setPageError("Failed to load documents.");
        }
      } finally {
        setLoading(false);
      }
    };

    getDocuments();
  }, [token, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");
    setSuccess("");

    try {
      if (!tutor) {
        setFormError("Tutor profile not found.");
        return;
      }

      const data = await axios.post(
        "http://localhost:8080/documents",
        {
          documentType,
          documentUrl,
          fileSize: Number(fileSize),
          originalFileName,
          tutorId: tutor.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!data.data?.id) {
        setFormError(
          data.data?.documentType ||
            data.data?.documentUrl ||
            data.data?.fileSize ||
            data.data?.message ||
            "Failed to upload document.",
        );
        return;
      }

      setDocuments((prev) => [...prev, data.data]);

      setSuccess("Document uploaded successfully!");

      setDocumentType("");
      setDocumentUrl("");
      setFileSize("");
      setOriginalFileName("");

      setTimeout(() => {
        setShowmodal(false);
        setSuccess("");
      }, 2000);
    } catch (err) {
      console.log(err);

      setFormError(
        err.response?.data?.documentType ||
          err.response?.data?.documentUrl ||
          err.response?.data?.fileSize ||
          err.response?.data?.message ||
          "Failed to upload document.",
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
              My Documents
            </p>

            <p className="text-left text-sm font-normal text-gray-500">
              Manage your documents and verification status.
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
            Add Document
          </button>
        </div>

        {loading && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">Loading documents...</p>
          </div>
        )}

        {!loading && pageError && (
          <div className="mt-8 text-center">
            <p className="text-red-700 text-sm">{pageError}</p>
          </div>
        )}

        {!loading && !pageError && documents.length === 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-700 font-medium">
              No documents uploaded yet.
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Click "Add Document" to upload your first document.
            </p>
          </div>
        )}

        {!loading && !pageError && documents.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {documents.map((document) => (
              <div
                key={document.id}
                className="bg-white rounded-xl shadow-sm p-5 sm:p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {document.documentType}
                </h2>

                <p className="text-gray-600 mt-2 break-all">
                  {document.originalFileName}
                </p>

                <p className="text-sm text-gray-500 mt-4">File Size</p>

                <p className="font-medium text-gray-800">
                  {document.fileSize} bytes
                </p>

                <p className="text-sm text-gray-500 mt-4">Uploaded On</p>

                <p className="font-medium text-gray-800">
                  {document.uploadDate
                    ? new Date(document.uploadDate).toLocaleDateString()
                    : "N/A"}
                </p>

                <div className="mt-4">
                  <span className="text-sm font-medium text-gray-700">
                    Status: {document.verificationStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showmodal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="h-auto bg-white rounded-2xl shadow-xl p-5 sm:p-6 w-full max-w-80">
            <div className="text-center font-bold text-gray-900 text-xl p-6 sm:p-8">
              Add Document
            </div>

            <form
              className="flex flex-col items-center justify-center mb-2"
              onSubmit={handleSubmit}
            >
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="inp bg-slate-300 text-gray-800 mt-1"
                required
              >
                <option value="">Select document type</option>
                <option value="ID_PROOF">ID Proof</option>
                <option value="DEGREE_CERTIFICATE">Degree Certificate</option>
                <option value="EXPERIENCE_LETTER">Experience Letter</option>
                <option value="PHOTO">Photo</option>
                <option value="OTHER">Other</option>
              </select>

              <input
                type="text"
                value={originalFileName}
                onChange={(e) => setOriginalFileName(e.target.value)}
                className="inp bg-slate-300 placeholder-gray-600 text-gray-800 mt-1"
                placeholder="Enter file name"
                required
              />

              <input
                type="text"
                value={documentUrl}
                onChange={(e) => setDocumentUrl(e.target.value)}
                className="inp bg-slate-300 placeholder-gray-600 text-gray-800 mt-1"
                placeholder="Enter document Drive URL"
                required
              />

              <input
                type="number"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                className="inp bg-slate-300 placeholder-gray-600 text-gray-800 mt-1"
                placeholder="Enter file size in bytes"
                min="1"
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

              <div className="flex flex-col-reverse sm:flex-row gap-2 w-full justify-between mt-3">
                <button
                  onClick={() => {
                    setShowmodal(false);
                    setFormError("");
                    setSuccess("");
                  }}
                  className="bg-gray-300 px-4 py-1 ml-0 sm:ml-2 rounded-md w-full sm:w-33 cursor-pointer hover:bg-gray-400 duration-300"
                  type="button"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn mr-0 sm:mr-2 w-full sm:w-33 bg-slate-700 text-white hover:bg-slate-800"
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
