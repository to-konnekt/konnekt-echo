import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

export interface SynthesisRequest {
    text: string;
}

export interface SynthesisResponse {
    result?: {
        audioChunk?: {
            data?: string;
        }
    }
}

export interface ErrorResponse {
    message: string;
}

// https://console.yandex.cloud/folders/b1gdvtj6orh47qgtjr2l
const YC_FOLDER_ID = process.env.NEXT_PUBLIC_FOLDER_ID;

const speechkitSynthesis = async (synthesisRequest: SynthesisRequest): Promise<SynthesisResponse> => {
    const response = await axios.post<SynthesisResponse>('/speechkit/api/tts/v3/utteranceSynthesis', {
        text: synthesisRequest.text,
        hints: [{"voice": "zabelin"}]
    }, {
        headers: {
            Authorization: `Api-Key ${process.env.NEXT_PUBLIC_SPEECHKIT_API_KEY}`,
            'x-folder-id': YC_FOLDER_ID
        }
    });

    return response.data;
};

export const useSpeechkitSynthesis = () => {
    return useMutation<SynthesisResponse, AxiosError<ErrorResponse>, SynthesisRequest>({ mutationFn: speechkitSynthesis });
};
