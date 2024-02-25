function mapToServerModel(clientModel: any, mapping: any): any {
    const serverModel: Record<string, any> = {};
    Object.keys(clientModel).forEach(key => {
        const serverKey = mapping[key] || key;
        serverModel[serverKey] = clientModel[key];
    });
    return serverModel;
}

function mapToClientModel<T extends Record<string, any>>(serverModel: any, mapping: any): T {
    const clientModel: Record<string, any> = {};
    Object.keys(mapping).forEach(clientKey => {
        const serverKey = mapping[clientKey];
        if (serverKey in serverModel) {
            clientModel[clientKey] = serverModel[serverKey];
        }
    });
    return clientModel as T;
}

export {mapToClientModel, mapToServerModel}