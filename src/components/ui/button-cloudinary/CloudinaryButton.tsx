'use client'

import { CldUploadWidget, type CloudinaryUploadWidgetError, type CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { useTheme } from 'next-themes'
import { IoCloudDoneOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export interface MenuImage {
  id: string
  url: string
}

interface IUploaderProps {
  image: MenuImage | null
  setImage: (image: MenuImage | ((prevImage: MenuImage) => MenuImage)) => void
}

const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

export function CloudinaryButton({ image, setImage }: IUploaderProps) {
  const theme = useTheme()

  const handleSuccess = (result: CloudinaryUploadWidgetResults) => {
    if (!result.info || typeof result.info === 'string') {
      return
    }

    // cast result.info to CloudinaryUploadWidgetInfo
    const info = result.info

    setImage({ id: info.public_id, url: info.public_id })
  }

  const handleError = (error: CloudinaryUploadWidgetError) => {
    toast.error('No se pudo cargar la imagen', {
      position: 'top-right',
      duration: 2000
    })
    return error
  }

  return (
    <div className='w-full flex-col-reverse flex items-center justify-between'>
      <CldUploadWidget
        uploadPreset={uploadPreset}
        options={{
          sources: ['local', 'camera', 'image_search'],
          theme: theme.theme === 'light' ? 'dark' : 'light',
          // showSkipCropButton: false,
          // cropping: true,
          // croppingAspectRatio: 1,
          clientAllowedFormats: ['png', 'jpeg', 'jpg']
        }}
        onError={handleError}
        onSuccess={handleSuccess}
      >
        {({ widget, cloudinary, open }) => (
          <Button
            className='mt-3'
            type='button'
            onClick={() => {
              open()
            }}
          >
            <IoCloudDoneOutline className="mr-2" />
            Upload Image
          </Button>
        )}
      </CldUploadWidget>
    </div>
  )
}
