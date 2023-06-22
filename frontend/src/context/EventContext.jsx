import { createContext, useState, useContext } from "react";
import { createEventRequest, getEventsRequest } from "../api/events";
const EventContext = createContext();

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent debe estar dentro del proveedor EventProvider");
  }
  return context;
};

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const getEvents = async () => {
    try {
      const res = await getEventsRequest();
      setEvents(res.data);
      console.log(res.data)
    } catch (error) {
        console.log(error);
        }
  };

  const createEvent = async (event, userId) => {
    const res = await createEventRequest(event, userId);
  };
  return (
    <EventContext.Provider
      value={{
        events,
        createEvent,
        getEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
