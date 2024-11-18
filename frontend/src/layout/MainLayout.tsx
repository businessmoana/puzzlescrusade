import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { LayoutBackground } from "../types/types";
import BackgroundComponent from "../components/Layout/Background";
import { useAppSelector } from "../hooks";
import LevelUpModal from "../components/LevelUpModal";

interface MainLayoutProps {
  children: React.ReactNode;
  bg?: LayoutBackground;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, bg = "image" }) => {
  const levelUpScreenVisible = useAppSelector(
    (state) => state.app.levelUpScreenVisible
  );
  return (
    <>
      <div className="relative bg-black min-h-screen w-screen font-Articulat-CF">
        <BackgroundComponent bg={bg} />
        <div className={`relative z-20 h-screen main-layout`}>
          <Header />
          <div className="pb-[18.93vw]">{children}</div>
          <Footer />
        </div>
      </div>

      {levelUpScreenVisible && <LevelUpModal />}
    </>
  );
};

export default MainLayout;
