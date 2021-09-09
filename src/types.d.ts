import React from 'react';

export interface CloudData {
  cloud_description: string;
  cloud_name: string;
  geo_latitude: number;
  geo_longitude: number;
  geo_region: string;
  distance?: number;
}

export interface Clouds {
  clouds: CloudData[];
}

export interface Provider {
  value: string;
  label: string;
  logo: string;
}

export interface ProviderProps {
  providers: Provider[];
  handleSelect: (agr: Provider) => void;
  isActive: (arg: Provider) => boolean;
}

export interface CloudServicesProps {
  data: CloudData[];
  regions: string[];
  currentTab: number;
  handleChange: (event: ChangeEvent<{}>, index: number) => void;
  handleSort: () => void;
}

export interface TabsHeaderProps {
  regions: string[];
  currentTab: number;
  handleChange: (event: ChangeEvent<{}>, index: number) => void;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

interface ProviderCardProps {
  readonly logo: string;
  readonly isActive: boolean;
}
