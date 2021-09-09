import { useEffect, useState } from 'react';
import { GeoLocation } from '../types';

export default function useGeoLocation(): GeoLocation | null {
  const [location, setLocation] = useState<GeoLocation | null>(null);

  // https://www.pluralsight.com/guides/how-to-use-geolocation-call-in-reactjs
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  return location;
}
