import axios from 'axios';

const LANGFLOW_ID = ""; //add langflow id
const ENDPOINT = ""; // add endpoint 
const APPLICATION_TOKEN = ""; // add your  application token

export const runFlow = async (message: string): Promise<string> => {
    const api_url = `/api/lf/${LANGFLOW_ID}/api/v1/run/${ENDPOINT}`;

    const payload = {
        input_value: message,
        output_type: "chat",
        input_type: "chat",
    };

    const headers = {
        Authorization: `Bearer ${APPLICATION_TOKEN}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await axios.post(api_url, payload, { headers });
        return response.data.outputs[0]?.outputs[0]?.results?.message?.text || "No response received";
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`HTTP error! status: ${error?.response?.status}`);
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};