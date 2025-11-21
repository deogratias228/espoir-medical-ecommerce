import Link from 'next/link';
import { Mail, Phone, MapPin, IdCard, CreditCardIcon, CreditCard } from 'lucide-react';

const Footer = () => {
  // Les liens sont structurés pour faciliter la gestion et l'affichage
  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "Catalogue Complet", href: "/products" },
        { name: "Produits Populaires", href: "/#top-products" },
        { name: "À Propos de Nous", href: "/about" },
      ]
    },
  ];

  return (
    <footer className="bg-green-950 text-white">
      <div className="container mx-auto p-4  md:p-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">

          {/* Section 1: Contact et Présentation */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold mb">Espoir Médical</h3>
            <p className="text-sm leading-relaxed text-justify">
              Fournisseur de matériels médicaux, chirurgicaux, orthopédiques, sportifs et de kinésithérapie au Togo.
              Nous proposons des produits fiables et durables pour les professionnels de santé comme pour les particuliers.
            </p>
          </div>

          {/* Sections de Liens Rapides */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-green-400">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition duration-150 wrap-anywhere">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="space-y-2 text-sm text-gray-300 col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-green-400">Contact</h3>
            <p className="flex items-center"><MapPin size={16} className="mr-2 text-green-400" /> Lomé, Togo</p>
            <p className="flex items-center"><Phone size={16} className="mr-2 text-green-400" /> +228 91 79 82 92 (WhatsApp)</p>
            <p className="flex items-center"><Mail size={16} className="mr-2 text-green-400" /> contact@espoir-medical.com</p>
          </div>
        </div>
      </div>

      {/* Droit d'auteur */}
      <div className="border-t border-gray-700 py-4 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Espoir Médical. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;