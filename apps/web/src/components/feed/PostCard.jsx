import { MessageCircle, Repeat2, ThumbsUp } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Button } from '../ui/Button'
import { useAccessibilityStore } from '../../store/accessibilityStore'
import { transcribeMedia } from '../../services/api/features'

export function PostCard({ post }) {
  const [showTranscript, setShowTranscript] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  const [liveTranscript, setLiveTranscript] = useState(post.transcript)
  const [isGeneratingTranscript, setIsGeneratingTranscript] = useState(false)
  const { transcript } = useAccessibilityStore((state) => state.settings)
  const canTranscribe = transcript

  const handleGenerateTranscript = async () => {
    setIsGeneratingTranscript(true)
    const value = await transcribeMedia(post.id)
    setLiveTranscript(value)
    setShowTranscript(true)
    setIsGeneratingTranscript(false)
  }

  return (
    <Card>
      <CardHeader>
        <p className="text-xs font-medium uppercase text-indigo-600">{post.channel}</p>
        <CardTitle>{post.author}</CardTitle>
        <p className="text-sm text-slate-700">{post.caption}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" /> {post.likes}
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle className="h-4 w-4" /> {post.comments}
          </span>
          <span className="inline-flex items-center gap-1">
            <Repeat2 className="h-4 w-4" /> {post.shares}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => setShowDescription((value) => !value)}>
            {showDescription ? 'Hide image description' : 'Show image description'}
          </Button>
          <Button size="sm" variant="outline" onClick={() => setShowTranscript((value) => !value)}>
            {showTranscript ? 'Hide transcript' : 'Show transcript'}
          </Button>
          <Button
            size="sm"
            onClick={handleGenerateTranscript}
            disabled={!canTranscribe || isGeneratingTranscript}
          >
            {isGeneratingTranscript ? 'Generating...' : 'Generate transcript'}
          </Button>
        </div>
        {showDescription && (
          <p className="rounded-md bg-slate-50 p-3 text-sm text-slate-700">{post.imageDescription}</p>
        )}
        {showTranscript && transcript && (
          <p className="rounded-md bg-slate-50 p-3 text-sm text-slate-700">{liveTranscript}</p>
        )}
      </CardContent>
    </Card>
  )
}
