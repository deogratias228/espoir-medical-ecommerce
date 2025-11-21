"use client";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { sendMessage } from "@/lib/messages"; 

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"" | "success" | "error">("");

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation minimale côté client
    if (!formData.name || !formData.phone || !formData.message) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const response = await sendMessage(formData);
      if (response.success) {
        setSubmitStatus("success");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-10 text-gray-700">
      <section className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-green-900 mb-3">
          Contactez-nous
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Une question sur un produit ? Besoin d’un devis ou d’un conseil ?
          Notre équipe est à votre écoute.
        </p>
      </section>

      {/* Coordonnées + Formulaire */}
      <section className="grid md:grid-cols-2 gap-10">
        {/* Coordonnées */}
        <div className="space-y-6">
          <div className="flex items-start space-x-3">
            <Phone className="text-green-700 mt-1" />
            <div>
              <h3 className="font-semibold text-green-800">Téléphone</h3>
              <p>+228 91 79 82 92</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Mail className="text-green-700 mt-1" />
            <div>
              <h3 className="font-semibold text-green-800">Email</h3>
              <p>contact@espoir-medical.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MapPin className="text-green-700 mt-1" />
            <div>
              <h3 className="font-semibold text-green-800">Adresse</h3>
              <p>Lomé, Togo – Quartier Adidogomé</p>
            </div>
          </div>

          <Link
            href="https://wa.me/91798292"
            target="_blank"
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-medium transition"
          >
            <MessageCircle size={18} className="mr-2" />
            Discuter sur WhatsApp
          </Link>
        </div>

        {/* Formulaire de contact */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-green-50 p-6 rounded-2xl shadow-sm"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Nom complet <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
              placeholder="Votre nom"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone-input"
              className="block text-sm font-medium text-gray-700"
            >
              Téléphone <span className="text-red-500">*</span>
            </label>
            <PhoneInput
              country={"tg"}
              value={formData.phone}
              onChange={handlePhoneChange}
              inputProps={{
                name: "phone",
                id: "phone-input",
                required: true,
              }}
              containerStyle={{ width: "100%" }}
              inputStyle={{
                width: "100%",
                padding: "10px",
                paddingLeft: "48px",
                fontSize: "15px",
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Adresse e-mail
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600 outline-none"
              placeholder="exemple@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-28 focus:ring-2 focus:ring-green-600 outline-none"
              placeholder="Votre message..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white py-2 rounded-lg font-semibold transition ${
              isSubmitting
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-800"
            }`}
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
          </button>

          {submitStatus === "success" && (
            <p className="text-green-700 text-sm mt-2">
              ✅ Message envoyé avec succès !
            </p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-600 text-sm mt-2">
              ❌ Une erreur est survenue. Vérifiez vos champs et réessayez.
            </p>
          )}
        </form>
      </section>

      {/* Carte */}
      <section className="mt-12">
        <iframe
          className="w-full h-64 rounded-2xl shadow-sm"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.874182630839!2d1.2092691!3d6.1475955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10215fa1f21d345b%3A0x7e0d3c4157fca6ca!2sESPOIR%20M%C3%89DICAL!5e0!3m2!1sfr!2stg!4v1759609292960!5m2!1sfr!2stg"
          loading="lazy"
        ></iframe>
      </section>
    </main>
  );
}
