import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { ChannelsPage } from './pages/ChannelsPage'
import { CreatePage } from './pages/CreatePage'
import { ExplorePage } from './pages/ExplorePage'
import { ProfilePage } from './pages/ProfilePage'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/channels" element={<ChannelsPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/" element={<Navigate to="/explore" replace />} />
      </Route>
    </Routes>
  )
}

export default App
