import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

export function Dashboard() {
  const navigate = useNavigate();
  const { events } = useSelector((state) => state.eventsState);

  const capitalizeFirstLetter = (str) => {
    let newStr = String(str.charAt(0).toUpperCase()) + String(str.slice(1));
    return newStr;
  };

  useEffect(() => {
    console.log(events?.filter((event) => event?.frequency === "custom"));
  }, [events]);
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader className="flex justify-between ">
          <div>
            <CardTitle className="flex items-center justify-between mb-2">
              <p>Events</p>
              <Button
                size="sm"
                className="h-7 gap-1"
                onClick={() => navigate("/new-event")}
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Event
                </span>
              </Button>
            </CardTitle>
            <CardDescription>
              Check your events and plan your day.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Event Type</TableHead>
                <TableHead className="text-center">Event Frequency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events?.map((item) => (
                <TableRow key={item?.eventId}>
                  <TableCell className="font-medium text-left">
                    {item?.eventId}
                  </TableCell>
                  <TableCell>{item?.eventName}</TableCell>
                  <TableCell>
                    {capitalizeFirstLetter(item?.eventType)}
                  </TableCell>
                  <TableCell className="text-center">
                    {item?.frequency
                      ? capitalizeFirstLetter(item?.frequency)
                      : "Not applicable"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">List of events</div>
        </CardFooter>
      </Card>
    </main>
  );
}
