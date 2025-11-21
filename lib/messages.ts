import axios from "axios";

export async function sendMessage(data: {
  name: string;
  phone: string;
  email?: string;
  message: string;
}) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/messages`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Si tout va bien
    return {
      success: true,
      data: res.data,
    };
  } catch (error: any) {
    console.error("Erreur lors de l'envoi du message:", error);

    // Si Laravel renvoie une erreur de validation ou autre
    const message =
      error.response?.data?.message ||
      "Une erreur est survenue lors de l'envoi du message.";

    return {
      success: false,
      message,
    };
  }
}
