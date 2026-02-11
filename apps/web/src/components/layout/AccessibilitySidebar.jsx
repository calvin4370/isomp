import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Switch } from '../ui/Switch'
import { useAccessibilityStore } from '../../store/accessibilityStore'

const featureRows = [
  { key: 'textToSpeech', label: 'Text to Speech' },
  { key: 'imageToSpeech', label: 'Image to Speech' },
  { key: 'speechToText', label: 'Speech to Transcript' },
  { key: 'signToCaption', label: 'Sign to Captions' },
  { key: 'voiceNavigation', label: 'Voice Navigation' },
  { key: 'eyeTracking', label: 'Eye Tracking' },
  { key: 'transcript', label: 'Transcript View' },
  { key: 'largeText', label: 'Large Text' },
]

export function AccessibilitySidebar() {
  const settings = useAccessibilityStore((state) => state.settings)
  const setSetting = useAccessibilityStore((state) => state.setSetting)

  return (
    <aside className="sticky top-0 h-screen w-80 border-l border-slate-200 bg-white p-4">
      <Card>
        <CardHeader>
          <CardTitle>Accessibility</CardTitle>
          <p className="text-sm text-slate-500">Session-persistent feature toggles</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {featureRows.map((row) => (
            <div key={row.key} className="flex items-center justify-between">
              <span className="text-sm text-slate-700">{row.label}</span>
              <Switch
                checked={settings[row.key]}
                onCheckedChange={(value) => setSetting(row.key, value)}
                label={row.label}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  )
}
