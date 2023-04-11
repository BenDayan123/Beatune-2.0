import React, { Suspense } from "react";
import SideBar from "../SideBar";
import { Outlet } from "react-router-dom";
import MusicPlayer from "../MusicPlayer";
import TopBar from "../Top Bar";
import SpinnerLoading from "../../components/Loading/spinner";
import { MusicPlayerProvider } from "../../hooks/useMusicPlayer";
import { DownloaderProvider } from "../../hooks/useDownloader";
import "./style.scss";

const MainApp: React.FC = () => {
  return (
    <main className="main-app-window">
      <DownloaderProvider>
        <SideBar />
        <MusicPlayerProvider>
          <main className="main-window">
            <TopBar />
            <Suspense fallback={<SpinnerLoading />}>
              <Outlet />
            </Suspense>
          </main>
          <MusicPlayer />
        </MusicPlayerProvider>
      </DownloaderProvider>
    </main>
  );
};

export default MainApp;
// initial={{ opacity: 0 }}
// animate={{ opacity: 1 }}
// transition={{ duration: 1 }}
