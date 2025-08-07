import { Resend } from 'resend'

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY)

export interface ContactFormData {
  name: string
  email: string
  company?: string
  service?: string
  message: string
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const { data: result, error } = await resend.emails.send({
      from: 'Product Box Contact <onboarding@resend.dev>',
      to: [import.meta.env.VITE_CONTACT_EMAIL || 'hello@getproductbox.com'],
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111827;">New Contact Form Submission</h2>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #111827; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
            ${data.service ? `<p><strong>Service Interest:</strong> ${data.service}</p>` : ''}
          </div>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
            <h3 style="color: #111827; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This email was sent from the Product Box contact form at ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}` : ''}
${data.service ? `Service Interest: ${data.service}` : ''}

Message:
${data.message}

---
This email was sent from the Product Box contact form at ${new Date().toLocaleString()}
      `
    })

    if (error) {
      console.error('Failed to send email:', error)
      return { success: false, error }
    }

    return { success: true, data: result }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}