import { useEffect, useState } from "react";

/*
  사용자의 위치정보를 가져오는 hook
  사용법 : const { latitude, longitude } = useCoords();
*/

interface IUseCoordsState {
  latitude: number | null;
  longitude: number | null;
}

export default function useCoords() {
  const [coords, setCoords] = useState<IUseCoordsState>({
    latitude: null,
    longitude: null,
  });
  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setCoords({ latitude, longitude });
  };

  // Get user's coordination
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  return coords;
}
