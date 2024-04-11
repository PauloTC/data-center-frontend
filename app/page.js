"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import "./styles.scss";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, []);

  return (
    <section className="flex">
      <div className="login-image flex justify-center items-center">
        <p>home</p>
      </div>
    </section>
  );
}
