import { type ITopic, type IVocabulary, type IVideo } from '@/interfaces'

export type Grade = 'K2' | 'K3'

export interface ISocialSkill {
  skill: string
  activity: string
}

export interface INote {
  content: string
}

export interface INewsletter {
  id: string
  title: string
  month: Date
  socialSkill: ISocialSkill | null
  vocabularies: IVocabulary[]
  topics: ITopic[]
  videos: IVideo[]
  notes: INote[]
  grade: Grade
}
