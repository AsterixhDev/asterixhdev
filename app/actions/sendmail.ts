'use server'; // Marks this as a Server Action

import nodemailer from 'nodemailer';

type data = {
    name: string;
    email: string;
    workName: string;
    budget: string;
    description: string;
    to?:string
}


export const request = async (props: data) => {
    const { budget, description, email, name, workName } = props;
    return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Project Inquiry</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #072126; font-family: system-ui, -apple-system, sans-serif; color: #ffffff;">
      <div style="max-width: 600px; margin: 20px auto; padding: 0 20px;">
          <!-- Header with Gradient Border -->
          <div style="background: linear-gradient(45deg, #9e7dff, #488190); padding: 2px; border-radius: 16px; margin-bottom: 20px;">
              <div style="background-color: #072126; padding: 30px; border-radius: 15px; text-align: center;">
                  <h1 style="margin: 0; font-size: 28px; background: linear-gradient(45deg, #9e7dff, #488190); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: 1px;">
                      New Project Inquiry
                  </h1>
              </div>
          </div>
  
          <!-- Main Content -->
          <div style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border-radius: 16px; padding: 30px; margin-bottom: 20px;">
              <!-- Project Title & Budget -->
              <div style="margin-bottom: 30px; padding: 20px; background: rgba(158, 125, 255, 0.1); border-radius: 12px;">
                  <h2 style="color: #9e7dff; margin: 0 0 10px 0; font-size: 24px;">${workName}</h2>
                  <p style="color: #488190; margin: 0; font-size: 18px;">
                      Budget: <strong style="color: #9e7dff;">$${budget}</strong>
                  </p>
              </div>
  
              <!-- Project Description -->
              <div style="margin-bottom: 30px;">
                  <h3 style="color: #488190; margin: 0 0 15px 0; font-size: 18px; letter-spacing: 0.5px;">Project Description</h3>
                  <p style="color: #ffffff; margin: 0; line-height: 1.6; font-size: 16px;">${description}</p>
              </div>
  
              <!-- Contact Information -->
              <div style="background: rgba(72, 129, 144, 0.1); padding: 20px; border-radius: 12px;">
                  <h3 style="color: #488190; margin: 0 0 15px 0; font-size: 18px;">Contact Details</h3>
                  <p style="margin: 0; line-height: 1.5;">
                      <span style="color: #9e7dff;">Name:</span> 
                      <span style="color: #ffffff;">${name}</span>
                  </p>
                  <p style="margin: 5px 0 0 0; line-height: 1.5;">
                      <span style="color: #9e7dff;">Email:</span> 
                      <span style="color: #ffffff;">${email}</span>
                  </p>
              </div>
          </div>
  
          <!-- Footer -->
          <div style="text-align: center; color: rgba(255, 255, 255, 0.5); font-size: 12px;">
              <p style="margin: 0;">Automated notification • Reply directly to sender</p>
          </div>
      </div>
  </body>
  </html>
    `;
  };
  
  // Response template (auto-reply):
  export const responseTemplate = async (props: { name: string; workName: string }) => `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Your Project Inquiry</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #072126; font-family: system-ui, -apple-system, sans-serif; color: #ffffff;">
      <div style="max-width: 600px; margin: 20px auto; padding: 0 20px;">
          <!-- Animated Header -->
          <div style="background: linear-gradient(45deg, #9e7dff, #488190); padding: 2px; border-radius: 16px; margin-bottom: 20px;">
              <div style="background-color: #072126; padding: 30px; border-radius: 15px; text-align: center;">
                  <h1 style="margin: 0; font-size: 28px; background: linear-gradient(45deg, #9e7dff, #488190); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: 1px;">
                      Welcome, ${props.name}! 🎉
                  </h1>
              </div>
          </div>
  
          <!-- Main Content -->
          <div style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border-radius: 16px; padding: 30px; margin-bottom: 20px;">
              <!-- Project Acknowledgment -->
              <div style="margin-bottom: 30px;">
                  <p style="font-size: 18px; line-height: 1.6; margin: 0; color: #ffffff;">
                      Thank you for inquiring about <strong style="color: #9e7dff;">${props.workName}</strong>. I'm excited to explore this opportunity with you!
                  </p>
              </div>
  
              <!-- Next Steps -->
              <div style="background: rgba(158, 125, 255, 0.1); padding: 25px; border-radius: 12px; margin: 30px 0;">
                  <h2 style="color: #9e7dff; margin: 0 0 20px 0; font-size: 22px;">What Happens Next?</h2>
                  <div style="margin-left: 20px;">
                      <p style="margin: 0 0 15px 0; padding-left: 25px; position: relative; color: #ffffff;">
                          <span style="position: absolute; left: 0; color: #488190;">→</span>
                          Project review in progress
                      </p>
                      <p style="margin: 0 0 15px 0; padding-left: 25px; position: relative; color: #ffffff;">
                          <span style="position: absolute; left: 0; color: #488190;">→</span>
                          Detailed response within 24-48 hours
                      </p>
                      <p style="margin: 0; padding-left: 25px; position: relative; color: #ffffff;">
                          <span style="position: absolute; left: 0; color: #488190;">→</span>
                          Potential call scheduling for discussion
                      </p>
                  </div>
              </div>
  
              <!-- CTA -->
              <div style="text-align: center; margin-top: 35px;">
                  <a href="https://asterixh.dev" 
                     style="display: inline-block; padding: 15px 30px; background: linear-gradient(45deg, #9e7dff, #488190); 
                            color: #ffffff; text-decoration: none; border-radius: 25px; font-weight: 500; 
                            box-shadow: 0 4px 15px rgba(158, 125, 255, 0.3); transition: all 0.3s ease;">
                      Explore My Portfolio
                  </a>
              </div>
          </div>
  
          <!-- Footer -->
          <div style="text-align: center; color: rgba(255, 255, 255, 0.5); font-size: 12px;">
              <p style="margin: 0;">Automated response • I'll be in touch soon!</p>
          </div>
      </div>
  </body>
  </html>
  `;

export async function sendEmail(props: data) {
    const { email, name, workName, to } = props;
  
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  
    try {
      // Send notification to you
      await transporter.sendMail({
        from: email,
        to: to || process.env.GMAIL_USERNAME,
        subject: `New Project Inquiry: ${workName}`,
        html: await request(props),
        replyTo: email,
      });
  
      // Send confirmation to the sender
      await transporter.sendMail({
        from: process.env.GMAIL_USERNAME,
        to: email,
        subject: `Thank you for your inquiry about ${workName}`,
        html: await responseTemplate({ name, workName }),
      });
  
      return { success: true, message: 'Email sent successfully!' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Failed to send email.' };
    }
  }