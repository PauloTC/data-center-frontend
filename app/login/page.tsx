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
        <LoginForm />
      </div>
    </section>
  );
}
