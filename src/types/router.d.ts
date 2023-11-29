interface SyncRoute {
  path: string
  element?: React.ReactNode
  name?: string
  index?: boolean
  children?: Array<SyncRoute>
}