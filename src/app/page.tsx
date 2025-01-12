import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to your Next.js app!</h1>
      <Image src="/logo.svg" alt="logo" width={200} height={200} />
    </div>
  );
}
