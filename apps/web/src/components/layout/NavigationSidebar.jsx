import { Compass, PlusSquare, UserCircle2, Users2 } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/utils'

const navItems = [
  { to: '/explore', label: 'Explore', icon: Compass },
  { to: '/profile', label: 'Profile', icon: UserCircle2 },
  { to: '/channels', label: 'Channels', icon: Users2 },
  { to: '/create', label: 'Create', icon: PlusSquare },
]

export function NavigationSidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-slate-200 bg-white p-4">
      <div className="mb-6 px-2">
        <h1 className="text-3xl font-extrabold uppercase tracking-wide text-indigo-600">ISOMP</h1>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100',
              )
            }
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
