import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('October 2019', 3),
  createData('January 2020', 3.6),
  createData('February 2020', 3.5),
  createData('March 2020', 4.4),
  createData('April 2020', 14.7),
  createData('May 2020', 15.0),
  createData('June 2020', 13.3),
  createData('July 2020', 11.2),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Current unemployment rates in United States of America </Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Unemployment Rate
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
