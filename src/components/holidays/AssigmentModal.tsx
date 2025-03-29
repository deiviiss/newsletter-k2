import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdRestaurantMenu } from 'react-icons/md'
import { z } from 'zod'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Form, FormItem, FormField, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'

const assignmentDate = z.object({
  date: z.date({
    required_error: 'Date is required',
    invalid_type_error: 'Date is required',
    message: 'Assignment date is required'
  })
})

interface ModalProps {
  handleAssignment: (date: string) => Promise<void>
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
  cycleStartDate: Date | null
  cycleEndDate: Date | null
}

const AssignmentModal = ({ handleAssignment, isModalOpen, setIsModalOpen, cycleStartDate, cycleEndDate }: ModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openPopover, setOpenPopover] = useState(false)

  const form = useForm<z.infer<typeof assignmentDate>>({
    resolver: zodResolver(assignmentDate),
    defaultValues: {
      date: new Date()
    }
  })

  const onSubmit = async (data: z.infer<typeof assignmentDate>) => {
    // Convert date to ISO string format
    const selectedDate = data.date.toISOString()

    try {
      // Call the handleAssignment function with the formatted date
      await handleAssignment(selectedDate)

      setIsSubmitting(false)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error assigning date:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open) }}>
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="w-full flex"
          >
            <MdRestaurantMenu className="mr-2" />
            Assign Menus
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Days to Menus</DialogTitle>
            <DialogDescription>
              Select the start date of the assignment.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex justify-around items-start flex-col">
                  <div className="flex justify-between items-center w-full">
                    <FormLabel>Assignment Date</FormLabel>
                    <Popover
                      modal
                      open={openPopover}
                      onOpenChange={setOpenPopover}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? (format(field.value, 'PPP'))
                              : (<span>Pick a date</span>)
                            }
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(newValue) => {
                            field.onChange(newValue)
                            setOpenPopover(false)
                          }}
                          disabled={(date) => {
                            // If there are no school cycle dates, disable all dates
                            if (!cycleStartDate || !cycleEndDate) {
                              return true // Disable all dates if there are no school cycle dates
                            }
                            // Only allows dates within the school cycle range
                            return date < cycleStartDate || date > cycleEndDate
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="gap-y-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </DialogFooter>
          </form>

        </DialogContent>
      </Dialog>
    </Form>
  )
}

export default AssignmentModal
