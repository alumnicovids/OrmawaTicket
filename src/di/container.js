import { EventRepositoryImpl } from '../data/repositories/EventRepositoryImpl';
import { OrmawaRepositoryImpl } from '../data/repositories/OrmawaRepositoryImpl';
import { TicketRepositoryImpl } from '../data/repositories/TicketRepositoryImpl';
import { SearchEvents } from '../domain/usecases/SearchEvents';
import { GetEventById } from '../domain/usecases/GetEventById';
import { GetOrmawaList } from '../domain/usecases/GetOrmawaList';
import { GetMyTickets } from '../domain/usecases/GetMyTickets';
import { GetTicketById } from '../domain/usecases/GetTicketById';
import { PurchaseTicket } from '../domain/usecases/PurchaseTicket';

// Satu-satunya tempat yang tahu implementasi konkret repository.
const eventRepository = new EventRepositoryImpl();
const ormawaRepository = new OrmawaRepositoryImpl();
const ticketRepository = new TicketRepositoryImpl();

export const container = {
  searchEvents: new SearchEvents(eventRepository),
  getEventById: new GetEventById(eventRepository),
  getOrmawaList: new GetOrmawaList(ormawaRepository),
  getMyTickets: new GetMyTickets(ticketRepository),
  getTicketById: new GetTicketById(ticketRepository),
  purchaseTicket: new PurchaseTicket(eventRepository, ticketRepository),
};
