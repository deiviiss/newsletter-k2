import { type ITopic, type IVocabulary, type IVideo } from '@/interfaces'

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
  month: string
  socialSkill?: ISocialSkill
  vocabulary: IVocabulary[]
  topics: ITopic[]
  videos: IVideo[]
  notes: INote[]
}
