import React, { useState, useEffect } from "react";

// Replace with your Google Apps Script URL from Step 1
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

export default function App() {
  const [dbData, setDbData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch all website data on load
  useEffect(() => {
    async function fetchSiteData() {
      try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const data = await response.json();
        setDbData(data);
      } catch (error) {
        console.error("Failed to load website configuration:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSiteData();
  }, []);

  // 2. Helper function to check if a section is visible
  const isVisible = (sectionId) => {
    if (!dbData.Section_Visibility) return true; // Default to visible while loading
    const match = dbData.Section_Visibility.find(
      (item) => item.section_id === sectionId
    );
    return match ? String(match.is_visible).toLowerCase() === "true" : true;
  };

  if (isLoading) {
    return <div className="p-8 text-center font-bold">Loading Clevera Academy...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Announcement Bar */}
      {isVisible("announcement_bar") && (
        <AnnouncementBar data={dbData.Site_Settings} />
      )}

      {/* Hero Section */}
      {isVisible("hero_section") && <HeroSection data={dbData.Site_Settings} />}

      {/* Client Logos */}
      {isVisible("client_logos") && (
        <TrustedByLogos logos={dbData.Client_Logos} />
      )}

      {/* Training Modules */}
      {isVisible("activity_lineup") && (
        <ModulesGrid modules={dbData.Modules} />
      )}

      {/* Trainers Directory */}
      {isVisible("trainers_directory") && (
        <TrainersSection trainers={dbData.Trainers} />
      )}

      {/* HRDC Grant Calculator */}
      {isVisible("hrdc_calculator") && (
        <CalculatorSection config={dbData.Calculator_Logic} />
      )}

      {/* Testimonials */}
      {isVisible("testimonials") && (
        <TestimonialsSection reviews={dbData.Testimonials} />
      )}

      {/* Footer */}
      {isVisible("global_footer") && <Footer data={dbData.Site_Settings} />}
    </div>
  );
}
