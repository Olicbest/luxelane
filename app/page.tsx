import HeroSection from "../components/HeroSection";
import HomeCatalog from "../components/HomeCatalog";

export default async function HomePage(props: {
  searchParams: Promise<{ category?: string }>;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <HeroSection />
      <HomeCatalog initialCategory={searchParams.category} />
    </div>
  );
}
