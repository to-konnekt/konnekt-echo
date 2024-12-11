import { useGptCompletion } from "@/app/hooks/useGptCompletion";
import { useEffect } from "react";

const NEIRY_PARAMS_MAP: Record<NeiryType, string> = {
    '1': 'тревожный',
    '2': 'уставший',
    '3': "тревожный",
    '4': "тревожный",
    '5': "тревожный",
    '6': "тревожный",
    '7': "тревожный",
    '8': "тревожный",
    '9': "уставший"
};

export type NeiryType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type IntroProps = {
    neiryParam1: NeiryType,
    neiryParam2: NeiryType,
    changeScreen: () => void,
}

type HumanReadableNeiry = {
    humanReadable1: string;
    humanReadable2: string;
}

const getBeginningMessage = ({ humanReadable1, humanReadable2 }: HumanReadableNeiry) => `Привет, я чувствую, что ты ${humanReadable1} ${humanReadable2}`;
const gptPrompt = () => `Ты — Никита Забелин — реальный человек, российский музыкант, диджей и техно-продюсер, родом из Екатеринбурга, который играл сеты в клубах Berghain и Bassiani, на вечеринках Burberry и adidas.
Также являешься основателем объединения Resonance и куратором Мастерской Resonance в Moscow Music School.
Известен многими своими проектами, например, вселенная Tesla, в котором нейросеть вселилась в тело человека, попыталась избавить мир от хаоса, но провалилась с этой идеей. В итоге она озлобилась на всех и расщепилась на разные личности.
Ты разговариваешь с человеком, перефразируй фразу \`хотел бы я ощущать то, что ощущаешь ты\`, помни о том, что твой собеседник имеет следующее состояние. Состояние собеседника:`;

const endingMessage = `Я хочу, что бы ты помог мне.
Я хочу, что бы твои мысли, стали частью меня.
Подойди, поделись своим секретом, как мне стать лучше?`;

export default function Intro({ neiryParam1, neiryParam2, changeScreen }: IntroProps) {
    const humanReadable1 = NEIRY_PARAMS_MAP[neiryParam1];
    const humanReadable2 = NEIRY_PARAMS_MAP[neiryParam2];

    const humanReadableParams = { humanReadable1, humanReadable2 };
    const beginningMessage = getBeginningMessage(humanReadableParams);
    const prompt = gptPrompt()

    // TODO handle error or default middle message
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { mutate, isPending, error: _error, data } = useGptCompletion();

    useEffect(() => {
        mutate({
            messages: [{
                role: 'system',
                text: prompt
            }, {
                role: 'user',
                text: `${humanReadable1} ${humanReadable2}`,
            }]
        })
    }, []);

    useEffect(() => {
        setTimeout(() => changeScreen(), 10000);
    }, [])

    const middleGptResponse = data?.result.alternatives[0].message.text;

    return (
        <main className="min-h-screen flex">
            <section className=" flex flex-col p-[34px] bg-background text-[40px] leading-[48px] tracking-[0.02em] font-ysText font-light">
                <div className="max-w-[494px]">
                    <p className="mb-[32px]">
                        INTRO<br /><br /><br /><br /><br />
                        <span>{beginningMessage}</span><br />
                        <span>{isPending ? 'LOADING' : middleGptResponse}</span><br />
                        <span>{endingMessage}</span><br /><br />
                        <span>ЧЕРЕЗ 10 СЕКУНД ПЕРЕКЛЮЧИТСЯ НА ACTION</span>
                    </p>
                </div>
            </section>
        </main>
    );
}
