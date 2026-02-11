import { useEffect, useMemo, useState } from 'react'
import { PostCard } from '../components/feed/PostCard'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
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
  const applyRecommendation = useAccessibilityStore((state) => state.applyRecommendation)
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

  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Adaptive Onboarding (MVP)</CardTitle>
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
        {!hasLoaded ? (
          <p className="text-sm text-slate-500">Loading posts...</p>
        ) : (
          <div className="space-y-4">
            {feed.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
