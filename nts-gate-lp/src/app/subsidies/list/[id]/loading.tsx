import Header from "@/components/shared/Header";
import LpFooter from "@/components/gate-lp/LpFooter";
import SubsidiesGalaxyBackdrop from "../../SubsidiesGalaxyBackdrop";

export default function LoadingSubsidyDetail() {
  return (
    <>
      <Header />
      <main className="relative z-[2] min-h-[100svh] font-body">
        <SubsidiesGalaxyBackdrop />
        <div className="relative z-10 mx-auto max-w-4xl px-6 py-24">
          <div className="rounded-2xl border border-[#e4e1da] bg-[#f9f7f3]/95 p-8 shadow-sm backdrop-blur-sm md:p-10">
            <div className="h-5 w-28 animate-pulse rounded bg-[#ece8df]" />
            <div className="mt-6 h-10 w-11/12 animate-pulse rounded bg-[#ece8df]" />

            <div className="mt-8 grid grid-cols-1 gap-4 rounded-xl border border-[#e3dfd6] bg-white p-5 md:grid-cols-2">
              <div>
                <div className="h-4 w-20 animate-pulse rounded bg-[#f0ede6]" />
                <div className="mt-2 h-5 w-36 animate-pulse rounded bg-[#ece8df]" />
              </div>
              <div>
                <div className="h-4 w-12 animate-pulse rounded bg-[#f0ede6]" />
                <div className="mt-2 h-5 w-40 animate-pulse rounded bg-[#ece8df]" />
              </div>
              <div className="md:col-span-2">
                <div className="h-4 w-16 animate-pulse rounded bg-[#f0ede6]" />
                <div className="mt-3 flex gap-2">
                  <div className="h-6 w-20 animate-pulse rounded-full bg-[#f0ede6]" />
                  <div className="h-6 w-16 animate-pulse rounded-full bg-[#f0ede6]" />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="h-6 w-24 animate-pulse rounded bg-[#ece8df]" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-[#f0ede6]" />
                <div className="h-4 w-full animate-pulse rounded bg-[#f0ede6]" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-[#f0ede6]" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <LpFooter />
    </>
  );
}
