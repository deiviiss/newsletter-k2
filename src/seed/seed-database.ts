import { initialData } from './seed'
import prisma from '../lib/prisma'

const main = async () => {
  // Delete existing data
  await prisma.user.deleteMany()
  await prisma.vocabulary.deleteMany()
  await prisma.topic.deleteMany()
  await prisma.video.deleteMany()
  await prisma.note.deleteMany()
  await prisma.socialSkill.deleteMany()
  await prisma.newsletter.deleteMany()

  const { users, newsletters } = initialData

  // Create users
  await prisma.user.createMany({
    data: users
  })

  // Create newsletters
  for (const newsletter of newsletters) {
    await prisma.newsletter.create({
      data: {
        id: newsletter.id,
        title: newsletter.title,
        month: new Date(newsletter.month),
        socialSkill: newsletter.socialSkill
          ? {
              create: {
                skill: newsletter.socialSkill.skill,
                activity: newsletter.socialSkill.activity
              }
            }
          : undefined,
        vocabulary: {
          create: newsletter.vocabulary.map(vocab => ({
            word: vocab.word,
            pronunciation: vocab.pronunciation
          }))
        },
        topics: {
          create: newsletter.topics.map(topic => ({
            name: topic.name
          }))
        },
        note: {
          create: newsletter.notes.map(note => ({
            content: note.content
          }))
        },
        videos: {
          create: newsletter.videos.map(video => ({
            title: video.title,
            url: video.url,
            by: video.by
          }))
        }
      }
    })
  }

  // eslint-disable-next-line no-console
  console.log('Seed executed successfully')
}

(() => {
  if (process.env.NODE_ENV === 'production') return
  main()
})()
