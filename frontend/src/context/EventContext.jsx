import { createContext, useState, useContext } from "react";
import { createEventRequest, getEventsRequest, updateEventRequest, deleteEventRequest, editEventRequest } from "../api/events";
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
    } catch (error) {
        console.log(error);
        }
  };

  const createEvent = async (event, userId) => {
    const res = await createEventRequest(event, userId);
  };

  const changeEventState = async (id, event) => {
    const res = await updateEventRequest(id, event);
  };

  const deleteEvent = async (id) => {
    const res = await deleteEventRequest(id);
  };

  const editEvent = async (id, event) => {
    const res = await editEventRequest(id, event);
  };


  return (
    <EventContext.Provider
      value={{
        createEvent,
        getEvents,
        changeEventState,
        editEvent,
        deleteEvent,
        events,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}