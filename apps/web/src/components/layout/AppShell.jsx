import { Outlet } from 'react-router-dom'
import { AccessibilitySidebar } from './AccessibilitySidebar'
import { NavigationSidebar } from './NavigationSidebar'

export function AppShell() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex w-full max-w-[1600px]">
        <NavigationSidebar />
        <main className="min-h-screen flex-1 p-6">
          <Outlet />
        </main>
        <AccessibilitySidebar />
      </div>
    </div>
  )
}
