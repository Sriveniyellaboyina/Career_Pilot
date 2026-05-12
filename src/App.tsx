import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

import { AppLayout } from "./components/layout/AppLayout";

import ResumeUpload from "./pages/ResumeUpload";
import SkillExtraction from "./pages/SkillExtraction";
import Verification from "./pages/Verification";
import Interview from "./pages/Interview";
import Jobs from "./pages/Jobs";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import EditProfile from "./pages/EditProfile";

// ======================================
// IMPORT COURSES PAGE
// ======================================
import Courses from "./pages/Courses";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={<Auth />}
        />

        {/* DASHBOARD LAYOUT */}
        <Route element={<AppLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/resume"
            element={<ResumeUpload />}
          />

          <Route
            path="/skills"
            element={<SkillExtraction />}
          />

          <Route
            path="/verification"
            element={<Verification />}
          />

          <Route
            path="/results"
            element={<Results />}
          />

          {/* ====================================== */}
          {/* COURSES PAGE */}
          {/* ====================================== */}
          <Route
            path="/courses"
            element={<Courses />}
          />

          <Route
            path="/interview"
            element={<Interview />}
          />

          <Route
            path="/jobs"
            element={<Jobs />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* EDIT PROFILE */}
          <Route
            path="/edit-profile"
            element={<EditProfile />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

        {/* 404 PAGE */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;