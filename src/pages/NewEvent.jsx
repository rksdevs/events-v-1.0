import React, { useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "../components/ui/calendar";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { addNewEvent } from "../Features/eventsSlice";

const NewEvent = () => {
  const { events } = useSelector((state) => state.eventsState);
  const dispatch = useDispatch();

  const [date, setDate] = useState();
  //   const [showPreview, setShowPreview] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");

  const randomIdCreator = (name) => {
    let randomNumber = Math.floor(Math.random() * 100000000000);
    let id = String(
      name.charAt(0) + randomNumber + name.charAt(name.length - 1)
    );
    return id.toLowerCase();
  };

  const handleEventCreation = async (e) => {
    e.preventDefault();
    // setShowPreview(true);
    randomIdCreator(eventName);
    const payload = {
      eventId: randomIdCreator(eventName),
      eventName,
      eventType,
      eventDate: date,
    };
    console.log(payload);
    dispatch(addNewEvent(payload));
  };

  return (
    <div className="gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
          <CardDescription>Create a new event</CardDescription>
          <CardContent className="grid grid-cols-3 gap-4">
            <fieldset className="col-span-2 flex flex-col gap-4 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Setup Event
              </legend>
              <CardContent>
                <div className="flex p-4 gap-3">
                  <form
                    className="flex flex-col gap-4 w-full"
                    onSubmit={handleEventCreation}
                  >
                    <div className="flex flex-col md:flex-row items-center gap-3">
                      <Label
                        htmlFor="eventName"
                        className="w-full md:w-2/5 text-center md:text-left"
                      >
                        Event Name
                      </Label>
                      <Input
                        id="eventName"
                        type="text"
                        placeholder="Enter name of the event"
                        className="w-full"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-3">
                      <Label
                        htmlFor="eventType"
                        className="w-full md:w-2/5 text-center md:text-left"
                      >
                        Event Type
                      </Label>
                      <Select
                        className="w-full md:w-3/5"
                        onValueChange={(e) => setEventType(e)}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select event type"
                            value={eventType}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regular">
                            One Time Event
                          </SelectItem>
                          <SelectItem value="recurring">
                            Recurring Event
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-3">
                      <Label
                        htmlFor="eventType"
                        className="w-full md:w-2/5 text-center md:text-left"
                      >
                        Select Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <Button type="submit">Create Event</Button>
                  </form>
                </div>
              </CardContent>
            </fieldset>
            <fieldset className="col-span-1 flex flex-col gap-4 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Preview Event
              </legend>
              <CardContent>
                {events?.length &&
                  events?.map((event) => (
                    <div key={event?.eventId}>
                      <Card className="m-2">
                        <CardHeader>
                          <CardTitle>{event?.eventName}</CardTitle>
                          <CardDescription>{event?.eventType}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>{event?.eventDate}</p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
              </CardContent>
            </fieldset>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default NewEvent;
