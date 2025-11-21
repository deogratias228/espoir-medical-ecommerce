
export default function AboutPage() {
    return (
        <main className="container mx-auto px-4 py-10 text-gray-700">
            {/* Titre principal */}
            <section className="text-center mb-10">
                <h1 className="text-3xl font-extrabold text-blue-900 mb-3">
                    À propos d’Espoir Médical
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Nous mettons la technologie et la qualité au service de la santé et du sport.
                </p>
            </section>

            {/* Bloc mission et histoire */}
            <section className="grid md:grid-cols-2 gap-10 items-center mb-16">
                <div>
                    <h2 className="text-2xl font-semibold text-blue-800 mb-3">Notre Mission</h2>
                    <p className="leading-relaxed text-justify">
                        Espoir Médical est une entreprise spécialisée dans la vente de matériel médical,
                        paramédical et sportif. Depuis notre création, nous avons à cœur de rendre les
                        équipements de qualité accessibles aux professionnels comme aux particuliers.&nbsp;
                    </p>
                    <p className="mt-4 leading-relaxed text-justify">
                        Nous travaillons avec des marques reconnues pour leur fiabilité afin de garantir
                        la sécurité, la durabilité et la performance de chaque produit.
                    </p>
                </div>
                <div className="flex justify-center">
                    <img
                        src="/images/about/espoir-medical.jpeg"
                        alt="Image de la boutique Espoir Medical"
                        className="rounded-2xl shadow-lg w-full max-w-md"
                    />
                </div>
            </section>

            {/* Valeurs */}
            <section className="bg-blue-50 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-semibold text-blue-800 mb-5">Nos Valeurs</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-semibold text-lg text-blue-700 mb-2">Qualité</h3>
                        <p>Nous sélectionnons uniquement des produits testés et certifiés.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-blue-700 mb-2">Fiabilité</h3>
                        <p>Nos clients bénéficient d’un suivi professionnel et d’une écoute attentive.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-blue-700 mb-2">Accessibilité</h3>
                        <p>Nous offrons des solutions adaptées à tous les budgets.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
