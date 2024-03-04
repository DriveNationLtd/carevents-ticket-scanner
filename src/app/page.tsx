import QRScanner from "@/components/scanner/Scanner";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <QRScanner />
    </main>
  );
}
