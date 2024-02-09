"use client";
import LoginForm from "../components/loginform";
import "./styles.scss";

export default function LoginPage() {
  return (
    <section className="flex">
      <div className="login-image flex justify-center items-center">
        <LoginForm />
      </div>
    </section>
  );
}
