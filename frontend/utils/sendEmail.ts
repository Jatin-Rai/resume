import emailjs from "@emailjs/browser";

interface TemplateParams {
  [key: string]: string;
}

const sendEmail = async (templateParams: TemplateParams): Promise<void> => {
  try {
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );
    console.log("SUCCESS!!", response.status, response.text);
  } catch (error: any) {
    console.log("FAILED!!", error);
  }
};

export default sendEmail;
