"use client"

import React, { ReactNode, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import { Input } from '../ui/input'
import { DatePicker } from '@/app/(home)/_components/DatePicker';
import { useColorGenerator } from '@/hook/useColorGenerator'
import { Button } from '../ui/button'
import { useCalenderContext } from './CalenderContextProvider'



interface Event {
    id: string;
    title: string;
    date: any;
    category: string;
    color: string,
    isOpen : boolean,
}

interface props {
    initialTask?: Event,
    isHidden : boolean,
    children: ReactNode
    width? : string | 'w-full'
}

let TaskStructure = {
    id: "",
    title: "",
    date: "",
    category: "",
    color: "",
    isOpen : false
}

export const EventForm: React.FC<props> = ({ children, initialTask , isHidden  , width }) => {
    const { events, addEvent , editEvent} = useCalenderContext()
    const [data, setData] = useState<Event>(initialTask ? initialTask : TaskStructure)
    const [generateRandomColor] = useColorGenerator()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    const onDate = (date: Date) => {
        setData((prev) => ({
            ...prev,
            date
        }));
    }

    const onCategory = (category: string) => {
        setData((prev) => ({
            ...prev,
            category
        }));
    }

    const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        addEvent({ ...data, id: data.id || Date.now().toString(), color: "#ed5f2f" })
    }


    return (
        <Dialog>
            <DialogTrigger className= {width}>{children}</DialogTrigger>
            <DialogContent className={isHidden ? "hidden bg-transparent" : ""}>
                <DialogHeader>
                    <DialogTitle className=' font-medium'>Enter your task</DialogTitle>
                    <br />
                    <form action="" className=' mt-[2rem]' onSubmit={onSubmit}>
                        <Input
                            name="title"
                            value={data.title}
                            onChange={onChange}
                            placeholder='Enter your task Title...'
                            required
                        />
                        <div className=' mt-5'>
                            <DatePicker
                                date={data.date}
                                setDate={onDate}
                            />
                        </div>
                        <div className=' mt-5'>
                            <Select
                                defaultValue={data.category}
                                onValueChange={onCategory}
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
                        </div>

                        <DialogClose>
                            <Button variant={"blue"} className=' mt-[1rem] w-full'>
                                Submit
                            </Button>
                        </DialogClose>
                        
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
