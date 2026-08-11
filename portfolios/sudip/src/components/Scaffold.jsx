export default function Scaffold({ title }) {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-serif font-bold text-primary mb-6">{title}</h1>
      <p className="text-lg text-gray-600">This page is currently under development.</p>
    </div>
  );
}
