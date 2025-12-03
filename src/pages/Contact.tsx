import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const leadSchema = z.object({
  firstName: z.string().trim().min(1, "Le prénom est requis").max(100, "Le prénom est trop long"),
  lastName: z.string().trim().min(1, "Le nom est requis").max(100, "Le nom est trop long"),
  email: z.string().trim().email("Email invalide").max(255, "L'email est trop long"),
  phone: z.string().trim().max(30, "Le numéro est trop long").optional(),
  company: z.string().trim().max(200, "Le nom d'entreprise est trop long").optional(),
  fleetSize: z.string().trim().max(50, "La taille de flotte est trop longue").optional(),
  message: z.string().trim().max(2000, "Le message est trop long").optional(),
});

const Contact = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestType, setRequestType] = useState<"message" | "demo">("message");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    fleetSize: "",
    message: "",
  });

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "demo") {
      setRequestType("demo");
    }
  }, [searchParams]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const validation = leadSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert({
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        company: formData.company.trim() || null,
        fleet_size: formData.fleetSize.trim() || null,
        message: formData.message.trim() || null,
        request_type: requestType,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-28 pb-24 px-6">
          <div className="container mx-auto max-w-2xl text-center">
            <div className="bg-card rounded-3xl p-16 border-2 border-border shadow-xl">
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h1 className="text-4xl font-bold mb-6">Merci pour votre message !</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Notre équipe vous contactera dans les plus brefs délais.
              </p>
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    company: "",
                    fleetSize: "",
                    message: "",
                  });
                }}
                variant="outline"
                className="text-lg py-6 px-8 rounded-xl"
              >
                Envoyer un autre message
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-6 mb-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
              Parlons de votre flotte
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Notre équipe est là pour répondre à toutes vos questions et vous accompagner dans votre projet.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="bg-card rounded-3xl p-10 border-2 border-border shadow-xl">
              <h2 className="text-3xl font-bold mb-8">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-bold text-foreground">Type de demande</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => setRequestType("message")}
                      className={`px-6 py-4 rounded-xl border-2 font-bold transition-all ${
                        requestType === "message" 
                          ? "border-primary bg-primary/10 text-primary" 
                          : "border-border hover:border-accent hover:bg-accent/10"
                      }`}
                    >
                      💬 Message
                    </button>
                    <button 
                      type="button"
                      onClick={() => setRequestType("demo")}
                      className={`px-6 py-4 rounded-xl border-2 font-bold transition-all ${
                        requestType === "demo" 
                          ? "border-primary bg-primary/10 text-primary" 
                          : "border-border hover:border-accent hover:bg-accent/10"
                      }`}
                    >
                      📅 Réserver un appel
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Prénom *</label>
                    <Input 
                      placeholder="Ahmed" 
                      className={`h-12 text-base ${errors.firstName ? "border-destructive" : ""}`}
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                    {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Nom *</label>
                    <Input 
                      placeholder="Benjelloun" 
                      className={`h-12 text-base ${errors.lastName ? "border-destructive" : ""}`}
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                    {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Email professionnel *</label>
                  <Input 
                    type="email" 
                    placeholder="ahmed@entreprise.ma" 
                    className={`h-12 text-base ${errors.email ? "border-destructive" : ""}`}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Téléphone</label>
                  <Input 
                    type="tel" 
                    placeholder="+212 6 12 34 56 78" 
                    className="h-12 text-base"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Entreprise</label>
                  <Input 
                    placeholder="Nom de votre entreprise" 
                    className="h-12 text-base"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Taille de la flotte</label>
                  <Input 
                    placeholder="Nombre de véhicules" 
                    className="h-12 text-base"
                    value={formData.fleetSize}
                    onChange={(e) => handleInputChange("fleetSize", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Message</label>
                  <Textarea 
                    placeholder="Parlez-nous de votre projet..." 
                    className="min-h-[150px] text-base"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-xl font-bold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer le message"
                  )}
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-10 border-2 border-primary/10">
                <h2 className="text-3xl font-bold mb-8">Nos coordonnées</h2>
                
                <div className="space-y-8">
                  <div className="flex gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Adresse</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        123 Boulevard Hassan II<br />
                        Casablanca, Maroc<br />
                        20250
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-7 h-7 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Téléphone</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        +212 5 22 12 34 56<br />
                        +212 6 12 34 56 78 (Mobile)
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-7 h-7 text-success" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Email</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        contact@fleetpay.ma<br />
                        support@fleetpay.ma
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-warning/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-7 h-7 text-warning" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Horaires</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Lundi - Vendredi: 9h - 18h<br />
                        Samedi: 9h - 13h<br />
                        Dimanche: Fermé
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 rounded-3xl p-10 border-2 border-accent/10">
                <h3 className="text-2xl font-bold mb-4">Besoin d'une démo ?</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                  Planifiez un rendez-vous avec notre équipe pour une démonstration personnalisée de FleetPay.
                </p>
                <Button 
                  onClick={() => setRequestType("demo")}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6 rounded-xl font-bold"
                >
                  Réserver une démo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;