import LogoTextOnly from "../ui/LogoTextOnly";

export default function WorkflowSection() {
  const steps = [
    {
      num: "1",
      title: "Create an RFQ",
      desc: "Add items, quantities, specifications, and deadlines.",
    },
    {
      num: "2",
      title: "Invite Your Suppliers",
      desc: "Bring the suppliers you already work with. No marketplace fees.",
    },
    {
      num: "3",
      title: "Collect & Compete",
      desc: "Receive quotations or run a live reverse auction.",
    },
    {
      num: "4",
      title: "Compare & Award",
      desc: "Review bids, select a supplier, and export the auditable result.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          How <LogoTextOnly /> Works
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          A clean, linear process to get from requirement to awarded supplier.
        </p>
      </div>
      <div className="grid md:grid-cols-4 gap-8 relative">
        <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-[2px] bg-slate-100 -z-10"></div>
        {steps.map((step) => (
          <div
            key={step.num}
            className="bg-white flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-lg mb-6">
              {step.num}
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
