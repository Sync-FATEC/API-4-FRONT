import { BarChart } from '@mui/x-charts/BarChart';
import './dashboard.css';

export interface DashboardProps {
    name: string;
    parameters: Parameter[];
}

export type Measurement = {
    id: string;
    value: number;
    timestamp: string;
};

export type Parameter = {
    id: string;
    name: string;
    type: { unit: string };
    measurements: Measurement[];
};

export default function Dashboard({ name, parameters }: DashboardProps) {
    return (
        <div className="dashboard">
            <div className="charts-grid">
                {parameters.map(param => {
                    const counts = param.measurements.reduce(
                        (acc, m) => {
                            acc[m.value] = (acc[m.value] || 0) + 1;
                            return acc;
                        },
                        {} as Record<number, number>
                    );

                    const labels = Object.keys(counts);
                    const values = labels.map(v => counts[+v]);

                    return (
                        <div key={param.id} className="parameter-chart">
                            <h3 className='section-title__dashboard'>
                                {param.name} ({param.type.unit})
                            </h3>
                            {values.length > 0 ? (
                                <BarChart
                                    series={[{ data: values, color: '#383481' }]}
                                    xAxis={[{ id: 'values', data: labels, scaleType: 'band' }]}
                                    height={200}
                                />
                            ) : (
                                <p className='station-tab__empty-message'>Sem dados disponíveis</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
