import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

export default function Landingpage() {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs px-6 py-3.5 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-6">
          <p className="font-extrabold text-slate-900 text-lg tracking-tight">
            Tutor Application System
          </p>
          <div className="hidden md:flex flex-row gap-5 font-medium text-sm text-slate-600">
            <Link to="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <a href="#about" className="hover:text-indigo-600 transition-colors">
              About
            </a>
          </div>
        </div>
        <div className="flex flex-row items-center gap-3 ml-auto">
          <Link
            to="/login"
            className="flex flex-row items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors"
          >
            <FiLogIn className="text-base" />
            Login
          </Link>
          <Link
            to="/register"
            className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-xs hover:bg-indigo-700 hover:shadow transition-all duration-200"
          >
            Register as Tutor
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-20 pb-16 px-4 text-center bg-gradient-to-b from-indigo-50/50 via-slate-50 to-slate-50">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 mb-6">
          Streamlined Tutor Applications
        </span>
        <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight max-w-3xl mb-6">
          Tutor Application System
        </h1>
        <p className="text-xl md:text-2xl text-indigo-600 font-semibold mb-4 max-w-2xl">
          Find, Apply, and Manage Teaching Opportunities Easily
        </p>
        <p className="text-slate-600 max-w-xl text-base leading-relaxed mb-10">
          A secure platform for tutors to submit applications, manage
          qualifications, and track their application status.
        </p>
        <div className="flex flex-row flex-wrap justify-center gap-4">
          <button
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow-xs hover:bg-indigo-700 hover:shadow transition-all cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register as Tutor
          </button>
          <button
            className="flex items-center gap-2 border border-slate-300 bg-white text-slate-700 px-6 py-3 rounded-lg font-semibold shadow-xs hover:bg-slate-50 hover:border-slate-400 transition-all cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <FiLogIn />
            Login
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="flex flex-col justify-center items-center py-16 px-4 max-w-6xl mx-auto">
        <h2 className="font-bold text-3xl text-slate-900 mb-10 tracking-tight">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-2">
            <h3 className="font-bold text-lg text-slate-900">Easy Application</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Submit your tutor application through a structured process.
            </p>
          </div>
          <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-2">
            <h3 className="font-bold text-lg text-slate-900">
              Application Tracking
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Track your application status throughout the review process.
            </p>
          </div>
          <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-2">
            <h3 className="font-bold text-lg text-slate-900">
              Qualification Verification
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Upload and manage qualifications and supporting documents.
            </p>
          </div>
          <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-2">
            <h3 className="font-bold text-lg text-slate-900">
              Performance Insights
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              View application and performance analytics.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="flex flex-col justify-center items-center py-16 px-4 bg-slate-100/70 border-y border-slate-200/60 w-full">
        <h2 className="font-bold text-3xl text-slate-900 mb-10 tracking-tight">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
          <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 flex flex-col items-center text-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-base">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">Register</h3>
            <p className="text-slate-600 text-sm">Create your account</p>
          </div>
          <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 flex flex-col items-center text-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-base">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              Submit Application
            </h3>
            <p className="text-slate-600 text-sm">Fill details & documents</p>
          </div>
          <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 flex flex-col items-center text-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-base">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base">Review</h3>
            <p className="text-slate-600 text-sm">Qualification reviewed</p>
          </div>
          <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 flex flex-col items-center text-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-base">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-base">Track Status</h3>
            <p className="text-slate-600 text-sm">Monitor your progress</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="about"
        className="flex flex-col justify-center items-center py-20 px-4 max-w-4xl mx-auto scroll-mt-16"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
          About Us
        </h2>
        <p className="text-xl font-semibold text-indigo-600 mb-8">
          Tutor Application System
        </p>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 md:p-10 shadow-xs text-slate-600 space-y-6 text-center leading-relaxed w-full">
          <p>
            Tutor Application System is a secure web-based platform designed to
            simplify the tutor application and management process. It allows
            prospective tutors to create profiles, submit their applications,
            upload qualifications and supporting documents, and track their
            application status throughout the review process.
          </p>
          <p>
            The platform also provides Education Managers and Administrators with
            tools to review applications, verify tutor qualifications, manage
            tutor accounts, monitor application progress, and access educational
            analytics.
          </p>

          <div className="pt-4 border-t border-slate-100 text-left">
            <h3 className="font-bold text-slate-900 text-lg mb-4 text-center">
              What the platform provides
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                <strong className="text-slate-900 block mb-1 font-semibold text-base">
                  For Tutors
                </strong>
                Create profiles, submit applications, manage qualifications and
                documents, and track application status.
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                <strong className="text-slate-900 block mb-1 font-semibold text-base">
                  For Education Managers
                </strong>
                Review applications, verify qualifications, manage approval
                workflows, and monitor compliance.
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                <strong className="text-slate-900 block mb-1 font-semibold text-base">
                  For Administrators
                </strong>
                Manage tutors and applications, oversee system operations, and
                access analytics and reports.
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Our Goal</h3>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto">
              To provide a secure, efficient, and transparent platform that
              simplifies tutor applications while helping educational organizations
              manage tutor recruitment, verification, and application workflows
              effectively.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm border-t border-slate-800">
        <p>© 2026 Tutor Application System</p>
      </footer>
    </div>
  );
}

