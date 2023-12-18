declare module 'simple-react-native-financial-chart' {
    import { ReactNode } from 'react';

    interface Candlestick {
        close: number;
        high: number;
        low: number;
        open: number;
        time: number;
        tooltip?: {
            text?: string;
            backgroundColor?: string;
        };
    }

    interface SimpleCandlestickChartProps {
        data: Candlestick[];
        style?: Record<string, unknown>;
        backgroundColor?: string;
        candleColor?: {
            up: string;
            down: string;
        };
    }

    export const SimpleCandlestickChart: (props: SimpleCandlestickChartProps) => ReactNode;
}  