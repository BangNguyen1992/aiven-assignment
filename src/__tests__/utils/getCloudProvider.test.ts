import getCloudProvider from '../../utils/getCloudProvider';

describe('getCloudProvider', () => {
  test('should get the cloud provider', () => {
    expect(getCloudProvider('aws-af-south-1')).toBe('Amazon Web Services');
    expect(getCloudProvider('azure-south-africa-north')).toBe('Azure');
    expect(getCloudProvider('google-asia-east2')).toBe('Google Cloud');
    expect(getCloudProvider('do-blr')).toBe('DigitalOcean');
    expect(getCloudProvider('upcloud-sg-sin')).toBe('UpCloud');
  });
});
