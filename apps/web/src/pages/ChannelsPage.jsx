import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

const channels = [
  { id: 'deaf', name: 'Deaf Community', description: 'Sign language stories and resources.' },
  { id: 'blind', name: 'Blind Community', description: 'Audio-first creator tools and support.' },
  { id: 'neuro', name: 'Neurodivergent Community', description: 'Focused discussions and event space.' },
]

export function ChannelsPage() {
  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Channels</CardTitle>
          <CardDescription>Join communities and access broadcasts or upcoming events.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="space-y-4">
          {channels.map((channel) => (
            <Card key={channel.id}>
              <CardContent className="space-y-3 p-4">
                <p className="text-base font-semibold text-slate-900">{channel.name}</p>
                <p className="text-sm text-slate-600">{channel.description}</p>
                <Button size="sm">Join Channel</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Broadcast + Events (Prototype)</CardTitle>
            <CardDescription>
              Selecting a channel will populate live broadcast and booking details in this panel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Open Booking Modal Placeholder</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
