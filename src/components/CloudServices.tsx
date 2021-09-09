import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import SortIcon from '@material-ui/icons/Sort';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';

import TabsHeader from './TabsHeader';
import TabPanel from './TabPanel';

import { CloudServicesProps } from '../types';
import CardActionArea from '@material-ui/core/CardActionArea';

const CloudServicesContainer = styled.div`
  flex-grow: 1;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  width: calc(100% - 3rem);
  padding-left: 1.5rem;
`;

const StyledCard = styled(Card)`
  margin-bottom: 0.5rem;
`;

const CardContentWrapper = styled.div`
  display: flex;
`;

const StyledCardMainContent = styled(CardContent)`
  flex: 1;
`;

const StyledCardRight = styled(CardContent)`
  flex: 0.4;
`;

const SortButton = styled(Button)``;

export default function CloudServices(props: CloudServicesProps) {
  const { data, regions, currentTab, handleChange, handleSort } = props;

  return (
    <CloudServicesContainer>
      <Header>
        <TabsHeader regions={regions} currentTab={currentTab} handleChange={handleChange} />
        <Tooltip title="Sort by distance to user">
          <SortButton variant="text" size="small" startIcon={<SortIcon />} onClick={handleSort}>
            Sort
          </SortButton>
        </Tooltip>
      </Header>

      {regions.map((label, index) => (
        <TabPanel key={label} value={currentTab} index={index}>
          {data.map((item) => (
            <Fade in={true} timeout={500} key={item.cloud_name}>
              <StyledCard key={item.cloud_name}>
                <CardActionArea>
                  <CardContentWrapper>
                    <StyledCardMainContent>
                      <Typography gutterBottom component="h5" variant="h5">
                        {item.cloud_name}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {item.cloud_description}
                      </Typography>
                    </StyledCardMainContent>

                    {item.distance && (
                      <StyledCardRight>
                        <Typography variant="subtitle1">Distance</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {Math.round(item.distance as number)} km
                        </Typography>
                      </StyledCardRight>
                    )}
                  </CardContentWrapper>
                </CardActionArea>
              </StyledCard>
            </Fade>
          ))}
        </TabPanel>
      ))}
    </CloudServicesContainer>
  );
}
