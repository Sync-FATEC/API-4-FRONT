import './dashboard.css';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

export interface DashboardProps {
    name: string;
    parameters: Parameter[];
    chartType?: 'line' | 'column' | 'area';
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

export default function Dashboard({ name, parameters, chartType = 'line' }: DashboardProps) {
    return (
        <div className="dashboard">
            <div className="charts-column">
                {parameters.map(param => {
                    // Ordenar medições por data para gráfico de linha temporal
                    const sortedMeasurements = [...param.measurements].sort(
                        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
                    );

                    // Preparar dados para o gráfico (formato [timestamp, value])
                    const data = sortedMeasurements.map(m => [
                        new Date(m.timestamp).getTime(),
                        m.value
                    ]);

                    // Configuração do gráfico Highcharts Stock
                    const options = {
                        rangeSelector: {
                            selected: 1,
                            inputEnabled: false
                        },
                        title: {
                            text: `${param.name} (${param.type.unit})`
                        },
                        time: {
                            // Usar o fuso horário local para exibição das datas
                            useUTC: false
                        },
                        xAxis: {
                            type: 'datetime',
                            overscroll: '10px',
                            labels: {
                                style: {
                                    fontSize: '10px'
                                }
                            }
                        },
                        yAxis: {
                            title: {
                                text: param.type.unit
                            }
                        },
                        chart: {
                            type: chartType,
                            height: 420,
                           
                        },
                        responsive: {
                            rules: [{
                                condition: {
                                    maxWidth: 768
                                },
                                chartOptions: {
                                    chart: {
                                        height: 300 
                                    }
                                }
                            }]
                        },
                        series: [{
                            type: chartType,
                            name: param.name,
                            data: data,
                            tooltip: {
                                valueDecimals: 2,
                                valueSuffix: ` ${param.type.unit}`
                            },
                            dataLabels: {
                                enabled: false
                            },
                            lastPrice: {
                                enabled: true,
                                color: 'transparent',
                                label: {
                                    enabled: true,
                                    backgroundColor: '#ffffff',
                                    borderColor: '#2caffe',
                                    borderWidth: 1,
                                    style: {
                                        color: '#000000'
                                    }
                                }
                            }
                        }],
                        credits: {
                            enabled: false
                        }
                    };

                    return (
                        <div key={param.id} className="parameter-chart">
                            {data.length > 0 ? (
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    constructorType={'stockChart'}
                                    options={options}
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
