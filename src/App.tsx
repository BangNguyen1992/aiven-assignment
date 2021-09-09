import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import CloudServices from './components/CloudServices';
import useAsync from './hooks/useAsync';
import useGeoLocation from './hooks/useGeoLocation';
import getCloudProvider from './utils/getCloudProvider';
import getKeyByValue from './utils/getKeyByValue';
import getDistance from './utils/getDistance';
import sorting from './utils/sorting';
import { CloudData, Clouds, Provider } from './types';
import { cloudProvider, providerLogo } from './dictionary';
import Providers from './components/Providers';

const URL = 'https://api.aiven.io/v1/clouds';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [regionsData, setRegionsData] = useState<Record<string, CloudData[]>>({});
  const [cloudsData, setCloudsData] = useState<CloudData[]>([]);

  const [selectedProviders, setSelectedProviders] = useState<Provider[]>([]);
  const [filteredData, setFilteredData] = useState<CloudData[] | null>(null);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [tabData, setTabData] = useState<CloudData[]>([]);
  const [isAscend, setIsAscend] = useState<boolean>(true);

  const { isLoading, data, error } = useAsync<Clouds>(URL);
  const location = useGeoLocation();

  useEffect(() => {
    if (data?.clouds) {
      if (location) {
        const { latitude, longitude } = location;
        const dataWithDistance = data.clouds.map((item) => {
          const { geo_latitude, geo_longitude } = item;
          const distance = getDistance(latitude, geo_latitude, longitude, geo_longitude);
          return { ...item, distance };
        });
        setCloudsData(dataWithDistance);
      } else {
        setCloudsData(data?.clouds);
      }
    }
  }, [data?.clouds, location]);

  useEffect(() => {
    if (cloudsData) {
      const cloudNames = cloudsData.map((item) => getCloudProvider(item.cloud_name));
      const providers = Array.from(new Set(cloudNames)).map((provider) => {
        const providerShortName = getKeyByValue(cloudProvider, provider);
        return {
          value: providerShortName,
          label: provider,
          logo: providerLogo[providerShortName],
        };
      });
      const regions = cloudsData.map((item) => item.geo_region);
      const computedRegionData = cloudsData.reduce<Record<string, CloudData[]>>(
        (result, current) => {
          const regionData = result[current.geo_region];
          result[current.geo_region] = regionData ? [...regionData, current] : [current];

          return result;
        },
        {}
      );

      setProviders(providers);
      setRegions(Array.from(new Set(regions)).sort());
      setRegionsData(computedRegionData);
    }
  }, [cloudsData]);

  useEffect(() => {
    if (selectedProviders.length) {
      const filteredCloudData = tabData.filter((item) => {
        const providerShortName = item.cloud_name.split('-')[0];
        return selectedProviders.find(
          (selectedProvider) => selectedProvider.value === providerShortName
        );
      });
      setFilteredData(filteredCloudData);
    } else {
      setFilteredData(tabData);
    }
  }, [selectedProviders, tabData]);

  useEffect(() => {
    setTabData(regionsData[regions[tabIndex]]);
  }, [regionsData, regions, tabIndex]);

  function handleSelectProvider(provider: Provider): void {
    const selectedIndex = selectedProviders.findIndex((item) => item.value === provider.value);

    if (selectedIndex === -1) {
      setSelectedProviders([...selectedProviders, provider]);
    } else {
      let newSelections = [...selectedProviders];
      newSelections.splice(selectedIndex, 1);
      setSelectedProviders(newSelections);
    }
  }

  function isActive(provider: Provider) {
    return selectedProviders.findIndex((item) => item.value === provider.value) !== -1;
  }

  function handleChangeTab(event: React.ChangeEvent<{}>, index: number): void {
    setTabIndex(index);
  }

  function handleSortByDistance() {
    if (location && filteredData) {
      const sortedData = sorting(filteredData, isAscend, 'distance');
      setFilteredData(sortedData);
      setIsAscend(!isAscend);
    }
  }

  if (error) {
    return <div> Fetching error:</div>;
  }

  return (
    <AppContainer>
      <header className="App-header"></header>
      <Providers providers={providers} handleSelect={handleSelectProvider} isActive={isActive} />

      {isLoading || !filteredData ? (
        <LoaderContainer>
          <CircularProgress />
        </LoaderContainer>
      ) : (
        <CloudServices
          data={filteredData}
          regions={regions}
          currentTab={tabIndex}
          handleChange={handleChangeTab}
          handleSort={handleSortByDistance}
        />
      )}
    </AppContainer>
  );
}

export default App;
