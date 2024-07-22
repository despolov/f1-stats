import { useMemo, useSyncExternalStore } from 'react';

function subscribe(callback) {
  window.addEventListener('resize', callback);
  return () => {
    window.removeEventListener('resize', callback);
  };
}

function useDimensions(ref) {
  const dimensions = useSyncExternalStore(subscribe, () =>
    JSON.stringify({
      width: ref.current?.offsetWidth ?? 0,
      height: ref.current?.offsetHeight ?? 0,
    }),
  );
  return useMemo(() => JSON.parse(dimensions), [dimensions]);
}

export default useDimensions;
