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
    title: "Registrate",
    description:
      "Llena el formulario con tus datos y ¡ya eres parte de Creando Contigo!",
    image: "/chica.png",
  },
  {
    title: "Te convocamos",
    description:
      "Cuando tengamos una actividad de investigación acorde a tu perfil, te contactaremos.",
    image: "/feedback.png",
  },
  {
    title: "Participa",
    description: "Agendaremos la actividad en el día y hora que prefieras.",
    image: "/entrevista.png",
  },
];

const benefits = [
  {
    title: "Queremos escucharte",
    description:
      "¡Participa en la creación de nuevos productos y experiencias digitales! Sé parte de este proceso a través de talleres y entrevistas en línea donde podremos conocer tu opinión.",
  },
  {
    title: "Premiamos tu iniciativa",
    description:
      "Comparte tus ideas con nosotros y recibe regalos como vales y créditos digitales en restaurantes, farmacias y supermercados.",
  },
  {
    title: "Priorizamos tu seguridad",
    description:
      "Toda actividad será realizada de manera 100% remota y virtual, priorizando tu seguridad en todo momento.",
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
            ¿Por qué ser parte de la comunidad de Dia Dia Dex?
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
