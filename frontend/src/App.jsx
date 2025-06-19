import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Trending, Subscriptions, Library } from "./Pages/index.js";
import MainLayout from './Layout/MainLayout.jsx';
import LoginPage from './Components/Auth/Login.jsx';
import SignupPage from './Components/Auth/SignUp.jsx';
import PrivateRoute from './Components/Auth/PrivateRoute.jsx';
import PublicRoute from './Components/Auth/PublicRoute.jsx';
import LibraryMain from './Components/OtherComponents/LibraryMain.jsx';
import Playlist from './Components/OtherComponents/Playlist.jsx';
import WatchHistory from './Components/OtherComponents/WatchHistory.jsx';
import LikedVideo from './Components/OtherComponents/LikedVideo.jsx';
import Video from './Pages/Video.jsx';
import Account from './Pages/Account.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes - accessible only if NOT logged in */}
        <Route element={<PublicRoute />}> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
         </Route> 

        {/* Private Routes - accessible only if logged in */}
         <Route element={<PrivateRoute />}> 
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="trending" element={<Trending />} />
            <Route path="video/:id" element={<Video />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="account/:username" element={<Account />} />
            <Route path="library" element={<Library />} >
 
              {/* <Route index element={<LibraryMain/>}/> */}
              {/* <Route index element={<Navigate to="playlist" replace />} /> */}
              <Route index element={<Playlist />} /> {/* This will load by default */}
                <Route path="playlist" element={<Playlist />} />
                <Route path="likedvideo" element={<LikedVideo />} />
                <Route path="history" element={<WatchHistory />} />

            </Route>
          
          </Route>
        </Route> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;
