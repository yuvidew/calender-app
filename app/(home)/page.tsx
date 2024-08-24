
import { CalenderContextProvider } from "@/components/provider/CalenderContextProvider";
import { CalendarIcon } from "@radix-ui/react-icons";
import { EventFilter } from "./_components/EventFilter";
import { Button } from "@/components/ui/button";
import { EventForm } from "@/components/provider/EventForm";
import { Calender } from "@/components/Calender";
import { TaskList } from "./_components/TaskList";
import { List } from "lucide-react";


export default function Home() {
  return (
    <CalenderContextProvider >
      <div className=" container">
        <section className="lg:flex items-start justify-between gap-2 bg-stone-800 mt-[2rem] shadow-lg rounded-md">
          <div className=" p-5 lg:w-[40%] w-full">
            <div className=' flex items-center justify-center gap-3 mb-[2rem]'>
                <CalendarIcon className='w-5 h-5' />
                <h1 className=' text-[1.2rem] font-medium'>
                    Calender
                </h1>
            </div>
            <div className="flex items-center justify-between mb-[1rem]">
              <div className="w-full">
                <EventFilter/>
              </div>
              <EventForm isHidden = {false}>
                <div className=" flex items-center justify-end">
                  <Button variant={"blue"} >
                    Add Task
                  </Button>
                </div>
              </EventForm>
            </div>
            <Calender 
              currentMonth={new Date()}
            />
          </div>
          <div className=" p-5 lg:w-[60%] w-full">
            <div className=" flex items-center gap-2 mb-5">
              <List className='w-5 h-5' />
              <h2 className=' text-[1.2rem] font-medium' >List of your task </h2>
            </div>
            <TaskList/>
          </div>
        </section>
      </div>
    </CalenderContextProvider>
  );
}
