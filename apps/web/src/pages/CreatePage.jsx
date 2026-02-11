import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { createPost } from '../services/api/features'
import { useAccessibilityStore } from '../store/accessibilityStore'
import { useFeedStore } from '../store/feedStore'

const contentTypes = ['Text', 'Image', 'Video', 'Sign Language Video']

export function CreatePage() {
  const navigate = useNavigate()
  const [contentType, setContentType] = useState(contentTypes[0])
  const [caption, setCaption] = useState('')
  const [isPublishing, setIsPublishing] = useState(false)
  const [author, setAuthor] = useState('ISOMP Creator')
  const [publishMessage, setPublishMessage] = useState('')
  const settings = useAccessibilityStore((state) => state.settings)
  const addPost = useFeedStore((state) => state.addPost)

  const handlePublish = async () => {
    setIsPublishing(true)
    const payload = {
      author: author.trim() || 'ISOMP Creator',
      channel: contentType.replace(/\s+/g, '') + 'Channel',
      caption,
      transcript: 'Transcript will be generated from media/audio for this post.',
      imageDescription: 'Image description will be generated when media is attached.',
    }
    const post = await createPost(payload)
    addPost(post)
    setIsPublishing(false)
    setCaption('')
    setPublishMessage('Post published. Redirecting to Explore...')
    navigate('/explore')
  }

  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>Prototype creator workflow with accessibility-aware defaults.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">Content type</p>
            <div className="flex flex-wrap gap-2">
              {contentTypes.map((type) => (
                <Button
                  key={type}
                  size="sm"
                  variant={contentType === type ? 'default' : 'outline'}
                  onClick={() => setContentType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="author" className="text-sm font-medium text-slate-700">
              Display name
            </label>
            <input
              id="author"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="caption" className="text-sm font-medium text-slate-700">
              Caption
            </label>
            <textarea
              id="caption"
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              placeholder="Share your day-in-the-life moment..."
              className="min-h-28 w-full rounded-md border border-slate-300 p-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <Button onClick={handlePublish} disabled={isPublishing || !caption.trim()}>
            {isPublishing ? 'Publishing...' : 'Publish Prototype Post'}
          </Button>
          {publishMessage ? <p className="text-sm text-emerald-700">{publishMessage}</p> : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accessibility-aware publish checks</CardTitle>
          <CardDescription>These checks reflect currently enabled support features.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          <p>- Auto narration: {settings.textToSpeech ? 'Enabled' : 'Disabled'}</p>
          <p>- Transcript generation: {settings.speechToText ? 'Enabled' : 'Disabled'}</p>
          <p>- Sign-to-caption helper: {settings.signToCaption ? 'Enabled' : 'Disabled'}</p>
          <p>- Image description helper: {settings.imageToSpeech ? 'Enabled' : 'Disabled'}</p>
        </CardContent>
      </Card>
    </section>
  )
}
