import awsLogo from '../assets/aws-logo.png';
import azureLogo from '../assets/azure-logo.png';
import googleLogo from '../assets/google-logo.jpg';
import doLogo from '../assets/do-logo.png';
import upcloudLogo from '../assets/upcloud-logo.png';

export const cloudProvider: Record<string, string> = {
  aws: 'Amazon Web Services',
  azure: 'Azure',
  google: 'Google Cloud',
  do: 'DigitalOcean',
  upcloud: 'UpCloud',
};

export const providerLogo: Record<string, string> = {
  aws: awsLogo,
  azure: azureLogo,
  google: googleLogo,
  do: doLogo,
  upcloud: upcloudLogo,
};
