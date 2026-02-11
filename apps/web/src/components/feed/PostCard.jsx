import { MessageCircle, Repeat2, ThumbsUp } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Button } from '../ui/Button'
import { useAccessibilityStore } from '../../store/accessibilityStore'
import { transcribeMedia } from '../../services/api/features'
import { cn } from '../../lib/utils'

export function PostCard({ post, isActive = false, onFocusRequest }) {
  const [showTranscript, setShowTranscript] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  const [liveTranscript, setLiveTranscript] = useState(post.transcript)
  const [isGeneratingTranscript, setIsGeneratingTranscript] = useState(false)
  const [likes, setLikes] = useState(post.likes)
  const [comments, setComments] = useState(post.comments)
  const [shares, setShares] = useState(post.shares)
  const [commentText, setCommentText] = useState('')
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false)
  const settings = useAccessibilityStore((state) => state.settings)
  const canTranscribe = settings.transcript && settings.speechToText

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
    <Card
      className={cn(
        'transition-shadow',
        isActive ? 'ring-2 ring-indigo-500 shadow-md' : 'hover:shadow-sm',
      )}
      onMouseEnter={onFocusRequest}
    >
      <CardHeader>
        <p className="text-xs font-medium uppercase text-indigo-600">{post.channel}</p>
        <CardTitle>{post.author}</CardTitle>
        <p className="text-sm text-slate-700">{post.caption}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {post.mediaType === 'image' && post.mediaUrl ? (
          <img
            src={post.mediaUrl}
            alt={`Post by ${post.author}`}
            className="max-h-96 w-full rounded-md border border-slate-200 bg-slate-50 object-contain"
          />
        ) : null}
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
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowDescription((value) => !value)}
            disabled={!settings.imageToSpeech}
          >
            {showDescription ? 'Hide image description' : 'Show image description'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowTranscript((value) => !value)}
            disabled={!settings.transcript}
          >
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
        {showTranscript && settings.transcript && (
          <p className="rounded-md bg-slate-50 p-3 text-sm text-slate-700">{liveTranscript}</p>
        )}
        {settings.signToCaption && post.hasSignLanguage && post.signCaption ? (
          <p className="rounded-md border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-900">
            {post.signCaption}
          </p>
        ) : null}
      </CardContent>
    </Card>
  )
}
