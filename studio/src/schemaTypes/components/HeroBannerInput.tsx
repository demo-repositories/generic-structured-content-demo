import {type StringInputProps, set, unset} from 'sanity'
import {Card, Grid, Stack, Text} from '@sanity/ui'
import {stegaClean} from '@sanity/client/stega'

type Layout = 'textOnImage' | 'stacked' | 'sideBySide'

function TextOnImagePreview() {
  return (
    <svg viewBox="0 0 120 72" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', width: '100%'}}>
      <rect width="120" height="72" fill="#6b7280" rx="3" />
      <rect width="120" height="72" fill="rgba(0,0,0,0.45)" rx="3" />
      <rect x="10" y="42" width="56" height="7" fill="white" rx="2" opacity="0.95" />
      <rect x="10" y="53" width="38" height="4" fill="white" rx="2" opacity="0.6" />
      <rect x="10" y="61" width="26" height="6" fill="#FF5500" rx="10" />
    </svg>
  )
}

function StackedPreview() {
  return (
    <svg viewBox="0 0 120 72" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', width: '100%'}}>
      <rect width="120" height="72" fill="#f3f4f6" rx="3" />
      <rect x="10" y="9" width="56" height="7" fill="#111" rx="2" opacity="0.85" />
      <rect x="10" y="20" width="42" height="4" fill="#555" rx="2" opacity="0.55" />
      <rect x="10" y="28" width="26" height="6" fill="#FF5500" rx="10" />
      <rect x="10" y="42" width="100" height="24" fill="#9ca3af" rx="3" />
    </svg>
  )
}

function SideBySidePreview() {
  return (
    <svg viewBox="0 0 120 72" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', width: '100%'}}>
      <rect width="120" height="72" fill="#f3f4f6" rx="3" />
      <rect x="8" y="15" width="46" height="7" fill="#111" rx="2" opacity="0.85" />
      <rect x="8" y="26" width="36" height="4" fill="#555" rx="2" opacity="0.55" />
      <rect x="8" y="34" width="36" height="4" fill="#555" rx="2" opacity="0.4" />
      <rect x="8" y="46" width="24" height="7" fill="#FF5500" rx="10" />
      <rect x="66" y="8" width="46" height="56" fill="#9ca3af" rx="3" />
    </svg>
  )
}

const LAYOUTS: {value: Layout; title: string; Preview: () => React.JSX.Element}[] = [
  {value: 'textOnImage', title: 'Text on image', Preview: TextOnImagePreview},
  {value: 'stacked', title: 'Stacked hero', Preview: StackedPreview},
  {value: 'sideBySide', title: 'Side by side', Preview: SideBySidePreview},
]

export function LayoutPickerInput(props: StringInputProps) {
  const {value, onChange} = props
  const currentLayout = stegaClean(value) as Layout | undefined

  return (
    <Grid columns={3} gap={2}>
      {LAYOUTS.map(({value: v, title, Preview}) => (
        <Card
          key={v}
          tone={currentLayout === v ? 'primary' : 'default'}
          border
          radius={2}
          padding={2}
          style={{cursor: 'pointer'}}
          onClick={() => onChange(v ? set(v) : unset())}
        >
          <Stack space={2}>
            <Preview />
            <Text size={0} align="center" weight={currentLayout === v ? 'semibold' : 'regular'}>
              {title}
            </Text>
          </Stack>
        </Card>
      ))}
    </Grid>
  )
}
