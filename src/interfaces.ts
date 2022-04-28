export interface ProjectData {
  theyConfirmed: boolean
  youConfirmed: boolean
  yourMin: number
  yourMax: number
  theirMin: number
  theirMax: number
  requirements?: string
}

export enum Done {
  staging = 0,
  youConfirmed,
  theyConfirmed,
  bothConfirmed,
  youSetRange,
  theySetRange,
  bothSetRange,
}
