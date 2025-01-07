import { type ITopic, type IVocabulary, type IVideo } from '@/interfaces'

export type Grade = 'K2' | 'K3'

export interface SocialSkill {
  skill: string
  activity: string
}

export interface Note {
  content: string
}

export interface playlist {
  title: string
  url: string
}

export interface Newsletter {
  id: string
  title: string
  month: Date
  socialSkill: SocialSkill | null
  vocabularies: IVocabulary[]
  topics: ITopic[]
  videos: IVideo[]
  notes: Note[]
  grade: Grade
  playlist: playlist | null
}
