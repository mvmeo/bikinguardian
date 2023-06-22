import { useEvent } from "../context/EventContext"
import { useEffect } from "react"

const Events = () => {
  const {getEvents, events} = useEvent()

  useEffect(() => {
    getEvents()
  }, [])
  return (
    <div>
      {
      events.map((event) => (
        <div key={event.id}>
          <h2>{event.titulo}</h2>
          <p>{event.descripcion}</p>
          
        </div>
      ))
    }
    </div>
  )
}

export default Events
