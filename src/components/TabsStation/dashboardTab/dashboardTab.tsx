import React, { useEffect, useState } from 'react';
import { ReadStationType } from '../../../types/station/ReadStationType';
import Dashboard, { Parameter } from '../../../components/dashboard/dashboard';
import dashboardService from '../../../api/dashboardService';
import '../shared/TabStyles.css';

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
    const [loadingCharts, setLoadingCharts] = useState(true);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const response = await dashboardService.listDashboard();
                const stations: ApiStation[] = response.data.model.stations;
                const found = stations.find((s: ApiStation) => s.id === station.id);

                if (found) {
                    setParameters(found.parameters);
                } else {
                    console.warn(
                        `Estação com id "${station.id}" (uuid "${station.uuid}") não encontrada em /dashboard/list`
                    );
                }
            } catch (error) {
                console.error('Erro ao carregar dados do dashboard:', error);
            } finally {
                setLoadingCharts(false);
            }
        };

        loadDashboard();
    }, [station.id, station.uuid]);

    return (
        <div className="station-tab">
            <div className="station-tab__header">
                <h2 className="station-tab__title">Dashboard</h2>
            </div>

            {loadingCharts ? (
                <p className='station-tab__empty-message'>Carregando gráficos...</p>
            ) : (
                <Dashboard name={station.name} parameters={parameters} />
            )}
        </div>

    );
}
