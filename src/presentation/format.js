export const rupiah = (n) => `Rp ${n.toLocaleString('id-ID')}`;

// Jam event mengikuti kampus, bukan zona waktu HP.
export const EVENT_TIME_ZONE = 'Asia/Makassar';

export const dateTime = (iso) =>
  new Date(iso).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short', timeZone: EVENT_TIME_ZONE });

// Urut abjad: "Festival, Musik"; lebih dari 2 -> "Festival, Lomba +1". Id yang tidak dikenal dilewati.
export const categoryLabel = (ids, categories) => {
  const names = ids.map((id) => categories.find((c) => c.id === id)?.name).filter(Boolean).sort((a, b) => a.localeCompare(b, 'id'));
  return names.length > 2 ? `${names.slice(0, 2).join(', ')} +${names.length - 2}` : names.join(', ');
};
