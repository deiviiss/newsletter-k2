'use server'

import cloudinary from '@/lib/cloudinary'
import { isValidFileSystemUrl } from '@/utils'

export const deleteMenuImage = async (imageId: string, imageUrl: string) => {
  if (isValidFileSystemUrl(imageUrl)) {
    return {
      ok: false,
      message: 'System image cannot be deleted'
    }
  }

  try {
    await cloudinary.uploader.destroy(imageId)

    return {
      ok: true,
      message: 'Image deleted successfully'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error deleting image, please try again'
    }
  }
}
