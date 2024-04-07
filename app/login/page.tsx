"use client";
import LoginForm from "../../components/loginform";
import Image from "next/image";
import "./styles.scss";

export default function LoginPage() {
  return (
    <section className="flex">
      <div className="flex min-h-screen justify-between w-full bg-red-600 overflow-hidden">
        <div className="self-end w-4/6">
          <Image
            className=""
            src="/team.png"
            alt="team"
            height={900}
            width={600}
          />
        </div>
        <LoginForm />
      </div>
    </section>
  );
}
