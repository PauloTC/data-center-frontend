"use client";
import { useState, useEffect } from "react";
import LoginForm from "../../components/loginform";
import Image from "next/image";
import "./styles.scss";

export default function LoginPage() {
  const [showAnimation, setShowAnimation] = useState(false);

  return (
    <section className="flex">
      <div
        className="
        flex min-h-screen 
        justify-between w-full 
        bg-gray-900 
        overflow-hidden"
      >
        <div className="p-8 self-end w-4/6">
          <div className="flex">
            <ul className="grid grid-cols-4 gap-5">
              {Array.from({ length: 18 }).map((_, index) => (
                <li
                  style={{ animationDelay: `${1 + Math.random() * 4}s` }} // Genera un número aleatorio entre 1 y 5 segundos
                  className="fade-in login-image relative"
                  key={index}
                >
                  <Image
                    src="/images/javier.png"
                    alt="person"
                    height={80}
                    width={80}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <LoginForm />
      </div>
    </section>
  );
}
