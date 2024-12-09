export default function Hero() {
  return (
    <main className="min-h-screen flex">
      {/* Left Section */}
      <section className="bg-primary flex flex-col justify-between relative w-[1280px] shrink-0">
        <div className="p-[34px]">
          <h1 className=" font-extrabold text-[120px] leading-[122px] tracking-[0.02em] mb-[36px] text-primary-foreground">
            СЕГОДНЯ
            <br />
            МЫ СТАНЕМ
            <br />
            ЧАСТЬЮ
            <br />
            <span className="italic">ECHO</span>.
          </h1>
          <div className="text-primary-foreground font-ysText">
            <p className="text-[40px] leading-[40px] tracking-[0.02em] mb-[26px]">
              Арт-инсталляция.
            </p>
            <p className="text-[40px] leading-[48px] tracking-[0.02em]">
              Прикоснись своими мыслями и чувствами к объекту
              <br />и стань частью <span className="italic">сотворчества</span>.
            </p>
          </div>
        </div>
        <div className="p-[44px] bg-background relative overflow-hidden">
          <div className="flex items-center gap-[28px] text-[42px] leading-[46px] tracking-[0.02em] relative z-10">
            <span>КОННЕКТ</span>
            <span>
              <SlashIcon />
            </span>
            <span>Nikita Zabelin</span>
            <span>
              <SlashIcon />
            </span>
            <span>SILA SVETA</span>
            <span>
              <SlashIcon />
            </span>
            <span>NeuroLab</span>
          </div>
          <div className="bg-gradient-to-t from-accentGradientFrom to-accentGradientStops blur-[180px] w-[1405px] h-[735px] absolute bottom-[-81px] left-[960px]"></div>
        </div>
      </section>

      {/* Right Section */}
      <section className=" flex flex-col p-[34px] bg-background text-[40px] leading-[48px] tracking-[0.02em] font-ysText font-light">
        <div className="max-w-[494px]">
          <p className="mb-[32px]">
            <span className="italic">ECHO</span> — это арт-проект Центра
            технологий для общества Yandex Cloud
            <br />и Никиты Забелина
            <br />
            по созданию нового персонажа вселенной Tesla для технологичес-
            <br />
            кого сотворчества
            <br />и создания произве-
            <br />
            дений искусства.
          </p>
          <p className="">
            Это нейросеть, которая соединяет в себе технологии Яндекса
            <br />
            со знаниями, чертами личности и голосом реального человека.
          </p>
        </div>
      </section>
    </main>
  );
}

function SlashIcon() {
  return (
    <svg
      width="42"
      height="47"
      viewBox="0 0 46 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M44.447 1L1.72363 47.9957"
        stroke="white"
        strokeWidth="2.13617"
      />
    </svg>
  );
}
