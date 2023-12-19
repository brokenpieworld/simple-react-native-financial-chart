import React, { useState, useMemo, memo, useRef, useEffect } from 'react';
import { View, FlatList, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Svg, Rect, Line } from 'react-native-svg';

const Candlestick = memo(({ candle, index, xScale, yScale, candleWidth, candleColor, onSelect }) => {
    const candleX = xScale(index);
    const openY = yScale(candle.open);
    const closeY = yScale(candle.close);
    const highY = yScale(candle.high);
    const lowY = yScale(candle.low);
    const fill = candle.open > candle.close ? candleColor.down : candleColor.up;

    return (
        <TouchableOpacity onPress={() => onSelect(candle, index)}>
            <Line x1={candleX + candleWidth / 2} y1={highY} x2={candleX + candleWidth / 2} y2={lowY} stroke={fill} />
            <Rect x={candleX} y={Math.min(openY, closeY)} width={candleWidth} height={Math.abs(closeY - openY)} fill={fill} />
        </TouchableOpacity>
    );
});

const SimpleCandlestickChart = ({ data, style, backgroundColor = 'white', candleColor = { up: 'green', down: 'red' } }) => {
    const [selectedCandle, setSelectedCandle] = useState(null);
    const { width, height } = Dimensions.get('window');
    const flatListRef = useRef();
    const previousDataLength = useRef(data.length);

    let minValue = Number.POSITIVE_INFINITY;
    let maxValue = Number.NEGATIVE_INFINITY;
    for (const candle of data) {
        minValue = Math.min(minValue, candle.low);
        maxValue = Math.max(maxValue, candle.high);
    }

    const xScale = useMemo(() => (index) => (width / data.length) * index, [width, data.length]);
    const yScale = useMemo(() => (value) => ((value - minValue) / (maxValue - minValue)) * height, [minValue, maxValue, height]);
    const candleWidth = useMemo(() => width / data.length - 2, [width, data.length]);

    const handleCandleSelect = (candle, index) => {
        setSelectedCandle({ candle, x: xScale(index), y: yScale(candle.high) });
    };

    useEffect(() => {
        if (data.length > previousDataLength.current) {
            flatListRef.current?.scrollToEnd({ animated: true });
        }
        previousDataLength.current = data.length;
    }, [data]);

    return (
        <View style={style}>
            <Svg height={height} width={width} style={{ backgroundColor }}>
                <FlatList
                    ref={flatListRef}
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <Candlestick
                            candle={item}
                            index={index}
                            xScale={xScale}
                            yScale={yScale}
                            candleWidth={candleWidth}
                            candleColor={candleColor}
                            onSelect={handleCandleSelect}
                        />
                    )}
                    horizontal
                />
            </Svg>
            {selectedCandle && (
                <View style={{ position: 'absolute', left: selectedCandle.x, top: selectedCandle.y, backgroundColor: selectedCandle.candle.tooltip?.backgroundColor || 'transparent' }}>
                    <Text>{selectedCandle.candle.tooltip?.text || ''}</Text>
                </View>
            )}
        </View>
    );
};

export default SimpleCandlestickChart;
