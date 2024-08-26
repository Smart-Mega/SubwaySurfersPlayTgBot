export interface IUser {
  uuid?: string
  role: string
  first_name: string
  last_name: string
  mobile_number: string
  email: string
}

export interface IStickyShortcutItem {
  id: string
  label: string
  inView: boolean
}

export interface ITableParams {
  isMobile: boolean
  filter: Record<string, any>
  sort: {
    column: string
    direction: string // "asc" | "desc"
  }
  pagination: {
    page_index: number
    page_size: number
  }
}
