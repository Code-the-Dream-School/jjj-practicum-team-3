export default function CheckoutSuccessPage({
  searchParams,
}: { searchParams?: { orderId?: string } }) {
  const orderId = searchParams?.orderId;

  return (
    <main className="min-h-screen bg-[#0f121a] text-[#e7eaf3] px-4 py-16">
      <div className="mx-auto max-w-md rounded-2xl border border-[#2b3450] bg-[#1b2030] p-8 text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-emerald-500/20 grid place-items-center">
          <span className="text-emerald-400 text-2xl">✔</span>
        </div>
        <h1 className="text-xl font-extrabold">Payment received</h1>
        <p className="mt-2 text-sm text-[#a3acc2]">
          Thank you! Your tickets are confirmed.
          {orderId ? <> Order ID: <span className="font-mono">{orderId}</span></> : null}
        </p>

        <div className="mt-6 space-x-3">
          <a href="/movies" className="rounded-md border border-[#2b3450] px-4 py-2 text-sm hover:bg-[#111726]">Back to Movies</a>
          <a href="/" className="rounded-md bg-[#F05A3B] px-4 py-2 text-sm font-extrabold text-white shadow-[0_4px_0_0_#B8402B]">Home</a>
        </div>
      </div>
    </main>
  );
}
