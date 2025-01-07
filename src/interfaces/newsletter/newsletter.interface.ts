import { type Topic, type Vocabulary, type Video } from '@/interfaces'

export type Grade = 'K2' | 'K3'

export interface SocialSkill {
  skill: string
  activity: string
}

export interface Note {
  content: string
}

export interface Playlist {
  title: string | null
  url: string
}

export interface Newsletter {
  id: string
  title: string
  month: Date
  socialSkill: SocialSkill | null
  vocabularies: Vocabulary[]
  topics: Topic[]
  videos: Video[]
  notes: Note[]
  grade: Grade
  playlist: Playlist | null
}
