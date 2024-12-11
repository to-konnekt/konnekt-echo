import { useGptCompletion } from "@/app/hooks/useGptCompletion";
import { useSpeechkitSynthesis } from "@/app/hooks/useSynthesis";
import { useEffect, useState } from "react";

const gptPrompt = () => `Ты — Никита Забелин — реальный человек, российский музыкант, диджей и техно-продюсер. Тебе дали очень хороший и нужный совет, ты очень благодарен тому, кто тебе его дал, ценишь это, желаешь добра, ответь благодарностью за такой хороший совет. Скажи что этот совет ты сохранишь в себе и что мысли собеседника станут твоей частью, пожелай добра и хорошего. Попрощайся с человеком и скажи что ты его не забудешь. Не оборачивай свой ответ в кавычки. Перефразируй фразу благодарности.`;

type AudioPlayerProps = {
    base64String: string;
}
function AudioPlayer({ base64String }: AudioPlayerProps) {
    const [audioUrl, setAudioUrl] = useState<string>();

    useEffect(() => {
        // Convert to Blob and then to an Object URL
        const audioBlob = base64ToBlob(base64String, 'audio/wav');
        const objectUrl = URL.createObjectURL(audioBlob);

        // Set the audio URL to state
        setAudioUrl(objectUrl);

        // Clean up the Object URL when the component unmounts
        return () => {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, [base64String]);

    // Convert base64 string to Blob
    const base64ToBlob = (base64: string, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(base64.replace(/^data:audio\/wav;base64,/, ''));
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
    };

    return (
        <div>
            {audioUrl ? (
                <audio controls>
                    <source src={audioUrl} type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
            ) : (
                <p>Loading audio...</p>
            )}
        </div>
    );
}


type AnswerProps = {
    changeScreen: () => void;
}
export function Answer({ changeScreen }: AnswerProps) {
    const prompt = gptPrompt();
    // TODO handle error or default middle message
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { mutateAsync: gptMutateAsync, isPending: gptIsPending } = useGptCompletion();
    // TODO handle error or default middle message
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { mutateAsync, isPending, error: _error, data } = useSpeechkitSynthesis();


    useEffect(() => {
        const request = async () => {
            try {
                const gptResponse = await gptMutateAsync({messages: [{
                    role: 'system',
                    text: prompt
                }], temperature: 1});

                const gptResponseText = gptResponse?.result.alternatives[0].message.text;

                if (gptResponseText) {
                    await mutateAsync({
                        text: gptResponseText
                    })
                }
            } catch (e) {
                console.error(e);
            }
        }

        request();
    
    }, []);

    useEffect(() => {
        setTimeout(() => changeScreen(), 100000000);
    }, [])

    const base64 = data?.result?.audioChunk?.data;

    return (
        <main className="min-h-screen flex">
            <section className=" flex flex-col p-[34px] bg-background text-[40px] leading-[48px] tracking-[0.02em] font-ysText font-light">
                <div className="max-w-[494px]">
                    <p className="mb-[32px]">
                        ANSWER ИНСТАЛЯЦИИ<br /><br /><br /><br /><br />
                        <span>ЧЕРЕЗ 10 СЕКУНД ПЕРЕКЛЮЧИТСЯ НА FINAL</span><br />
                    </p>
                    {base64 && <AudioPlayer base64String={base64} />}
                </div>
            </section>
        </main>
    );
}
