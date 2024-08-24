"use client"

import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useCalenderContext } from '@/components/provider/CalenderContextProvider'


export const EventFilter: React.FC = () => {
    const { filterCategory , onSelect} = useCalenderContext()
    return (
        <Select 
            defaultValue={filterCategory}
            onValueChange={(e) => onSelect(e)}
        >
            <SelectTrigger className="w-[140px] border">
                <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
            </SelectContent>
        </Select>
    )
}
