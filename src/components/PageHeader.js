export default function PageHeader({ title, subtitle, circuit = true }) {
  return (
    <section className="gradient-dark pt-28 pb-16 md:pt-36 md:pb-20 relative overflow-hidden">
      {circuit && (
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234CAF50' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50]/5 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl text-green-200 max-w-3xl">{subtitle}</p>}
      </div>
    </section>
  )
}
