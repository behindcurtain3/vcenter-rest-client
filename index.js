import fetch from "node-fetch";

export class VCenterRestClient {
    constructor(agent, host) {
        this.agent = agent;
        this.host = host;
        this.session = null;
    }

    async _request(url, method) {
        const response = await fetch(`${this.host}/${url}`, {
            agent: this.agent,
            method: method,
            headers: {
                "vmware-api-session-id": this.session
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }

    async login(username, password) {
        const response = await fetch(`${this.host}/rest/com/vmware/cis/session`, {
            agent: this.agent,
            method: 'POST',
            headers: {
                "Authorization": "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
            }
        });

        if (!response.ok) {
            throw new Error(`Login Failed: ${response.status} ${response.statusText}`);
        }

        let sessionId = await response.json();
        this.session = sessionId.value;
        return this.session;
    }

    async get(url) {
        return await this._request(url, "GET");
    }

    async post(url) {
        return await this._request(url, "POST");
    }

    async del(url) {
        return await this._request(url, "DELETE");
    }
}
