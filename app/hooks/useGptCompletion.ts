import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

export type GptMessage = {
    role: 'system',
    text: string
} | {
    role: "user",
    text: string;
}

export interface GptCompletionRequest {
    temperature?: number;
    messages: GptMessage[];
}

export interface GptCompletionResponse {
    result: {
        alternatives: {
            message: {
                role: 'assistant',
                text: string,
                status: 'ALTERNATIVE_STATUS_FINAL',
            }
        }[];
    }
}

export interface ErrorResponse {
    message: string;
}

// https://console.yandex.cloud/folders/b1gdvtj6orh47qgtjr2l
const YC_FOLDER_ID = process.env.NEXT_PUBLIC_FOLDER_ID;

const gptCompletion = async (completionRequest: GptCompletionRequest): Promise<GptCompletionResponse> => {
    const response = await axios.post<GptCompletionResponse>('/cloud/api/foundationModels/v1/completion', {
        modelUri: `gpt://${YC_FOLDER_ID}/yandexgpt-32k/rc`, comletionOptions: {
            "stream": false,
            "temperature": completionRequest.temperature ?? 0.3,
            "maxTokens": 8000,
        }, messages: completionRequest.messages
    }, {
        headers: {
            Authorization: `Api-Key ${process.env.NEXT_PUBLIC_GPT_API_KEY}`
        }
    });

    return response.data;
};

export const useGptCompletion = () => {
    return useMutation<GptCompletionResponse, AxiosError<ErrorResponse>, GptCompletionRequest>({ mutationFn: gptCompletion });
};
