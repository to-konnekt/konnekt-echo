const NEIRY_PARAMS_MAP: Record<NeiryType, string> = {
    '1': 'тревожный',
    '2': 'уставший',
    '3': "тревожный",
    '4': "тревожный",
    '5': "тревожный",
    '6': "тревожный",
    '7': "тревожный",
    '8': "тревожный",
    '9': "тревожный"
};

type NeiryType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type IntroProps = {
    neiryParam1: NeiryType,
    neiryParam2: NeiryType,
}

export default function Intro({ neiryParam1, neiryParam2 }: IntroProps) {
    const humanReadable1 = NEIRY_PARAMS_MAP[neiryParam1];
    const humanReadable2 = NEIRY_PARAMS_MAP[neiryParam2];

    console.log('ya tut', humanReadable1, humanReadable2)
    return (
        <main className="min-h-screen flex">
            <section className=" flex flex-col p-[34px] bg-background text-[40px] leading-[48px] tracking-[0.02em] font-ysText font-light">
                <div className="max-w-[494px]">
                    <p className="mb-[32px]">
                        ИНТРО ИНСТАЛЯЦИИ<br />
                        <span>{humanReadable1}</span>
                        <br />
                        <span>{humanReadable2}</span>
                    </p>
                </div>
            </section>
        </main>
    );
}
