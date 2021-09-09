import { cloudProvider } from '../dictionary';

function getCloudProvider(name: string): string {
  const shortName = name.split('-')[0];
  return cloudProvider[shortName];
}

export default getCloudProvider;
