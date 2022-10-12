import * as React from 'react';
import {
  AnimatedScreenWrapper,
  ImageRoundButton,
  ScreenContentContainer,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {BackIcon} from '../../assets/icons';
import {colors} from '../../theme';
import {Dimensions} from 'react-native';
import {
  BarChart,
  ContributionGraph,
  LineChart,
  PieChart,
  ProgressChart,
  StackedBarChart,
} from 'react-native-chart-kit';

const SafeView = styled.SafeAreaView``;

const BackButtonWrapper = styled.View`
  z-index: 5;
  top: 0px;
  left: 15px;
`;

const CenteredContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const VerticalDivider = styled.View`
  height: 40px;
`;

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
      ],
    },
  ],
};

const width = Dimensions.get('window').width * 0.9;

const config = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const graphStyle = {
  borderRadius: 16,
};

function ChartsExample() {
  const navigation = useNavigation();

  const goBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <AnimatedScreenWrapper>
      <BackButtonWrapper>
        <SafeView>
          <ImageRoundButton
            onPress={goBack}
            icon={<BackIcon width={15} height={15} fill={colors.white} />}
            color={colors.main}
          />
        </SafeView>
      </BackButtonWrapper>
      <ScreenContentContainer padding={100}>
        <CenteredContainer>
          <LineChart
            data={data}
            width={width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={config}
            bezier
            style={graphStyle}
          />
          <VerticalDivider />
          <ProgressChart
            data={{
              labels: ['Swim', 'Bike', 'Run'], // optional
              data: [0.4, 0.6, 0.8],
            }}
            style={graphStyle}
            width={width}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={config}
            hideLegend={false}
          />
          <VerticalDivider />
          <BarChart
            style={graphStyle}
            data={data}
            width={width}
            height={220}
            yAxisLabel="$"
            yAxisSuffix=""
            chartConfig={config}
            verticalLabelRotation={30}
          />
          <VerticalDivider />
          <StackedBarChart
            style={graphStyle}
            hideLegend={false}
            data={{
              labels: ['Test1', 'Test2'],
              legend: ['L1', 'L2', 'L3'],
              data: [
                [60, 60, 60],
                [30, 30, 60],
              ],
              barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
            }}
            width={width}
            height={220}
            chartConfig={config}
          />
          <VerticalDivider />
          <PieChart
            paddingLeft="15"
            backgroundColor="#fb8c00"
            data={[
              {
                name: 'Seoul',
                population: 21500000,
                color: 'rgba(131, 167, 234, 1)',
                legendFontColor: '#FFF',
                legendFontSize: 15,
              },
              {
                name: 'Toronto',
                population: 2800000,
                color: '#dfe4ea',
                legendFontColor: '#FFF',
                legendFontSize: 15,
              },
              {
                name: 'Beijing',
                population: 527612,
                color: '#a4b0be',
                legendFontColor: '#FFF',
                legendFontSize: 15,
              },
            ]}
            style={graphStyle}
            width={width}
            height={250}
            chartConfig={config}
            accessor={'population'}
          />
          <VerticalDivider />
          <ContributionGraph
            values={[
              {date: '2017-01-02', count: 1},
              {date: '2017-01-03', count: 2},
              {date: '2017-01-04', count: 3},
              {date: '2017-01-05', count: 4},
              {date: '2017-01-06', count: 5},
              {date: '2017-01-30', count: 2},
              {date: '2017-01-31', count: 3},
              {date: '2017-03-01', count: 2},
              {date: '2017-04-02', count: 4},
              {date: '2017-03-05', count: 2},
              {date: '2017-02-30', count: 4},
            ]}
            endDate={new Date('2017-04-01')}
            numDays={105}
            width={width}
            height={220}
            chartConfig={config}
          />
        </CenteredContainer>
      </ScreenContentContainer>
    </AnimatedScreenWrapper>
  );
}

export default React.memo(ChartsExample);
