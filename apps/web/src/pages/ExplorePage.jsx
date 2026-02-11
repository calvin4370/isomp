import { useEffect, useMemo, useState } from 'react'
import { PostCard } from '../components/feed/PostCard'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { DwellButton } from '../components/ui/DwellButton'
import { getFeed, getRecommendations } from '../services/api/features'
import { useAccessibilityStore } from '../store/accessibilityStore'
import { useFeedStore } from '../store/feedStore'

const abilityOptions = [
  { key: 'visual', label: 'Visual Support' },
  { key: 'hearing', label: 'Hearing Support' },
  { key: 'motor', label: 'Motor Support' },
]

export function ExplorePage() {
  const [selectedAbilities, setSelectedAbilities] = useState(['visual'])
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [voiceCommand, setVoiceCommand] = useState('')
  const [voiceResult, setVoiceResult] = useState('')
  const applyRecommendation = useAccessibilityStore((state) => state.applyRecommendation)
  const settings = useAccessibilityStore((state) => state.settings)
  const feed = useFeedStore((state) => state.posts)
  const hasLoaded = useFeedStore((state) => state.hasLoaded)
  const setPosts = useFeedStore((state) => state.setPosts)

  useEffect(() => {
    if (hasLoaded) {
      return
    }
    let mounted = true
    getFeed().then((posts) => {
      if (mounted) {
        setPosts(posts)
      }
    })
    return () => {
      mounted = false
    }
  }, [hasLoaded, setPosts])

  const selectedLabel = useMemo(
    () =>
      selectedAbilities
        .map((ability) => abilityOptions.find((option) => option.key === ability)?.label)
        .join(', '),
    [selectedAbilities],
  )

  const toggleAbility = (ability) => {
    setSelectedAbilities((current) => {
      if (current.includes(ability)) {
        return current.filter((entry) => entry !== ability)
      }
      return [...current, ability]
    })
  }

  const applyRecommendations = async () => {
    setIsLoadingRecommendations(true)
    const features = await getRecommendations(selectedAbilities)
    applyRecommendation(features)
    setIsLoadingRecommendations(false)
  }

  const speakText = (text) => {
    if (!window.speechSynthesis || !text) {
      return
    }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1
    window.speechSynthesis.speak(utterance)
  }

  const speakActivePost = () => {
    const activePost = feed[activeIndex]
    if (!activePost || !settings.textToSpeech) {
      return
    }
    const parts = []
    if (settings.imageToSpeech && activePost.imageDescription) {
      parts.push(`Image description: ${activePost.imageDescription}`)
    }
    parts.push(`Caption: ${activePost.caption}`)
    speakText(parts.join('. '))
  }

  const goToPost = (nextIndex) => {
    if (feed.length === 0) {
      return
    }
    const clamped = Math.max(0, Math.min(feed.length - 1, nextIndex))
    setActiveIndex(clamped)
  }

  const runVoiceCommand = () => {
    const command = voiceCommand.trim().toLowerCase()
    if (!command) {
      return
    }
    if (command.includes('next')) {
      goToPost(activeIndex + 1)
      setVoiceResult('Moved to next post.')
    } else if (command.includes('previous') || command.includes('back')) {
      goToPost(activeIndex - 1)
      setVoiceResult('Moved to previous post.')
    } else if (command.includes('read') || command.includes('speak')) {
      speakActivePost()
      setVoiceResult('Reading active post out loud.')
    } else {
      setVoiceResult('Unknown command. Try: next post, previous post, read post.')
    }
  }

  useEffect(() => {
    if (!settings.textToSpeech || feed.length === 0) {
      return
    }
    speakActivePost()
    // Intentional: only auto-speak when active post changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, settings.textToSpeech])

  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Adaptive Onboarding</CardTitle>
          <CardDescription>Choose support needs and auto-enable recommended features.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {abilityOptions.map((ability) => (
              <Button
                key={ability.key}
                size="sm"
                variant={selectedAbilities.includes(ability.key) ? 'default' : 'outline'}
                onClick={() => toggleAbility(ability.key)}
              >
                {ability.label}
              </Button>
            ))}
          </div>
          <p className="text-sm text-slate-600">Selected: {selectedLabel || 'None'}</p>
          <Button onClick={applyRecommendations} disabled={isLoadingRecommendations}>
            {isLoadingRecommendations ? 'Applying...' : 'Apply Recommendations'}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Explore Feed</h2>
        <Card>
          <CardHeader>
            <CardTitle>Demo Accessibility Controls</CardTitle>
            <CardDescription>
              {settings.voiceNavigation
                ? 'Voice navigation is enabled. Try: "next post", "previous post", "read post".'
                : 'Enable Voice Navigation in the right panel to use voice commands.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <DwellButton
                dwellEnabled={settings.eyeTracking}
                onActivate={() => goToPost(activeIndex - 1)}
                title={settings.eyeTracking ? 'Hover 2 seconds to activate' : 'Click to activate'}
              >
                Previous Post
              </DwellButton>
              <DwellButton
                dwellEnabled={settings.eyeTracking}
                onActivate={() => goToPost(activeIndex + 1)}
                title={settings.eyeTracking ? 'Hover 2 seconds to activate' : 'Click to activate'}
              >
                Next Post
              </DwellButton>
              <Button variant="outline" onClick={speakActivePost} disabled={!settings.textToSpeech}>
                Read Active Post
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                value={voiceCommand}
                onChange={(event) => setVoiceCommand(event.target.value)}
                placeholder='Type voice command, e.g. "next post"'
                className="h-10 min-w-[260px] flex-1 rounded-md border border-slate-300 px-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                disabled={!settings.voiceNavigation}
              />
              <Button onClick={runVoiceCommand} disabled={!settings.voiceNavigation}>
                Run Command
              </Button>
            </div>
            {voiceResult ? <p className="text-sm text-slate-600">{voiceResult}</p> : null}
          </CardContent>
        </Card>
        {!hasLoaded ? (
          <p className="text-sm text-slate-500">Loading posts...</p>
        ) : (
          <div className="space-y-4">
            {feed.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                isActive={index === activeIndex}
                onFocusRequest={() => setActiveIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
