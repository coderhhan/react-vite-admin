interface SyncRoute {
  path: string
  element?: React.ReactNode
  name?: string
  children?: Array<SyncRoute>
}