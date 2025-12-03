import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Legal = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-12">
            Mentions légales
          </h1>

          <div className="prose prose-lg max-w-none space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Informations sur l'éditeur</h2>
              <div className="bg-card rounded-2xl p-8 border-2 border-border">
                <p className="text-muted-foreground mb-4">
                  Le site FleetPay est édité par :
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Raison sociale :</strong> FleetPay SARL</li>
                  <li><strong className="text-foreground">Siège social :</strong> 123 Boulevard Hassan II, Casablanca 20250, Maroc</li>
                  <li><strong className="text-foreground">Capital social :</strong> 100 000 MAD</li>
                  <li><strong className="text-foreground">RC :</strong> 123456 - Casablanca</li>
                  <li><strong className="text-foreground">ICE :</strong> 001234567000089</li>
                  <li><strong className="text-foreground">Email :</strong> contact@fleetpay.ma</li>
                  <li><strong className="text-foreground">Téléphone :</strong> +212 5 22 12 34 56</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Directeur de la publication</h2>
              <p className="text-muted-foreground">
                Le directeur de la publication est le représentant légal de FleetPay SARL.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Hébergement</h2>
              <div className="bg-card rounded-2xl p-8 border-2 border-border">
                <p className="text-muted-foreground">
                  Ce site est hébergé par :
                </p>
                <ul className="space-y-2 text-muted-foreground mt-4">
                  <li><strong className="text-foreground">Hébergeur :</strong> Lovable / Supabase</li>
                  <li><strong className="text-foreground">Adresse :</strong> Services cloud internationaux</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Propriété intellectuelle</h2>
              <p className="text-muted-foreground">
                L'ensemble du contenu du site FleetPay (textes, images, logos, graphismes, icônes, sons, logiciels, etc.) est la propriété exclusive de FleetPay SARL ou de ses partenaires et est protégé par les lois marocaines et internationales relatives à la propriété intellectuelle.
              </p>
              <p className="text-muted-foreground mt-4">
                Toute reproduction, représentation, modification, publication, transmission, dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit est interdite sans autorisation écrite préalable de FleetPay SARL.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Protection des données personnelles</h2>
              <p className="text-muted-foreground">
                Conformément à la loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant.
              </p>
              <p className="text-muted-foreground mt-4">
                Pour exercer ce droit, vous pouvez nous contacter à l'adresse : privacy@fleetpay.ma
              </p>
              <p className="text-muted-foreground mt-4">
                Pour plus d'informations, consultez notre <a href="/privacy" className="text-primary hover:underline">Politique de confidentialité</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Cookies</h2>
              <p className="text-muted-foreground">
                Le site FleetPay utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. En continuant à naviguer sur ce site, vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Limitation de responsabilité</h2>
              <p className="text-muted-foreground">
                FleetPay SARL s'efforce d'assurer au mieux de ses possibilités l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, FleetPay SARL ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Droit applicable</h2>
              <p className="text-muted-foreground">
                Les présentes mentions légales sont régies par le droit marocain. En cas de litige, les tribunaux de Casablanca seront seuls compétents.
              </p>
            </section>

            <section className="bg-secondary/30 rounded-2xl p-8">
              <p className="text-sm text-muted-foreground">
                <strong>Dernière mise à jour :</strong> Décembre 2025
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;