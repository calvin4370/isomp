import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

const profilePosts = [
  { id: '1', title: 'Daily accessibility workflow' },
  { id: '2', title: 'Community event recap' },
  { id: '3', title: 'Sign language tutorial snippet' },
  { id: '4', title: 'Voice navigation walkthrough' },
  { id: '5', title: 'Inclusive creator setup' },
  { id: '6', title: 'Captioned storytelling example' },
]

export function ProfilePage() {
  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Creator Profile</CardTitle>
          <CardDescription>Showcase posts and personalize profile details.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">@isompCreator</p>
            <p className="text-sm text-slate-500">Followers: 1,302 • Following: 248</p>
          </div>
          <Button>Edit Profile</Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Posts Grid (Prototype)</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {profilePosts.map((post) => (
            <Card key={post.id} className="min-h-28">
              <CardContent className="flex h-full items-center p-4">
                <p className="text-sm text-slate-700">{post.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
