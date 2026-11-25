// shortcut: event belum punya jam selesai, jadi tiket dianggap berlaku sampai 24 jam setelah jam mulai
// (cukup untuk acara 1 hari dan hackathon 24 jam); tambahkan `endDate` di event kalau datanya ada.
const GRACE_MS = 24 * 60 * 60 * 1000;

// 'active' | 'expired'
export const ticketStatus = (ticket, now = new Date()) =>
  now.getTime() > new Date(ticket.eventDate).getTime() + GRACE_MS ? 'expired' : 'active';
