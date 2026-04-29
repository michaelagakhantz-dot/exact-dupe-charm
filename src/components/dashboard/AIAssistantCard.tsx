import blob from "@/assets/blob-3d.jpg";

export const AIAssistantCard = () => {
  return (
    <div className="glass-card card-hover rounded-[2rem] p-8 flex flex-col h-full">
      <h2 className="text-2xl font-medium text-foreground mb-4">AI Assistant</h2>

      <div className="relative flex-1 flex items-center justify-center my-4">
        <div className="absolute inset-0 m-auto w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,hsl(268_85%_60%/0.3),transparent_70%)] blur-2xl animate-pulse-glow" />
        <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden animate-float">
          <img
            src={blob}
            alt="AI"
            className="w-full h-full object-cover animate-spin-slow"
            style={{ animationDuration: "60s" }}
            loading="lazy"
          />
        </div>
      </div>

      <button className="self-center grad-button px-8 py-2.5 rounded-full text-white text-sm font-medium shadow-[0_8px_24px_-6px_hsl(230_95%_65%/0.6)] hover:scale-105 transition-transform mb-6">
        Try Now
      </button>

      <p className="text-xl leading-relaxed">
        <span className="text-foreground">Analyze product sales over last year. </span>
        <span className="text-muted-foreground">Compare revenue, quality, sales and brand</span>
      </p>
    </div>
  );
};
