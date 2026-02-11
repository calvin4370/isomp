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
  const [likes, setLikes] = useState(post.likes)
  const [comments, setComments] = useState(post.comments)
  const [shares, setShares] = useState(post.shares)
  const [commentText, setCommentText] = useState('')
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false)
  const { transcript } = useAccessibilityStore((state) => state.settings)
  const canTranscribe = transcript

  const handleGenerateTranscript = async () => {
    setIsGeneratingTranscript(true)
    const value = await transcribeMedia(post.id)
    setLiveTranscript(value)
    setShowTranscript(true)
    setIsGeneratingTranscript(false)
  }

  const handleCommentSubmit = () => {
    if (!commentText.trim()) {
      return
    }
    setComments((value) => value + 1)
    setCommentText('')
    setIsCommentBoxOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <p className="text-xs font-medium uppercase text-indigo-600">{post.channel}</p>
        <CardTitle>{post.author}</CardTitle>
        <p className="text-sm text-slate-700">{post.caption}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <button
            type="button"
            onClick={() => setLikes((value) => value + 1)}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-slate-100"
          >
            <ThumbsUp className="h-4 w-4" /> {likes}
          </button>
          <button
            type="button"
            onClick={() => setIsCommentBoxOpen((value) => !value)}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-slate-100"
          >
            <MessageCircle className="h-4 w-4" /> {comments}
          </button>
          <button
            type="button"
            onClick={() => setShares((value) => value + 1)}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-slate-100"
          >
            <Repeat2 className="h-4 w-4" /> {shares}
          </button>
        </div>
        {isCommentBoxOpen && (
          <div className="space-y-2 rounded-md border border-slate-200 bg-slate-50 p-3">
            <textarea
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              placeholder="Write a comment..."
              className="min-h-20 w-full rounded-md border border-slate-300 p-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <div>
              <Button size="sm" onClick={handleCommentSubmit}>
                Add Comment
              </Button>
            </div>
          </div>
        )}
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
