import React, { useEffect, useState } from 'react';
import { ReadStationType } from '../../../types/station/ReadStationType';
import Dashboard, { Parameter } from '../../../components/dashboard/dashboard';
import dashboardService from '../../../api/dashboardService';
import '../shared/TabStyles.css';
import Button from '../../../components/button/Button';

export interface DashboardFilters {
    date?: string;
    startDate?: string;
    endDate?: string;
}

interface DashboardStationTabProps {
    station: ReadStationType;
    onUpdateStation?: () => Promise<void>;
}

type Measurement = {
    id: string;
    value: number;
    timestamp: string;
};

type ApiParameter = {
    id: string;
    name: string;
    type: { unit: string };
    measurements: Measurement[];
};

type ApiStation = {
    id: string;
    parameters: ApiParameter[];
};

export default function DashboardStationTab({ station }: DashboardStationTabProps) {
    const [parameters, setParameters] = useState<Parameter[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState<'single' | 'interval'>('single');
    const [singleDate, setSingleDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchData = async (filters?: DashboardFilters) => {
        setLoading(true);
        try {
            const response = await dashboardService.listDashboard(filters);
            const stations: ApiStation[] = response.data.model.stations;
            const found = stations.find(s => s.id === station.id);
            let params: ApiParameter[] = found ? found.parameters : [];

            if (filters) {
                if (filters.date) {
                    params = params.map(param => ({
                        ...param,
                        measurements: param.measurements.filter(m =>
                            m.timestamp.startsWith(filters.date!)
                        ),
                    }));
                } else if (filters.startDate && filters.endDate) {
                    const startMs = new Date(filters.startDate).getTime();
                    const endDateObj = new Date(filters.endDate);
                    endDateObj.setHours(23, 59, 59, 999);
                    const endMs = endDateObj.getTime();
                    params = params.map(param => ({
                        ...param,
                        measurements: param.measurements.filter(m => {
                            const t = new Date(m.timestamp).getTime();
                            return t >= startMs && t <= endMs;
                        }),
                    }));
                }
            }

            setParameters(params as Parameter[]);
        } catch (err) {
            console.error('Erro ao carregar dados do dashboard:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [station.id]);

    const handleFilter = () => {
        const filters: DashboardFilters = {};
        if (filterType === 'single' && singleDate) {
            filters.date = singleDate;
        }
        if (filterType === 'interval' && startDate && endDate) {
            filters.startDate = startDate;
            filters.endDate = endDate;
        }
        fetchData(filters);
    };

    return (
        <div className="station-tab">
            <div className="station-tab__header">
                <h2 className="station-tab__title">Dashboard</h2>
            </div>

            <div className="station-tab__filter">
                <div className="style-select-1 filter-type">
                    <label>
                        <input
                            type="radio"
                            checked={filterType === 'single'}
                            onChange={() => setFilterType('single')}
                        />{' '}
                        Data única
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={filterType === 'interval'}
                            onChange={() => setFilterType('interval')}
                        />{' '}
                        Intervalo
                    </label>
                </div>

                {filterType === 'single' ? (
                    <div className="input-container style-input-2">
                        <input
                            type="date"
                            value={singleDate}
                            onChange={e => setSingleDate(e.target.value)}
                        />
                    </div>
                ) : (
                    <div className="input-container style-input-2">
                        <input
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                        />
                        <span className="list"> até </span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                        />
                    </div>
                )}       
                    <Button
                        label={loading ? 'Carregando...' : 'Filtrar'}
                        onClick={handleFilter}
                        styleButton={1}
                    />   
            </div>

            <div className="station-tab__content">
                {loading ? (
                    <p className="station-tab__empty-message">Carregando gráficos...</p>
                ) : (
                    <Dashboard name={station.name} parameters={parameters} />
                )}
            </div>
        </div>
    );
}
