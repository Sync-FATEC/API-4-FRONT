export type ReadStationType = {
        id: string;
        uuid: string;
        name: string;
        latitude: string;
        longitude: string;
        DateLastMeasure: string;
        createdAt: string;
        parameters: {
            id: string;
            idTypeParameter: {
                id: string;
                typeJson: string;
                name: string;
                unit: string;
                numberOfDecimalsCases: number;
                factor: number;
                offset: number;
            };
            typeAlerts: {
                id: string;
                name: string;
                comparisonOperator: '>' | '<' | '=';
                value: number;
            }[];
        }[];
};