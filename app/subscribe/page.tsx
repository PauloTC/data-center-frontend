import { libre_franklin700, libre_franklin600 } from "@/app/fonts";
import localFont from "next/font/local";
import Image from "next/image";
import { SubscribeForm } from "@/components/subscribe/subscribeform";

const myFont = localFont({
  src: [
    {
      path: "./AlicorpSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./AlicorpSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./AlicorpSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

const options = [
  {
    title: "Inscríbete",
    description:
      "Completa nuestro formulario de registro con tus datos. ¡Así de fácil te unes a nuestra comunidad!",
    image: "/chica.png",
  },
  {
    title: "Te Contactamos",
    description:
      "Según las necesidades de investigación, te invitaremos a participar en entrevistas, talleres y encuestas.",
    image: "/feedback.png",
  },
  {
    title: "Tu Participación",
    description:
      "Coordina con nosotros la mejor fecha y hora para participar en las actividades planificadas.",
    image: "/entrevista.png",
  },
];

const benefits = [
  {
    title: "Sé escuchado",
    description:
      "Tus ideas y opiniones pueden marcar la diferencia en el desarrollo de nuevos productos y estrategias.",
  },
  {
    title: "Recibe recompensas",
    description:
      "Por compartir tus experiencias y tiempo, te ofrecemos incentivos, merchandising, entre otros.",
  },
  {
    title: "Construye red",
    description:
      "Conecta con otros bodegueros y restauranteros, expandiendo tu red de contactos y oportunidades de negocio.",
  },
];

export default async function SubscribePage() {
  return (
    <>
      {/* <section>
        <h2>¡Creando Contigo!</h2>
        <p>Una iniciativa de Scotiabank Digital Factory</p>
        <button>Quiero ser parte</button>
        <img src="https://scotiabankfiles.azureedge.net/scotiabank-peru/librerias/iconos/ilustrativos/colores/bg-blue-dinamic-full.svg" />
      </section> */}
      {/* <section className="relative">
        <Image
          src="/subscribe_bg.svg"
          alt="background"
          className="w-full"
          height={700}
          width={1200}
        />
        <div className="absolute top-0 flex">
          <div className="max-w-2xl">
            <h1 className={`${myFont.className} font-bold text-4xl text-white`}>
              Creando contigo
            </h1>
            <p>
              Una iniciativa de Diseño y Experiencia para innovar y co-crear
              junto a la comunidad de bodegueros y restauranteros.
            </p>
          </div>
          <Image
            height={300}
            width={300}
            alt="juntos-banner"
            src="/juntos.png"
          />
        </div>
      </section> */}
      <section className="flex flex-col items-center p-12">
        <h4 className={`${myFont.className} text-3xl mb-8 font-bold`}>
          ¿Cómo participar?
        </h4>
        <ul className="flex justify-around gap-16">
          {options.map((option, index) => (
            <li
              key={index}
              className="flex flex-col items-center shadow-xl p-8 rounded-md"
            >
              <Image
                src={option.image}
                width={200}
                height={200}
                alt="Chica con laptop"
              />
              <span className={`${myFont.className} mb-3 block font-medium`}>
                Paso {index + 1}
              </span>
              <h4 className={`${myFont.className} font-bold mb-3 text-xl`}>
                {option.title}
              </h4>
              <p className={`${myFont.className} text-center text-md`}>
                {option.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="p-12 grid grid-cols-2 gap-4">
        <div className="bg-red-500 p-8">
          <h3 className={`${myFont.className} text-white text-3xl font-bold`}>
            Beneficios de ser parte de Conecta Alicorp
          </h3>

          <ul>
            {benefits.map((benefit, index) => (
              <li key={index} className="text-white mt-8">
                <h4 className={`${myFont.className} font-bold text-2xl`}>
                  {benefit.title}
                </h4>
                <p className={`${myFont.className} text-md`}>
                  {benefit.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="shadow-xl p-8">
          <SubscribeForm />
        </div>
      </section>

      <section className="flex flex-col items-center p-12">
        <h4 className={`${myFont.className} text-3xl mb-8 font-bold`}>
          Preguntas frecuentes
        </h4>
      </section>
    </>
  );
}
