import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { useAccessibilityStore } from '../store/accessibilityStore'

const contentTypes = ['Text', 'Image', 'Video', 'Sign Language Video']

export function CreatePage() {
  const [contentType, setContentType] = useState(contentTypes[0])
  const [caption, setCaption] = useState('')
  const [isPublishing, setIsPublishing] = useState(false)
  const settings = useAccessibilityStore((state) => state.settings)

  const handlePublish = async () => {
    setIsPublishing(true)
    await new Promise((resolve) => setTimeout(resolve, 700))
    setIsPublishing(false)
    setCaption('')
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
