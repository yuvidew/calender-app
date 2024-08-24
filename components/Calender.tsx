"use client";

import React, { useMemo } from 'react';
import { format, addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay } from 'date-fns';
import { useCalenderContext } from './provider/CalenderContextProvider';
import { Button } from './ui/button';
import { Hover } from './provider/Hover';
import { EventForm } from './provider/EventForm';
import { Pin } from "lucide-react";

interface Event {
    id: string;
    title: string;
    date: Date;
    category: string;
    color: string;
    isOpen: boolean;
}

interface Props {
    currentMonth: Date;
}

export const Calender: React.FC<Props> = ({ currentMonth }) => {
    const { events, filterCategory } = useCalenderContext();
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const filteredEvents = useMemo(() => {
        return events.filter(event => !filterCategory || event.category.toLowerCase().includes(filterCategory.toLowerCase()));
    }, [events, filterCategory]);

    const renderCells = () => {
        const dateFormat = 'd';
        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const cloneDay = day;
                const dayEvents = filteredEvents.filter((event: Event) => isSameDay(event.date, day));
                days.push(
                    <Hover
                        key={day.toString()}
                        text={dayEvents[0]?.title}
                        classText={!dayEvents.length ? "hidden" : ""}
                    >
                        <EventForm isHidden={dayEvents.length ? true : false} width={'w-full'}>
                            <Button
                                variant={!isSameMonth(day, monthStart) ? "trans" : "theDate"}
                                className={`relative mb-1 ${isSameDay(day, new Date()) ? 'bg-blue-500 text-white' : ''}`}
                                style={{ backgroundColor: dayEvents.length ? dayEvents[0].color : undefined, color: dayEvents.length ? "white" : undefined }}
                                onClick={() => {}}
                            >
                                <span>{format(day, dateFormat)}</span>
                                <br />
                                <p className="absolute right-1 top-1">
                                    {dayEvents.length ? <Pin className='w-4 h-4' /> : ""}
                                </p>
                            </Button>
                        </EventForm>
                    </Hover>
                );

                day = addDays(day, 1);
            }
            rows.push(<div className="grid grid-cols-7 gap-1" key={day.toString()}>{days}</div>);
            days = [];
        }

        return <div>{rows}</div>;
    };

    const renderHeader = () => (
        <div className="flex items-center justify-between">
            <div>{format(currentMonth, 'MMMM yyyy')}</div>
        </div>
    );

    return (
        <div className="h-full">
            {renderHeader()}
            <br />
            {renderCells()}
        </div>
    );
};
