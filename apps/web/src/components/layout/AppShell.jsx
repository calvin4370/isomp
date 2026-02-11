import { Outlet } from 'react-router-dom'
import { useAccessibilityStore } from '../../store/accessibilityStore'
import { cn } from '../../lib/utils'
import { AccessibilitySidebar } from './AccessibilitySidebar'
import { NavigationSidebar } from './NavigationSidebar'

export function AppShell() {
  const largeText = useAccessibilityStore((state) => state.settings.largeText)

  return (
    <div className={cn('min-h-screen bg-slate-100', largeText && 'text-[17px]')}>
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
