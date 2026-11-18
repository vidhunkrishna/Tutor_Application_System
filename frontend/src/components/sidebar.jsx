import { BiSolidDashboard } from "react-icons/bi";
import { FaFileAlt, FaUser } from "react-icons/fa";
import { MdDescription, MdLogout, MdSchool } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  const role = localStorage.getItem("role");

  const isAdmin = role === "ADMIN";
  const isEduManager = role === "EDUCATION_MANAGER";
  const isStaff = isAdmin || isEduManager;

  const navclass = ({ isActive }) =>
    `side-card ${isActive ? "bg-gray-700" : "text-gray-300"}`;

  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("tutorId");
  };

  const getDashboardPath = () => {
    if (isAdmin) return "/admin/dashboard";
    if (isEduManager) return "/education-manager/dashboard";
    return "/dashboard";
  };

  const getApplicationsPath = () => {
    if (isAdmin) return "/admin/applications";
    if (isEduManager) return "/education-manager/applications";
    return "/applications";
  };

  const getDocumentsPath = () => {
    if (isAdmin) return "/admin/documents";
    if (isEduManager) return "/education-manager/documents";
    return "/documents";
  };

  const getTutorsPath = () => {
    if (isAdmin) return "/admin/tutors";
    if (isEduManager) return "/education-manager/tutors";
    return "/tutors";
  };

  const getQualificationsPath = () => {
    if (isAdmin) return "/admin/qualifications";
    if (isEduManager) return "/education-manager/qualifications";
    return "/qualifications";
  };

  return (
    <div>
      <div className="w-65 fixed top-0 left-0 bg-gray-900/70 h-screen flex flex-col">
        <div className="text-white font-bold text-xl p-2 mt-4">
          Tutor Application
          <p className="text-gray-300 text-[13.75px] mt-2 ml-1">
            Management System
          </p>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <NavLink to={getDashboardPath()} className={navclass}>
            <BiSolidDashboard />
            Dashboard
          </NavLink>

          {isStaff ? (
            <>
              <NavLink to={getApplicationsPath()} className={navclass}>
                <MdDescription />
                Applications
              </NavLink>

              <NavLink to={getDocumentsPath()} className={navclass}>
                <FaFileAlt />
                Document Verification
              </NavLink>

              <NavLink to={getTutorsPath()} className={navclass}>
                <MdSchool />
                Tutor Management
              </NavLink>

              <NavLink to={getQualificationsPath()} className={navclass}>
                <MdSchool />
                Qualification Verification
              </NavLink>

              <div className="mt-auto mb-4">
                <Link
                  to="/login"
                  className="hover:bg-red-600/20 side-card"
                  onClick={handlelogout}
                >
                  <MdLogout />
                  Logout
                </Link>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/applications" className={navclass}>
                <MdDescription />
                Applications
              </NavLink>

              <NavLink to="/qualifications" className={navclass}>
                <MdSchool />
                Qualifications
              </NavLink>

              <NavLink to="/documents" className={navclass}>
                <FaFileAlt />
                Documents
              </NavLink>

              <div className="mt-auto mb-4">
                <NavLink to="/profile" className={navclass}>
                  <FaUser />
                  Profile
                </NavLink>

                <Link
                  to="/login"
                  className="hover:bg-red-600/20 side-card"
                  onClick={handlelogout}
                >
                  <MdLogout />
                  Logout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
