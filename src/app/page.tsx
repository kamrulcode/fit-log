import Hero from "@/components/Hero";
import Library from "@/components/Library";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl px-5">
        <Hero />
        <Library />
      </main>
    </div>
  );
};

export default HomePage;
