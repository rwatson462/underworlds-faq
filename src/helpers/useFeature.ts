
const features = {
  rules: {
    enabled: false,
  },
} as const

export function useFeature(feature: keyof typeof features): boolean {
  return features[feature]?.enabled ?? false
}
