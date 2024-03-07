"use client";
import LoginForm from "../../components/loginform";
import Image from "next/image";
import "./styles.scss";

export default function LoginPage() {
  return (
    <section className="flex">
      <div className="relative login-image flex justify-center items-center">
        <Image
          className="min-h-screen w-full"
          alt="cover-image"
          width={1000}
          height={800}
          src="/cover.jpg"
        />
        <p className="absolute left-3 bottom-5 text-white font-bold text-4xl w-4/12">
          Creado por la comunidad para la comunidad
        </p>
        <LoginForm />
      </div>
    </section>
  );
}
