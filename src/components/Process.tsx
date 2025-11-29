const steps = [
  {
    number: "01",
    title: "Créez votre compte",
    description: "Inscription gratuite en moins de 5 minutes. Aucune carte bancaire requise."
  },
  {
    number: "02",
    title: "Intégrez l'API",
    description: "Utilisez notre API simple ou nos plugins prêts à l'emploi pour votre site."
  },
  {
    number: "03",
    title: "Commencez à accepter",
    description: "Recevez vos premiers paiements et suivez vos transactions en temps réel."
  }
];

const Process = () => {
  return (
    <section id="processus" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Comment ça marche
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Démarrez en trois étapes simples
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connection line for desktop */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-border z-0" 
               style={{ width: 'calc(100% - 12rem)', marginLeft: '6rem' }} />
          
          {steps.map((step, index) => (
            <div key={index} className="relative z-10">
              <div className="bg-background border-2 border-border rounded-lg p-8 space-y-4 hover:border-accent/50 transition-colors">
                <div className="text-6xl font-bold text-accent/20">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
