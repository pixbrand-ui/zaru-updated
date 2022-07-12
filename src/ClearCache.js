import React, { useEffect } from 'react'

export default function ClearCache() {
    useEffect(() => {
        caches.keys().then((names) => {
            names.forEach((name) => {
              caches.delete(name);
            });
          });
          alert("Clear successfully.");
    }, [])
  return (
    <div>ClearCache</div>
  )
}
