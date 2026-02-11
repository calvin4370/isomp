import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { ChannelsPage } from './pages/ChannelsPage'
import { ExplorePage } from './pages/ExplorePage'
import { ProfilePage } from './pages/ProfilePage'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/channels" element={<ChannelsPage />} />
        <Route path="/" element={<Navigate to="/explore" replace />} />
      </Route>
    </Routes>
  )
}

export default App
