# React Native Candlestick Chart Library

A simple and customizable candlestick chart library for React Native, perfect for financial applications and data visualization.

## Features

- Candlestick charts with customizable styles.
- Optional tooltips for each candlestick.
- Touch interaction for viewing detailed data.
- Scalable to different dataset sizes.
- Easy to integrate and use in React Native projects.

## Installation

To install the library, run the following command:

```bash
npm install simple-react-native-financial-chart
or
yarn add simple-react-native-financial-chart
``````

## Usage

Import `CandlestickChart` from the library and pass in the required data.

```javascript
import React from 'react';
import CandlestickChart from 'simple-react-native-financial-chart';

const App = () => {
  const data = [
    { time: 1234567890, open: 100, high: 110, low: 90, close: 105, tooltip: { text: "Buy", backgroundColor: "green" } },
    // ... more data points
  ];

  return (
    <CandlestickChart data={data} style={{ flex: 1 }} />
  );
};

export default App;
``````

## Props

| Prop              | Type   | Description                                       |
|-------------------|--------|---------------------------------------------------|
| `data`            | array  | Array of candlestick data objects.                |
| `style`           | object | Style properties for the chart container.         |
| `backgroundColor` | string | Background color of the chart.                    |
| `candleColor`     | object | Colors for up and down candlesticks.              |

## Contributing

Contributions are welcome! 

### Made with ❤️ by Broken Pie