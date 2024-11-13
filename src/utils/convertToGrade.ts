import { type Grade } from '@/interfaces'

// Define explicit array of valid Grade values
const gradeValues: Grade[] = ['K2', 'K3']

// Function to convert string to Grade
export const convertToGrade = (grade: string | undefined): Grade | undefined => {
  // Check if the grade is included in the valid values
  if (grade && gradeValues.includes(grade as Grade)) {
    return grade as Grade
  }
  // Return undefined if the grade is invalid or not provided
  return undefined
}
