# vcenter-rest-client

A library to easily interact with vCenter REST API.

## Example

    import { VCenterRestClient } from 'vcenter-rest-client';
    import https from "https";

    // Use this agent if you have a self-signed certificate on vCenter
    const agent = new https.Agent({
        rejectUnauthorized: false
    });
    const host = "https://your-vcenter-host";
    const apiClient = new VCenterRestClient(agent, host);

    try {
        await apiClient.login("username", "password");
    } catch(error) {
        console.error(error.message);
    }

    // Get all VMs
    let virtualMachines = apiClient.get("rest/vcenter/vm");

    // Get all Hosts
    let hosts = apiClient.get("rest/vcenter/host");