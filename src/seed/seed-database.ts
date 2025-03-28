import { initialData } from './seed'
import prisma from '../lib/prisma'

const main = async () => {
  // Delete existing data
  // await prisma.menu.deleteMany({})
  // await prisma.menuImage.deleteMany({})
  //   await prisma.user.deleteMany()
  //   await prisma.vocabulary.deleteMany()
  //   await prisma.topic.deleteMany()
  //   await prisma.video.deleteMany()
  //   await prisma.note.deleteMany()
  //   await prisma.socialSkill.deleteMany()
  //   await prisma.newsletter.deleteMany()

  const { users } = initialData

  // Create users
  await prisma.user.createMany({
    data: users
  })

  //   // Create newsletters
  //   for (const newsletter of newsletters) {
  //     await prisma.newsletter.create({
  //       data: {
  //         id: newsletter.id,
  //         title: newsletter.title,
  //         month: new Date(newsletter.month as string),
  //         socialSkill: newsletter.socialSkill
  //           ? {
  //               create: {
  //                 skill: newsletter.socialSkill.skill,
  //                 activity: newsletter.socialSkill.activity
  //               }
  //             }
  //           : undefined,
  //         vocabularies: {
  //           create: newsletter.vocabularies.map(vocabulary => ({
  //             word: vocabulary.word,
  //             pronunciation: vocabulary.pronunciation
  //           }))
  //         },
  //         topics: {
  //           create: newsletter.topics.map(topic => ({
  //             name: topic.name
  //           }))
  //         },
  //         notes: {
  //           create: newsletter.notes.map(note => ({
  //             content: note.content
  //           }))
  //         },
  //         videos: {
  //           create: newsletter.videos.map(video => ({
  //             title: video.title,
  //             url: video.url,
  //             by: video.by
  //           }))
  //         }
  //       }
  //     })
  //   }

  // eslint-disable-next-line no-console
  console.log('Seed executed successfully')
}

(() => {
  if (process.env.NODE_ENV === 'production') return
  main()
})()
