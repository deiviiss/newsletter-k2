'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { createUpdateNewsletter } from '@/actions/newsletter'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { type Newsletter } from '@/interfaces'

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.'
  }),
  month: z.string().regex(/^\d{4}-\d{2}$/, {
    message: 'Month must be in the format YYYY-MM.'
  }),
  socialSkill: z.object({
    skill: z.string().min(2, 'Skill must be at least 2 characters.'),
    activity: z.string().min(2, 'Activity must be at least 2 characters.')
  }),
  notes: z.array(z.object({
    content: z.string().min(1, 'Note content cannot be empty.')
  })),
  vocabulary: z.array(z.object({
    word: z.string().min(1, 'Word cannot be empty.'),
    pronunciation: z.string().min(1, 'Pronunciation cannot be empty.')
  })),
  topics: z.array(z.object({
    name: z.string().min(1, 'Topic name cannot be empty.')
  })),
  videos: z.array(z.object({
    title: z.string().min(1, 'Video title cannot be empty.'),
    by: z.string().min(1, 'Video creator cannot be empty.'),
    url: z.string().url('Must be a valid URL.')
  })),
  grade: z.enum(['K2', 'K3'], {
    message: 'Grade must be K2 or K3.'
  }),
  playlist: z.object({
    url: z.string().url('Must be a valid URL.')
  })
})

type FormValues = z.infer<typeof formSchema>

interface NewsletterFormProps {
  newsletter?: Newsletter
}

export default function NewsletterForm({ newsletter }: NewsletterFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const defaultFormValues: FormValues = {
    title: newsletter?.title ?? '',
    month: newsletter?.month ? new Date(newsletter.month).toISOString().slice(0, 7) : '',
    socialSkill: newsletter?.socialSkill ?? { skill: '', activity: '' },
    notes: newsletter?.notes.length ? newsletter.notes : [{ content: '' }],
    vocabulary: newsletter?.vocabularies.length ? newsletter.vocabularies : [{ word: '', pronunciation: '' }],
    topics: newsletter?.topics.length ? newsletter.topics : [{ name: '' }],
    videos: newsletter?.videos.length ? newsletter.videos : [{ title: '', by: '', url: '' }],
    grade: newsletter?.grade ?? 'K2',
    playlist: newsletter?.playlist ?? { title: '', url: '' }
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues
  })

  const { fields: noteFields, append: appendNote, remove: removeNote } = useFieldArray({
    control: form.control,
    name: 'notes'
  })

  const { fields: vocabFields, append: appendVocab, remove: removeVocab } = useFieldArray({
    control: form.control,
    name: 'vocabulary'
  })

  const { fields: topicFields, append: appendTopic, remove: removeTopic } = useFieldArray({
    control: form.control,
    name: 'topics'
  })

  const { fields: videoFields, append: appendVideo, remove: removeVideo } = useFieldArray({
    control: form.control,
    name: 'videos'
  })

  async function onSubmit(values: FormValues) {
    setLoading(true)
    try {
      const formData = new FormData()

      if (newsletter?.id) { formData.append('id', newsletter.id) }
      formData.append('title', values.title)
      formData.append('month', values.month)
      formData.append('socialSkill', JSON.stringify(values.socialSkill))
      formData.append('notes', JSON.stringify(values.notes))
      formData.append('vocabulary', JSON.stringify(values.vocabulary))
      formData.append('topics', JSON.stringify(values.topics))
      formData.append('videos', JSON.stringify(values.videos))
      formData.append('grade', values.grade)
      formData.append('playlist', JSON.stringify(values.playlist))

      const { ok, message } = await createUpdateNewsletter(formData)

      if (!ok) {
        toast.error(message, {
          duration: 2000,
          position: 'top-right'
        })

        return
      }

      toast.success(message, {
        duration: 2000,
        position: 'top-right'
      })

      router.push('/admin/newsletters')
    } catch (error) {
      toast.error('An error occurred while saving the newsletter')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card >
          {/* Title */}
          <CardHeader>
            <CardTitle>{newsletter ? 'Edit Newsletter' : 'Create Newsletter'}</CardTitle>
            <CardDescription>Enter the details for the newsletter.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Newsletter Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Month</FormLabel>
                  <FormControl>
                    <Input type="month" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a grade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="K2">K2</SelectItem>
                      <SelectItem value="K3">K3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

          </CardContent>
          {/* Skills */}
          <CardHeader>
            <CardTitle>Social Skill</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="socialSkill.skill"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill</FormLabel>
                  <FormControl>
                    <Input placeholder="Social Skill" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialSkill.activity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Activity Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          {/* Notes */}
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {noteFields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`notes.${index}.content`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note {index + 1}</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                    <Button type="button" variant="outline" size="sm" onClick={() => { removeNote(index) }}>Remove Note</Button>
                  </FormItem>
                )}
              />
            ))}
            <div className='w-full flex justify-end'>
              <Button type="button" variant="outline" onClick={() => { appendNote({ content: '' }) }}>Add Note</Button>
            </div>
          </CardContent>
          {/* Vocabulary */}
          <CardHeader>
            <CardTitle>Vocabulary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {vocabFields.map((field, index) => (
              <div key={field.id} className="flex space-x-4">
                <FormField
                  control={form.control}
                  name={`vocabulary.${index}.word`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Word</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`vocabulary.${index}.pronunciation`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Pronunciation</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" variant="outline" size="sm" className="mt-8" onClick={() => { removeVocab(index) }}>Remove</Button>
              </div>
            ))}
            <div className='w-full flex justify-end'>
              <Button type="button" variant="outline" onClick={() => { appendVocab({ word: '', pronunciation: '' }) }}>Add Vocabulary</Button>
            </div>
          </CardContent>
          {/* Topics */}
          <CardHeader>
            <CardTitle>Topics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topicFields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`topics.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic {index + 1}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    <Button type="button" variant="outline" size="sm" onClick={() => { removeTopic(index) }}>Remove Topic</Button>
                  </FormItem>
                )}
              />
            ))}
            <div className='w-full flex justify-end'>
              <Button type="button" variant="outline" onClick={() => { appendTopic({ name: '' }) }}>Add Topic</Button>
            </div>
          </CardContent>
          {/* Videos */}
          <CardHeader>
            <CardTitle>Videos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {videoFields.map((field, index) => (
              <div key={field.id} className="space-y-4">
                <FormField
                  control={form.control}
                  name={`videos.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`videos.${index}.by`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video Creator</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`videos.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" variant="outline" size="sm" onClick={() => { removeVideo(index) }}>Remove Video</Button>
              </div>
            ))}
            <div className='w-full flex justify-end'>
              <Button type="button" variant="outline" onClick={() => { appendVideo({ title: '', by: '', url: '' }) }}>Add Video</Button>
            </div>
          </CardContent>

          {/* Playlist */}
          <CardHeader>
            <CardTitle>Playlist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="playlist.url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url</FormLabel>
                  <FormControl>
                    <Input placeholder="Playlist Url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <div className='flex gap-2 w-full text-center justify-end my-10'>
              <Button
                size="sm"
                type='button'
                onClick={() => { router.back() }}
                variant='destructive'
              >
                Cancel
              </Button>
              <Button
                size={'sm'}
                type="submit"
                disabled={loading}
              >
                {loading ? 'Saving...' : (newsletter ? 'Update' : 'Create')}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form >
  )
}
