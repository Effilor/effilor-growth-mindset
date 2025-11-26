export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, answers, timestamp } = req.body;

  // Validate required fields
  if (!name || !email || !answers) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Prepare the data
  const assessmentData = {
    submittedAt: timestamp || new Date().toISOString(),
    name: name,
    email: email,
    company: company || 'Not provided',
    answers: answers
  };

  // Create email body
  const emailBody = `
New Growth Mindset Assessment Submission

Submitted: ${assessmentData.submittedAt}
Name: ${assessmentData.name}
Email: ${assessmentData.email}
Company: ${assessmentData.company}

ASSESSMENT DATA (JSON format - copy everything below):
${JSON.stringify(assessmentData, null, 2)}

---
Copy the JSON above and provide it to Claude to generate the personalized PDF report.
Then email the PDF to: ${assessmentData.email}
  `;

  // Send email using SendGrid
  try {
    const sgResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: 'resources@effilor.com' }],
          subject: `New Assessment Submission - ${name}`
        }],
        from: {
          email: 'shankar.ramamurthy@effilor.com',
          name: 'Effilor Growth Assessment'
        },
        content: [{
          type: 'text/plain',
          value: emailBody
        }]
      })
    });

    if (!sgResponse.ok) {
      const errorText = await sgResponse.text();
      console.error('SendGrid error:', errorText);
      return res.status(500).json({ error: 'Failed to send notification' });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
