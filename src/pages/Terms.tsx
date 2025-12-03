import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-12">
            Conditions Générales d'Utilisation
          </h1>

          <div className="prose prose-lg max-w-none space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Objet</h2>
              <p className="text-muted-foreground">
                Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions d'utilisation des services proposés par FleetPay, ainsi que de définir les droits et obligations des parties dans ce cadre.
              </p>
              <p className="text-muted-foreground mt-4">
                FleetPay est une plateforme SaaS de gestion des dépenses de flotte et de cartes carburant destinée aux entreprises.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Acceptation des conditions</h2>
              <p className="text-muted-foreground">
                L'utilisation de la plateforme FleetPay implique l'acceptation pleine et entière des présentes CGU. En accédant à la plateforme, l'utilisateur reconnaît avoir pris connaissance des présentes conditions et les accepter sans réserve.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Description des services</h2>
              <div className="bg-card rounded-2xl p-8 border-2 border-border">
                <p className="text-muted-foreground mb-4">
                  FleetPay propose les services suivants :
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  <li>Gestion centralisée des cartes carburant</li>
                  <li>Suivi en temps réel des transactions</li>
                  <li>Définition de limites de dépenses par conducteur</li>
                  <li>Alertes et détection de fraude</li>
                  <li>Tableau de bord analytique</li>
                  <li>Export des données comptables</li>
                  <li>Intégration télématique (selon formule)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Inscription et compte utilisateur</h2>
              <p className="text-muted-foreground">
                L'accès aux services FleetPay nécessite la création d'un compte. L'utilisateur s'engage à fournir des informations exactes et à les maintenir à jour. L'utilisateur est responsable de la confidentialité de ses identifiants de connexion.
              </p>
              <p className="text-muted-foreground mt-4">
                Chaque compte est strictement personnel et ne peut être partagé ou cédé à un tiers sans autorisation préalable de FleetPay.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Obligations de l'utilisateur</h2>
              <p className="text-muted-foreground">
                L'utilisateur s'engage à :
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-6 mt-4">
                <li>Utiliser la plateforme conformément à sa destination</li>
                <li>Ne pas tenter de contourner les mesures de sécurité</li>
                <li>Respecter les droits de propriété intellectuelle</li>
                <li>Ne pas utiliser la plateforme à des fins illicites</li>
                <li>Signaler toute anomalie ou faille de sécurité</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Tarification et paiement</h2>
              <p className="text-muted-foreground">
                Les tarifs des services FleetPay sont définis selon les formules d'abonnement disponibles. Les prix sont exprimés en Dirhams Marocains (MAD) et sont révisables à tout moment avec un préavis de 30 jours.
              </p>
              <p className="text-muted-foreground mt-4">
                Le paiement s'effectue par virement bancaire ou prélèvement automatique selon les modalités convenues lors de la souscription.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Durée et résiliation</h2>
              <p className="text-muted-foreground">
                L'abonnement à FleetPay est conclu pour une durée déterminée selon la formule choisie. L'abonnement est renouvelable par tacite reconduction sauf résiliation notifiée dans les délais prévus au contrat.
              </p>
              <p className="text-muted-foreground mt-4">
                FleetPay se réserve le droit de suspendre ou résilier l'accès en cas de non-respect des présentes CGU.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Propriété intellectuelle</h2>
              <p className="text-muted-foreground">
                L'ensemble des éléments composant la plateforme FleetPay (logiciel, base de données, interfaces, contenus) sont protégés par le droit de la propriété intellectuelle et restent la propriété exclusive de FleetPay.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Protection des données</h2>
              <p className="text-muted-foreground">
                FleetPay s'engage à protéger les données personnelles de ses utilisateurs conformément à la loi n° 09-08. Pour plus d'informations, consultez notre <a href="/privacy" className="text-primary hover:underline">Politique de confidentialité</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Responsabilité</h2>
              <p className="text-muted-foreground">
                FleetPay s'engage à mettre en œuvre tous les moyens nécessaires pour assurer la continuité et la qualité de ses services. Toutefois, FleetPay ne saurait être tenu responsable des dommages indirects résultant de l'utilisation de la plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Modification des CGU</h2>
              <p className="text-muted-foreground">
                FleetPay se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés de toute modification par email ou notification sur la plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Droit applicable et juridiction</h2>
              <p className="text-muted-foreground">
                Les présentes CGU sont soumises au droit marocain. Tout litige relatif à leur interprétation ou exécution relève de la compétence exclusive des tribunaux de Casablanca.
              </p>
            </section>

            <section className="bg-secondary/30 rounded-2xl p-8">
              <p className="text-sm text-muted-foreground">
                <strong>Dernière mise à jour :</strong> Décembre 2025
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Pour toute question concernant ces conditions, contactez-nous à : legal@fleetpay.ma
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;