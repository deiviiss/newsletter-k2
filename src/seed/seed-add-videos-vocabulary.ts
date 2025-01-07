import prisma from '../lib/prisma'

async function main() {
  const newsletterId = '0f3b9d1f-a644-4c5a-92e4-0b7ef3c3e4bb'

  const videos = [
    {
      title: "Count Together by 10's | Counting Workout for Kids",
      by: 'Jack Hartmann Kids Music Channel',
      url: 'https://www.youtube.com/watch?v=W8CEOlAOGas',
      newsletterId
    },
    {
      title: 'Count by 10s | Number Songs',
      by: 'Baby Shark - Pinkfong Kids’ Song & Stories',
      url: 'https://www.youtube.com/watch?v=PYNqWmkkxaY',
      newsletterId
    },
    {
      title: 'Counting To 100 by 1s | Counting Numbers',
      by: 'Dream English Kids',
      url: 'https://www.youtube.com/watch?v=SxgCA1qOW20&t=3s',
      newsletterId
    },
    {
      title: 'Big Numbers Song | Count to 100 Song',
      by: 'The Singing Walrus - English Songs For Kids',
      url: 'https://www.youtube.com/watch?v=bGetqbqDVaA',
      newsletterId
    },
    {
      title: 'Alphabet Phonics Chant | Learning ABC Phonics for Kids',
      by: 'Tora the Teacher',
      url: 'https://www.youtube.com/watch?v=XAXyskFDYXw&t=22s',
      newsletterId
    },
    {
      title: 'How Old Are You? 🎶 | We Are Not Babies!',
      by: 'Wormhole Learning',
      url: 'https://www.youtube.com/watch?v=Ui932qk1_II',
      newsletterId
    }
  ]

  await prisma.video.createMany({
    data: videos,
    skipDuplicates: true // Skips if a duplicate entry exists
  })

  // eslint-disable-next-line no-console
  console.log('Video data seeded successfully!')

  const words = [
    { word: 'Sweater', pronunciation: 'Suerer', newsletterId },
    { word: 'Cold', pronunciation: 'Cold', newsletterId },
    { word: 'Ice', pronunciation: 'Ais', newsletterId },
    { word: 'Snowflake', pronunciation: 'Snoufleik', newsletterId },
    { word: 'Igloo', pronunciation: 'Iiglu', newsletterId },
    { word: 'Mirror', pronunciation: 'Miror', newsletterId },
    { word: 'Milk', pronunciation: 'Milk', newsletterId },
    { word: 'Mop', pronunciation: 'Mop', newsletterId },
    { word: 'Mouse', pronunciation: 'Maus', newsletterId },
    { word: 'Monkey', pronunciation: 'Monki', newsletterId },
    { word: 'Moon', pronunciation: 'Mun', newsletterId },
    { word: 'Kite', pronunciation: 'Kait', newsletterId },
    { word: 'Kid', pronunciation: 'Kid', newsletterId },
    { word: 'Koala', pronunciation: 'Koala', newsletterId },
    { word: 'King', pronunciation: 'King', newsletterId },
    { word: 'Key', pronunciation: 'Ki', newsletterId },
    { word: 'Kangaroo', pronunciation: 'Kangaru', newsletterId },
    { word: 'Jar', pronunciation: 'Yar', newsletterId },
    { word: 'Jeans', pronunciation: 'Yins', newsletterId },
    { word: 'Juice', pronunciation: 'Yus', newsletterId },
    { word: 'Jacket', pronunciation: 'Yaket', newsletterId },
    { word: 'Jam', pronunciation: 'Yam', newsletterId },
    { word: 'Jellyfish', pronunciation: 'Yelifish', newsletterId },
    { word: 'Fox', pronunciation: 'Fox', newsletterId },
    { word: 'Fish', pronunciation: 'Fish', newsletterId },
    { word: 'Flower', pronunciation: 'Flauer', newsletterId },
    { word: 'Frog', pronunciation: 'Frog', newsletterId },
    { word: 'Flag', pronunciation: 'Flag', newsletterId },
    { word: 'Fork', pronunciation: 'Fork', newsletterId }
  ]

  await prisma.vocabulary.createMany({
    data: words,
    skipDuplicates: true // Optional: Skip if a duplicate entry exists
  })

  // eslint-disable-next-line no-console
  console.log('Vocabulary data seeded successfully!')
}

(() => {
  if (process.env.NODE_ENV === 'production') return

  main()
    .catch(e => {
      // eslint-disable-next-line no-console
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
})()
