// ============================================
// Web3Forms Integration Helper
// Access Key: d80cabc8-d788-4767-b73b-0e07dba5810b
// ============================================

export const WEB3FORMS_ACCESS_KEY = "d80cabc8-d788-4767-b73b-0e07dba5810b";

export interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  organization?: string;
  serviceInterest?: string;
  message?: string;
  source?: string;
}

/**
 * Submits enquiry data directly to Web3Forms API to trigger instant email notifications
 */
export async function submitToWeb3Forms(payload: EnquiryPayload): Promise<boolean> {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Hospital Lead: ${payload.name} (${payload.organization || "Direct Enquiry"}) — Ocean MGPS`,
        from_name: "Ocean MGPS Website",
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        organization: payload.organization || "N/A",
        service_interest: payload.serviceInterest || "General Enquiry",
        message: payload.message || "No detailed message specified.",
        page_source: payload.source || "Contact Form",
      }),
    });

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error("Web3Forms submission failed:", error);
    return false;
  }
}
