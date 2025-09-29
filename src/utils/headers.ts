import { getUniqueId } from 'react-native-device-info';

export const getHeaders = async (): Promise<
  Record<string, string | boolean>
> => {
  const deviceUID = await getUniqueId();

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
    'X-Requested-With': 'XMLHttpRequest',
    'Accept-Encoding': 'gzip',
    'User-Agent': 'Mobile',

    deviceUID,
  };
};
