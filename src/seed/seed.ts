import bcrypt from 'bcryptjs'
import { type INewsletter, type IUser } from '../interfaces'

interface SeedData {
  newsletters: INewsletter[]
  users: IUser[]
}

export const initialData: SeedData = {
  newsletters: [
    {
      id: '1',
      title: 'October 2024 Newsletter',
      month: '2024-10-01T00:00:00.000Z',
      socialSkill: {
        skill: 'Follow directions',
        activity: 'We recommend doing activities or games that involve following specific steps at home.'
      },
      notes: [
        { content: 'This month, we are sharing the vocabulary that we will be working on in class with the children, along with general topics and links to songs that you can practice at home.' },
        { content: 'The vocabulary is sent as it is written in black and how it is pronounced in gray.' }
      ],
      vocabulary: [
        { word: 'Red', pronunciation: 'Red' },
        { word: 'Blue', pronunciation: 'Blu' },
        { word: 'Yellow', pronunciation: 'Ielou' },
        { word: 'Green', pronunciation: 'Griin' },
        { word: 'Orange', pronunciation: 'Orensh' },
        { word: 'Purple', pronunciation: 'Perpol' },
        { word: 'Circle', pronunciation: 'Circuul' },
        { word: 'Triangle', pronunciation: 'Traiengol' },
        { word: 'Square', pronunciation: 'Scuer' },
        { word: 'Rectangle', pronunciation: 'Rectengol' },
        { word: 'Oval', pronunciation: 'Oval' },
        { word: 'Up', pronunciation: 'Op' },
        { word: 'Down', pronunciation: 'Daun' },
        { word: 'Right', pronunciation: 'Raid' },
        { word: 'Left', pronunciation: 'Left' }
      ],
      topics: [
        { name: 'Colors' },
        { name: 'Shapes' },
        { name: 'Directions' },
        { name: 'Numbers 0-10' }
      ],
      videos: [
        { title: 'My Name Is | Dream English Kids Songs', url: 'https://www.youtube.com/watch?v=gjWQWjLxheQ&pp=ygUYbXkgbmFtZSBpcyBkcmVhbSBlbmdsaXNo', by: 'Dream English Kids Songs' },
        { title: 'What’s your favorite color? | Super Simple Songs', url: 'https://www.youtube.com/watch?v=zxIpA5nF_LY&pp=ygUdY29sb3Igc29uZyBzdXBlciBzaW1wbGUgc29uZ3M%3D', by: 'Super Simple Songs - Kids Songs' },
        { title: 'Learn about Shapes with Pete the Cat', url: 'https://www.youtube.com/watch?v=hQO1soadGAA&ab_channel=HarperKids', by: 'HarperKids' },
        { title: 'Up, Down, Left and Right | Akili and Me', url: 'https://www.youtube.com/watch?v=sb1zNrv19tY&ab_channel=AkiliandMe', by: 'Akili and Me' },
        { title: 'Five Little Pumpkins | Halloween Song', url: 'https://www.youtube.com/watch?v=GpO8_FMWcHA&pp=ygUvSGFsbG93ZWVuIFNvbmcgZm9yIEtpZHMgfCBIYWxsb3dlZW4gQ3JlYXR1cmVzIHw%3D', by: 'Super Simple Songs - Kids Songs' },
        { title: 'Halloween Song for Kids | 1 to 10 | The Singing Walrus', url: 'https://www.youtube.com/watch?v=trDl36m9pgA&pp=ygUMcHVtcGtpbiBzb25n', by: 'The Singing Walrus' },
        { title: 'Days Of The Week | Addams Family Parody', url: 'https://www.youtube.com/watch?v=8GKmCQOy88Y&pp=ygUiRGF5cyBvZiB0aGUgSGFsbG93ZWVuIEFkYW1zIGZhbWlseQ%3D%3D', by: 'Martin and Rose Music and Learning Videos' }
      ]
    },
    {
      id: '2',
      title: 'September 2024 Newsletter',
      month: '2024-09-01T00:00:00.000Z',
      notes: [
        { content: 'This month, we are focusing on school supplies and classroom-related vocabulary.' },
        { content: 'Help your child by reviewing the vocabulary and practicing with the pronunciation provided.' }
      ],
      vocabulary: [
        { word: 'Backpack', pronunciation: 'Bakpak' },
        { word: 'Book', pronunciation: 'Buk' },
        { word: 'Brush', pronunciation: 'Brosh' },
        { word: 'Calendar', pronunciation: 'Calendar' },
        { word: 'Chair', pronunciation: 'Cher' },
        { word: 'Crayons', pronunciation: 'Creions' },
        { word: 'Desk', pronunciation: 'Desk' },
        { word: 'Door', pronunciation: 'Dor' },
        { word: 'Glue', pronunciation: 'Glu' },
        { word: 'Marker', pronunciation: 'Marker' },
        { word: 'Pencil case', pronunciation: 'Pensol keis' },
        { word: 'Scissors', pronunciation: 'Sizors' },
        { word: 'Table', pronunciation: 'Teibol' },
        { word: 'Water bottle', pronunciation: 'Uader bodl' },
        { word: 'Whiteboard', pronunciation: 'Uaitbord' }
      ],
      topics: [
        { name: 'School Supplies' },
        { name: 'Colors' },
        { name: 'Shapes' },
        { name: 'Numbers 0-10' }
      ],
      videos: [
        { title: 'My Name Is | Dream English Kids Songs', url: 'https://www.youtube.com/watch?v=gjWQWjLxheQ', by: 'Dream English Kids Songs' },
        { title: 'What’s your favorite color? | Super Simple Songs', url: 'https://www.youtube.com/watch?v=zxIpA5nF_LY', by: 'Super Simple Songs - Kids Songs' },
        { title: 'Shapes song | We are shapes', url: 'https://www.youtube.com/watch?v=pZ8gZ3PxgLc', by: 'Kids TV' },
        { title: 'Count to 10 Chant', url: 'https://www.youtube.com/watch?v=DR-cfDsHCGA', by: 'Fun kids English' },
        { title: 'Counting 1 to 10 | Baby Shark', url: 'https://www.youtube.com/watch?v=9SmaA6ErWKE', by: 'Baby Shark -Pinkfong Kids Songs & Stories' },
        { title: 'Counting 1-10 Song | The Singing Walrus', url: 'https://www.youtube.com/watch?v=Yt8GFgxlITs', by: 'The Singing Walrus' },
        { title: 'Days of The Week Song For Kids', url: 'https://www.youtube.com/watch?v=36n93jvjkDs', by: 'Dream English Kids' }
      ]
    }
  ],

  users: [
    {
      id: '1',
      email: 'maestraKelly@huertodelailusion.com',
      name: 'Miss Kelly',
      password: bcrypt.hashSync('userseed'),
      role: 'admin'
    }
  ]
}
