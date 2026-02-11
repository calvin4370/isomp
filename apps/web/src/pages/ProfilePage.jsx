import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { getProfile, saveProfile } from '../services/api/features'
import { useProfileStore } from '../store/profileStore'

const profilePosts = [
  { id: '1', title: 'Daily accessibility workflow' },
  { id: '2', title: 'Community event recap' },
  { id: '3', title: 'Sign language tutorial snippet' },
  { id: '4', title: 'Voice navigation walkthrough' },
  { id: '5', title: 'Inclusive creator setup' },
  { id: '6', title: 'Captioned storytelling example' },
]

export function ProfilePage() {
  const profile = useProfileStore((state) => state.profile)
  const updateProfile = useProfileStore((state) => state.updateProfile)
  const setProfileFromApi = useProfileStore((state) => state.setProfileFromApi)
  const hasHydratedFromApi = useProfileStore((state) => state.hasHydratedFromApi)
  const [showEditor, setShowEditor] = useState(false)
  const [draftHandle, setDraftHandle] = useState(profile.handle)
  const [draftBio, setDraftBio] = useState(profile.bio)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (hasHydratedFromApi) {
      return
    }
    let mounted = true
    getProfile().then((remoteProfile) => {
      if (!mounted || !remoteProfile) {
        return
      }
      setProfileFromApi(remoteProfile)
      setDraftHandle(remoteProfile.handle)
      setDraftBio(remoteProfile.bio)
    })
    return () => {
      mounted = false
    }
  }, [hasHydratedFromApi, setProfileFromApi])

  const onSaveProfile = async () => {
    const payload = {
      handle: draftHandle.trim() || profile.handle,
      bio: draftBio.trim() || profile.bio,
    }
    setIsSaving(true)
    const savedProfile = await saveProfile(payload)
    updateProfile(savedProfile)
    setIsSaving(false)
    setShowEditor(false)
  }

  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Creator Profile</CardTitle>
          <CardDescription>Showcase posts and personalize profile details.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">{profile.handle}</p>
            <p className="text-sm text-slate-500">
              Followers: {profile.followers.toLocaleString()} • Following:{' '}
              {profile.following.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-slate-600">{profile.bio}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setDraftHandle(profile.handle)
              setDraftBio(profile.bio)
              setShowEditor(true)
            }}
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>
      {showEditor && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-900/45 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Update your public handle and bio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <label htmlFor="handle" className="text-sm font-medium text-slate-700">
                  Handle
                </label>
                <input
                  id="handle"
                  value={draftHandle}
                  onChange={(event) => setDraftHandle(event.target.value)}
                  className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="bio" className="text-sm font-medium text-slate-700">
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={draftBio}
                  onChange={(event) => setDraftBio(event.target.value)}
                  className="min-h-24 w-full rounded-md border border-slate-300 p-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={onSaveProfile} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowEditor(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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
