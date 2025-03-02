import { ClientComponent } from "@/components/ClientComponent";

export default function Home() {
  return (
    <div className="sticky top-0">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ClientComponent />
      </div>
    </div>
  );
}
