export const rupiah = (n) => `Rp ${n.toLocaleString('id-ID')}`;

// Jam event mengikuti kampus, bukan zona waktu HP.
export const EVENT_TIME_ZONE = 'Asia/Makassar';

export const dateTime = (iso) =>
  new Date(iso).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short', timeZone: EVENT_TIME_ZONE });
