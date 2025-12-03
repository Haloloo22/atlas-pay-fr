import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-12">
            Politique de Confidentialité
          </h1>

          <div className="prose prose-lg max-w-none space-y-12">
            <section>
              <p className="text-lg text-muted-foreground">
                Chez FleetPay, nous accordons une importance primordiale à la protection de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">1. Responsable du traitement</h2>
              <div className="bg-card rounded-2xl p-8 border-2 border-border">
                <p className="text-muted-foreground">
                  Le responsable du traitement des données est :
                </p>
                <ul className="space-y-2 text-muted-foreground mt-4">
                  <li><strong className="text-foreground">FleetPay SARL</strong></li>
                  <li>123 Boulevard Hassan II, Casablanca 20250, Maroc</li>
                  <li>Email : privacy@fleetpay.ma</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Données collectées</h2>
              <p className="text-muted-foreground mb-4">
                Nous collectons les catégories de données suivantes :
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card rounded-2xl p-6 border-2 border-border">
                  <h3 className="font-bold mb-3">Données d'identification</h3>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>• Nom et prénom</li>
                    <li>• Adresse email</li>
                    <li>• Numéro de téléphone</li>
                    <li>• Nom de l'entreprise</li>
                  </ul>
                </div>
                <div className="bg-card rounded-2xl p-6 border-2 border-border">
                  <h3 className="font-bold mb-3">Données d'utilisation</h3>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>• Transactions de carburant</li>
                    <li>• Données de connexion</li>
                    <li>• Préférences utilisateur</li>
                    <li>• Historique d'activité</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Finalités du traitement</h2>
              <p className="text-muted-foreground">
                Vos données sont utilisées pour :
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-6 mt-4">
                <li>Fournir et améliorer nos services de gestion de flotte</li>
                <li>Traiter vos demandes de contact et de démonstration</li>
                <li>Gérer votre compte utilisateur</li>
                <li>Envoyer des communications relatives à nos services</li>
                <li>Assurer la sécurité de la plateforme</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Base légale du traitement</h2>
              <p className="text-muted-foreground">
                Le traitement de vos données repose sur :
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-6 mt-4">
                <li><strong className="text-foreground">L'exécution du contrat :</strong> pour fournir nos services</li>
                <li><strong className="text-foreground">Le consentement :</strong> pour les communications marketing</li>
                <li><strong className="text-foreground">L'intérêt légitime :</strong> pour améliorer nos services</li>
                <li><strong className="text-foreground">L'obligation légale :</strong> pour respecter la réglementation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Durée de conservation</h2>
              <p className="text-muted-foreground">
                Nous conservons vos données pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées :
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-6 mt-4">
                <li>Données de compte : durée de la relation contractuelle + 5 ans</li>
                <li>Données de transaction : 10 ans (obligations comptables)</li>
                <li>Données de prospection : 3 ans après le dernier contact</li>
                <li>Cookies : 13 mois maximum</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Partage des données</h2>
              <p className="text-muted-foreground">
                Vos données peuvent être partagées avec :
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-6 mt-4">
                <li>Nos prestataires techniques (hébergement, maintenance)</li>
                <li>Les stations-service partenaires (pour les transactions)</li>
                <li>Les autorités compétentes (sur demande légale)</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Nous ne vendons jamais vos données personnelles à des tiers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Sécurité des données</h2>
              <p className="text-muted-foreground">
                Nous mettons en œuvre des mesures de sécurité appropriées :
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-6 mt-4">
                <li>Chiffrement des données en transit et au repos</li>
                <li>Authentification sécurisée</li>
                <li>Accès restreint aux données</li>
                <li>Audits de sécurité réguliers</li>
                <li>Formation du personnel</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Vos droits</h2>
              <div className="bg-primary/5 rounded-2xl p-8 border-2 border-primary/10">
                <p className="text-muted-foreground mb-4">
                  Conformément à la loi n° 09-08, vous disposez des droits suivants :
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✓ <strong className="text-foreground">Droit d'accès :</strong> obtenir une copie de vos données</li>
                  <li>✓ <strong className="text-foreground">Droit de rectification :</strong> corriger vos données</li>
                  <li>✓ <strong className="text-foreground">Droit de suppression :</strong> demander l'effacement de vos données</li>
                  <li>✓ <strong className="text-foreground">Droit d'opposition :</strong> vous opposer au traitement</li>
                  <li>✓ <strong className="text-foreground">Droit à la portabilité :</strong> récupérer vos données</li>
                </ul>
                <p className="text-muted-foreground mt-6">
                  Pour exercer ces droits, contactez-nous à : <a href="mailto:privacy@fleetpay.ma" className="text-primary hover:underline">privacy@fleetpay.ma</a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Cookies</h2>
              <p className="text-muted-foreground">
                Notre site utilise des cookies pour :
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-6 mt-4">
                <li><strong className="text-foreground">Cookies essentiels :</strong> fonctionnement du site</li>
                <li><strong className="text-foreground">Cookies analytiques :</strong> mesure d'audience</li>
                <li><strong className="text-foreground">Cookies de préférences :</strong> mémorisation de vos choix</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Modifications</h2>
              <p className="text-muted-foreground">
                Cette politique peut être mise à jour. Nous vous informerons de tout changement significatif par email ou notification sur la plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Contact</h2>
              <p className="text-muted-foreground">
                Pour toute question relative à cette politique ou à vos données personnelles :
              </p>
              <div className="bg-card rounded-2xl p-6 border-2 border-border mt-4">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Email :</strong> privacy@fleetpay.ma<br />
                  <strong className="text-foreground">Courrier :</strong> FleetPay SARL - DPO, 123 Boulevard Hassan II, Casablanca 20250, Maroc
                </p>
              </div>
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

export default Privacy;