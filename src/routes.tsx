import React, { useEffect, lazy } from "react";
import LoginPage from "./components/auth/login";
import ArtistPage from "./components/Pages/Artist";
import MainApp from "./components/App";
import { ProtectedRoute } from "./ProtectedRoute";
import { Routes, Route, useNavigate } from "react-router-dom";
import { NotificationProvider } from "./hooks/useNotifications";
import SignUpPage from "./components/auth/signup";

const AlbumPage = lazy(() => import("./components/Pages/Album"));
const PlaylistPage = lazy(() => import("./components/Pages/Playlist"));
const PlaylistsPage = lazy(() => import("./components/Pages/Playlists"));
const Queue = lazy(() => import("./components/Pages/Query"));
const LyricsBox = lazy(() => import("./components/lyricsBox"));
const SearchPage = lazy(() => import("./components/Pages/SearchResults"));
const SettingsPage = lazy(() => import("./components/Pages/Settings"));

const AppRoutes: React.FC = () => {
  const nav = useNavigate();

  useEffect(() => nav("/app"), []);

  return (
    <Routes>
      <Route
        path="/app"
        element={
          <ProtectedRoute redirect="/login">
            <NotificationProvider>
              <MainApp />
            </NotificationProvider>
          </ProtectedRoute>
        }
      >
        <Route path="home/*" element={<ArtistPage />} />
        <Route path="playlist/*" element={<PlaylistsPage />} />
        <Route path="playlist/:id" element={<PlaylistPage />} />
        <Route path="album/:id" element={<AlbumPage />} />
        <Route path="queue/*" element={<Queue />} />
        <Route path="lyrics" element={<LyricsBox />} />
        <Route path="search/:query" element={<SearchPage />} />
        <Route path="search/:query/:filter" element={<SearchPage />} />
        <Route path="settings/*" element={<SettingsPage />} />
        <Route path="*" element={<h1>Not Ready!</h1>} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<h1>Doesn't Exists 404!</h1>} />
    </Routes>
  );
};

export default AppRoutes;
