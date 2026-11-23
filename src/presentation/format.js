export const rupiah = (n) => `Rp ${n.toLocaleString('id-ID')}`;

export const dateTime = (iso) =>
  new Date(iso).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
