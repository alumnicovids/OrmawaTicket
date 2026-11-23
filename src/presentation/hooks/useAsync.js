import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';

// Muat ulang setiap layar fokus, supaya stok/tiket baru langsung terlihat.
export function useAsync(load) {
  const [state, setState] = useState({ data: null, error: null });

  useFocusEffect(
    useCallback(() => {
      let active = true;
      load().then(
        (data) => active && setState({ data, error: null }),
        (error) => active && setState({ data: null, error }),
      );
      return () => { active = false; };
    }, [load]),
  );

  return state;
}
