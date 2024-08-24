'use client'

import React, { useMemo } from 'react'
import { useCalenderContext } from '@/components/provider/CalenderContextProvider'
import {
  Card,
  CardHeader,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Button } from '@/components/ui/button'
import { Edit, Save, Trash2 } from 'lucide-react'
import { TextareaComp } from './TextareaComp'
import { DatePicker } from './DatePicker'



export const TaskList = () => {
  const {events , filterCategory , deleteEvent , editEvent , onIsOpen , onChangeTaskTitle , onChangeTaskDate , onChangeTaskCategory} = useCalenderContext()

  const filteredEvents = useMemo(() => {
    return events.filter(event => !filterCategory || event.category === filterCategory);
  }  , [events , filterCategory])



  return (
    <div className=' w-full h-full'>
      {filteredEvents.map((ele: any  , index) => (
        <Card 
          key={ele.id}
          className={` mb-3`}
          style={{ backgroundColor: ele.color}}
        >
          <CardHeader>
            {ele.isOpen ? 
              <TextareaComp
                value={ele.title}
                onChange = {(e) => onChangeTaskTitle(index , e)}
              />
              :
              <p>{ele.title}</p>
            }
            <br />
            <Separator orientation="vertical" className='mt-[2rem] w-full  border border-white/75' />
            <div className=' mt-1'></div>
            <div className=' flex items-center justify-between'>
              <div className=' flex items-center gap-2'>
                {!ele.isOpen ? 
                  <Button variant={"ghost"} size={"sm"}>
                    {ele.date.toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                  </Button>
                  :
                  <DatePicker 
                    date={ele.date}
                    setDate={(date) => onChangeTaskDate(index , date)}
                  />
                }
                
                {!ele.isOpen ? 
                  <Button variant={"default"} size={"sm"}>
                    {ele.category}
                  </Button>
                  :
                  <Select
                      defaultValue={ele.category}
                      onValueChange={(e) => onChangeTaskCategory(index , e)}
                  >
                      <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category.." />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="family">Family</SelectItem>
                          <SelectItem value="personal">Personal</SelectItem>
                      </SelectContent>
                  </Select>
                }

              </div>
              <div className=' flex items-center justify-end gap-3'>
                <Button variant={"secondary"} size={"icon"} onClick={() => onIsOpen(index)}>
                  {!ele.isOpen ? <Edit className='w-5 h-5' /> : <Save className='w-5 h-5' />}
                </Button>
                <Button variant={"destructive"} size={"icon"} onClick={() => deleteEvent(ele.id)} >
                  <Trash2 className='w-5 h-5' />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
