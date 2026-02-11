import { useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

const channels = [
  {
    id: 'deaf',
    name: 'Deaf Community',
    description: 'Sign language stories and resources.',
    broadcast: 'Live now: Visual storytelling and caption workflows.',
    event: 'Sign Language Creator Jam - Friday 7:00 PM',
  },
  {
    id: 'blind',
    name: 'Blind Community',
    description: 'Audio-first creator tools and support.',
    broadcast: 'Live now: Audio-first content production setup.',
    event: 'Voice Navigation Meetup - Saturday 3:00 PM',
  },
  {
    id: 'neuro',
    name: 'Neurodivergent Community',
    description: 'Focused discussions and event space.',
    broadcast: 'Live now: Sustainable creator routines and planning.',
    event: 'Low-stimulation Networking Session - Sunday 2:00 PM',
  },
]

export function ChannelsPage() {
  const [activeChannelId, setActiveChannelId] = useState(channels[0].id)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const activeChannel = useMemo(
    () => channels.find((channel) => channel.id === activeChannelId) ?? channels[0],
    [activeChannelId],
  )

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
                <Button size="sm" onClick={() => setActiveChannelId(channel.id)}>
                  {channel.id === activeChannelId ? 'Viewing Channel' : 'Join Channel'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Broadcast + Events (Prototype)</CardTitle>
            <CardDescription>Selected channel: {activeChannel.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-slate-700">{activeChannel.broadcast}</p>
            <p className="text-sm text-slate-700">Upcoming event: {activeChannel.event}</p>
            <Button variant="outline" onClick={() => setShowBookingModal(true)}>
              Open Booking Modal
            </Button>
          </CardContent>
        </Card>
      </div>
      {showBookingModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-900/45 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Book Event</CardTitle>
              <CardDescription>{activeChannel.event}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-slate-700">
                Confirm your interest for this event in {activeChannel.name}.
              </p>
              <div className="flex gap-2">
                <Button size="sm">Interested</Button>
                <Button size="sm" variant="outline" onClick={() => setShowBookingModal(false)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  )
}
