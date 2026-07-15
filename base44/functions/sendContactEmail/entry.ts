import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save inquiry to database
    await base44.asServiceRole.entities.ContactInquiry.create({
      name,
      email,
      subject,
      message,
      status: 'new',
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
