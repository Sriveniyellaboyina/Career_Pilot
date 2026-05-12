import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export const AppLayout = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen flex w-full relative overflow-hidden">
      <div className="blob w-[500px] h-[500px] bg-primary/20 -top-40 -left-40 animate-blob-shift" />
      <div className="blob w-[400px] h-[400px] bg-primary-glow/20 top-1/3 -right-40 animate-blob-shift" />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-6 lg:p-8 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
