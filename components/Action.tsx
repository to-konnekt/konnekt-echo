import { useEffect } from "react";

type ActionProps = {
    changeScreen: () => void;
}
export function Action({changeScreen}: ActionProps) {
    useEffect(() => {
        setTimeout(() => changeScreen(), 10000);
    }, [])

    return (
        <main className="min-h-screen flex">
            <section className=" flex flex-col p-[34px] bg-background text-[40px] leading-[48px] tracking-[0.02em] font-ysText font-light">
                <div className="max-w-[494px]">
                    <p className="mb-[32px]">
                        ACTION ИНСТАЛЯЦИИ<br /><br /><br /><br /><br />
                        <span>ТУТ БУДЕТ ВВОД С МИКРОФОНА, А ЧЕРЕЗ 10 СЕКУНД ПЕРЕКЛЮЧИТСЯ НА ОТВЕТ</span><br />
                    </p>
                </div>
            </section>
        </main>
    );
}
