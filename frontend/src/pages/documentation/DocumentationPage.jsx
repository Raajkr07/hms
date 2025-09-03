import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/landing/LandingHeader";
import Footer from "../../components/footer/Footer";
import MedicineWasteArticle from "./component/MedicineWasteArticle";
import ProjectProcessOverview from "./component/ProjectProcessOverview";

const DocumentationPage = () => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebar = () => setSidebarCollapsed(prev => !prev);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="dark:bg-[#000000] min-h-screen flex flex-col font-merriweather">
      <Header sidebarCollapsed={sidebarCollapsed} onToggleSidebar={toggleSidebar} />
      <main className="flex-1 p-6 max-w-full overflow-auto pt-[75px]">
        <MedicineWasteArticle />
        <ProjectProcessOverview />
        <Footer />
      </main>
    </div>
  );
};

export default DocumentationPage;
