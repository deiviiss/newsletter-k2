import bcrypt from 'bcryptjs'
import { randomUUID } from 'crypto'
import { type INewsletter, type IUser } from '../interfaces'

interface SeedData {
  newsletters: INewsletter[]
  users: IUser[]
}

export const initialData: SeedData = {
  newsletters: [
    {
      id: randomUUID(),
      title: 'October 2024 Newsletter',
      month: new Date('2024-10-01T00:00:00.000Z'),
      socialSkill: {
        skill: 'En esta nueva sección cada mes les compartiremos la habilidad social que trabajaremos y alguna actividad para reforzar en casita',
        activity: 'Este mes reforzaremos Seguir indicaciones. Recomendamos en casa hacer actividades o juegos que impliquen seguir pasos específicos.'
      },
      notes: [
        { content: 'Este mes de nuevo les compartimos el vocabulario que estaremos trabajando en clase con los niños, los temas generales y links de canciones con las que podrán practicar en casa.' },
        { content: 'El vocabulario se envía como se escribe en negro y como se pronuncia en gris.' }
      ],
      vocabularies: [
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
        { name: 'Directions' },
        { name: 'The Vowels' },
        { name: 'Colors' },
        { name: 'Shapes' },
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
      id: randomUUID(),
      title: 'September 2024 Newsletter',
      month: new Date('2024-09-01T00:00:00.000Z'),
      socialSkill: null,
      notes: [
        { content: 'Bienvenidos todos a este nuevo ciclo escolar, en esta sección daremos avisos generales para los padres, madres y tutores' },
        { content: 'Las Newsletters, como esta misma, serán enviadas y pegadas en los salones a principio de mes donde les brindaremos el vocabulario que estaremos trabajando en clase con los niños, los temas generales y links de canciones con las que podrán practicar en casa' },
        { content: 'El vocabulario se envía como se escribe en negro y como se pronuncia en gris.' },
        { content: 'Les recordamos que es importante enviar el marcador y las play-doh’s de sus niños ya que es material que se emplea para trabajar en clase.' }
      ],
      vocabularies: [
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
        { word: 'Water', pronunciation: 'Uader' },
        { word: 'Bottle', pronunciation: 'Bodl' },
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
      id: randomUUID(),
      email: 'kelly@educationalnewsletter.com',
      name: 'Kelly',
      password: bcrypt.hashSync('userseed'),
      role: 'admin'
    }
  ]
}
