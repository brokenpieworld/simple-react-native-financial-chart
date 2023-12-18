import React, { useState } from 'react';
import { View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Svg, Rect, Line } from 'react-native-svg';
import * as d3 from 'd3-scale';
/***
 * Create By www.brokenpie.com
 * Author: Haren Sarma
 * 
 */
const CandlestickChart = ({ data, style, backgroundColor = 'white', candleColor = { up: 'green', down: 'red' } }) => {
    const [selectedCandle, setSelectedCandle] = useState(null);
    const { width, height } = Dimensions.get('window');

    // Scales
    const xScale = d3.scaleLinear().domain([0, data.length]).range([0, width]);
    const priceRange = [d3.min(data, d => d.low), d3.max(data, d => d.high)];
    const yScale = d3.scaleLinear().domain(priceRange).range([height, 0]);

    const handleCandleSelect = (candle, index) => {
        setSelectedCandle({ candle, x: xScale(index), y: yScale(candle.high) });
    };

    return (
        <View style={style}>
            <Svg height={height} width={width} style={{ backgroundColor }}>
                {data.map((candle, index) => {
                    const candleX = xScale(index);
                    const openY = yScale(candle.open);
                    const closeY = yScale(candle.close);
                    const highY = yScale(candle.high);
                    const lowY = yScale(candle.low);
                    const candleWidth = width / data.length - 2;
                    const fill = candle.open > candle.close ? candleColor.down : candleColor.up;

                    return (
                        <TouchableOpacity key={index} onPress={() => handleCandleSelect(candle, index)}>
                            <Line
                                x1={candleX + candleWidth / 2}
                                y1={highY}
                                x2={candleX + candleWidth / 2}
                                y2={lowY}
                                stroke={fill}
                            />
                            <Rect
                                x={candleX}
                                y={Math.min(openY, closeY)}
                                width={candleWidth}
                                height={Math.abs(closeY - openY)}
                                fill={fill}
                            />
                        </TouchableOpacity>
                    );
                })}
            </Svg>
            {selectedCandle && (
                <View style={{ position: 'absolute', left: selectedCandle.x, top: selectedCandle.y, backgroundColor: selectedCandle.candle.tooltip?.backgroundColor || 'transparent' }}>
                    <Text>{selectedCandle.candle.tooltip?.text || ''}</Text>
                </View>
            )}
        </View>
    );
};

export default CandlestickChart;
