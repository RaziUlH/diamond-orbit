import { useGLTF } from '@react-three/drei';
import { suspend } from 'suspend-react';

const getCachedModel = async (url) => {
  if (!('caches' in window)) return url; // Fallback if Cache API is unavailable
  
  const cache = await caches.open('three-models-cache');
  let response = await cache.match(url);
  
  if (!response) {
    // Fetch and cache if not found
    response = await fetch(url);
    if (response.ok) {
      await cache.put(url, response.clone());
    }
  }
  
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

export function useCachedGLTF(url) {
  // Suspend the component while we interact with the async CacheStorage API
  const blobUrl = suspend(getCachedModel, [url]);
  
  // Pass the local ObjectURL to useGLTF (which also internally suspends)
  return useGLTF(blobUrl);
}

// Emulate Drei's preload behavior
useCachedGLTF.preload = (url) => {
  getCachedModel(url).then(blobUrl => useGLTF.preload(blobUrl));
};
