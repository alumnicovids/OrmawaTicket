import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';

// Muat ulang setiap layar fokus, supaya stok/tiket baru langsung terlihat.
// `retry` mengulang pemuatan setelah error.
export function useAsync(load) {
  const [state, setState] = useState({ data: null, error: null });
  const [attempt, setAttempt] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      load().then(
        (data) => active && setState({ data, error: null }),
        (error) => active && setState({ data: null, error }),
      );
      return () => { active = false; };
    }, [load, attempt]),
  );

  const retry = useCallback(() => {
    setState({ data: null, error: null });
    setAttempt((a) => a + 1);
  }, []);

  return { ...state, retry };
}
