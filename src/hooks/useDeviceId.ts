import { useState, useEffect } from 'react';
import DeviceInfo from 'react-native-device-info';

export const useDeviceId = () => {
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeviceId = async () => {
      try {
        const id = await DeviceInfo.getUniqueId();
        setDeviceId(id);
      } catch (error) {
        console.error('Failed to get device ID:', error);
        setDeviceId(null);
      }
    };

    fetchDeviceId();
  }, []);

  return deviceId;
};
