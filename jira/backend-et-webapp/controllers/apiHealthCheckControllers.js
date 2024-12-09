const { checkDatabase, checkExternalAPI } = require('../models/apiHealthCheckModels');

async function getHealthStatus(req, res) {
    const startTime = global.startTime || Date.now();
    const uptime = Math.floor((Date.now() - startTime) / 1000);

    const [dbResult, apiResult] = await Promise.allSettled([
        checkDatabase(),
        checkExternalAPI()
    ]);

    const databaseStatus = dbResult.status === "fulfilled" ? dbResult.value : "disconnected";
    const externalApiStatus = apiResult.status === "fulfilled" ? apiResult.value : "disconnected";

    const isHealthy = databaseStatus === "connected" && externalApiStatus === "connected";

    const healthStatus = {
        status: isHealthy ? "healthy" : "unhealthy",
        uptime,
        dependencies: [
            { name: "database", status: databaseStatus },
            { name: "externalAPI", status: externalApiStatus }
        ]
    };

    res.status(isHealthy ? 200 : 500).json(healthStatus);
}

module.exports = {
    getHealthStatus
};
