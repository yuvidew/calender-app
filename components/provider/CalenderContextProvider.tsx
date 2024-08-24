"use client"
import React, { createContext, ReactNode, useContext, useState } from 'react'


interface Event {
    id: string;
    title: string;
    date: Date;
    category: string;
    color : string,
    isOpen : boolean
}

interface contextType{
    onSelect : (newValue : string) => void;
    events : Event[],
    filterCategory : string,
    addEvent : (arr : Event) => void,
    editEvent : (arr : Event) => void ,
    deleteEvent : (id : string) => void,
    onIsOpen : (index : number) => void,
    onChangeTaskTitle : (index : number , task : string) => void,
    onChangeTaskCategory : (index : number , task : string) => void,
    onChangeTaskDate : (index : number , date : Date) => void,
    
}


const CalenderContext = createContext<contextType | undefined>(undefined)

export const CalenderContextProvider = ({children} : {children : ReactNode}) => {
    const [filterCategory , setFilterCategory] = useState<string>("")
    const [events , setEvents] = useState<Event[]>([
    ])

    const addEvent = (event : Event) => setEvents([...events , event])

    const onIsOpen = (index: number) => {
        const updatedEvents = events.map((event, i) => 
            i === index ? { ...event, isOpen: !event.isOpen } : event
        );
        setEvents(updatedEvents);
    };

    const onChangeTaskTitle = (index : number , text : string) => {
        const updatedEvents = events.map((event, i) => 
            i === index ? { ...event, title: text} : event
        );
        setEvents(updatedEvents);
    }

    const onChangeTaskDate = (index : number , date : Date) => {
        const updatedEvents = events.map((event, i) => 
            i === index ? { ...event, date: date} : event
        );
        setEvents(updatedEvents);
    }

    const onChangeTaskCategory = (index : number , text : string) => {
        const updatedEvents = events.map((event, i) => 
            i === index ? { ...event, category: text} : event
        );
        setEvents(updatedEvents);
    }

    const editEvent = (updatedEvent : Event) => {
        return setEvents(events.map((event) => (event.id) === updatedEvent.id ? updatedEvent : event))
    }

    const deleteEvent = (eventId : string) => {
        return setEvents(events.filter((event) => event.id !== eventId));
    }
    const onSelect = (text:string) => {
        setFilterCategory(text)
    }

    let value = {
        filterCategory,
        events,
        onSelect,
        addEvent,
        onIsOpen,
        editEvent,
        deleteEvent,
        onChangeTaskTitle,
        onChangeTaskDate,
        onChangeTaskCategory
    }

    return (
        <CalenderContext.Provider value={value}>
            {children}
        </CalenderContext.Provider>
    )
}

export const useCalenderContext = () => {
    const context = useContext(CalenderContext);

    if(!context) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }
    return context;
}

export default CalenderContext
