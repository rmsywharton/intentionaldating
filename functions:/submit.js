/**
 * Intentional Dating App — Cloudflare Pages Function
 * functions/submit.js — v2
 * Routes to Launch Cities sheet or Other Cities sheet based on cityTier
 * Sends appropriate confirmation email per tier
 */

const GOOGLE_SCRIPT_LAUNCH_URL = process.env.GOOGLE_SCRIPT_URL;
const GOOGLE_SCRIPT_OTHER_URL  = process.env.GOOGLE_SCRIPT_OTHER_URL;
const RESEND_API_KEY            = process.env.RESEND_API_KEY;
const FROM_EMAIL                = "admissions@intentionaldating.app";
const FROM_NAME                 = "The Intentional Dating App";

const LAUNCH_CITIES = ['Phoenix', 'New York', 'Austin'];

function getCityTier(city) {
  if (LAUNCH_CITIES.includes(city)) return 'Launch';
  return city ? 'Coming Soon / Unlisted' : 'Unknown';
}

// ── EMAIL BUILDERS ───────────────────────────────────────────────────────────

function buildLaunchEmail(firstName, referralCode) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Your Founding Member Application</title></head>
<body style="margin:0;padding:0;background:#0D0D1A;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0D0D1A;padding:32px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#111122;border-radius:20px;border:1px solid rgba(13,148,136,0.25);overflow:hidden;">

<!-- HEADER -->
<tr><td align="center" style="padding:36px 40px 20px;border-bottom:1px solid rgba(13,148,136,0.15);">
  <p style="margin:0 0 8px;font-size:28px;color:#0D9488;">♥</p>
  <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;color:#0D9488;text-transform:uppercase;">The Intentional Dating App</p>
  <p style="margin:0 0 2px;font-size:11px;font-weight:700;letter-spacing:3px;color:#F59E0B;text-transform:uppercase;">Founding Member</p>
  <p style="margin:0;font-size:13px;color:#F59E0B;font-style:italic;">Cohort Alpha</p>
</td></tr>

<!-- HEADLINE -->
<tr><td align="center" style="padding:28px 40px 0;">
  <h1 style="margin:0 0 8px;font-size:28px;font-weight:700;color:#fff;">Application received.</h1>
  <h2 style="margin:0 0 24px;font-size:28px;font-weight:700;color:#0D9488;">Now under review.</h2>
  <p style="margin:0 0 12px;font-size:15px;color:#A0B4C8;line-height:1.7;text-align:left;">Hi ${firstName},</p>
  <p style="margin:0 0 12px;font-size:15px;color:#A0B4C8;line-height:1.7;text-align:left;">You just applied for one of 500 Cohort Alpha spots on The Intentional Dating App — built for people who are done with the cycle of casual, unclear, and going nowhere.</p>
  <p style="margin:0 0 20px;font-size:15px;color:#A0B4C8;line-height:1.7;text-align:left;">We built Intentional around the question no other app has the courage to ask:</p>
  <p style="margin:0 0 20px;font-size:17px;font-weight:700;font-style:italic;color:#0D9488;text-align:center;">How do you handle conflict — and how do you repair?</p>
  <p style="margin:0 0 24px;font-size:15px;color:#A0B4C8;line-height:1.7;text-align:left;">Compatibility gets you matched. How you handle conflict determines whether you last — and it shapes everything about how we match you.</p>
</td></tr>

<!-- DIVIDER -->
<tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid rgba(13,148,136,0.2);margin:4px 0 24px;"></td></tr>

<!-- SELECTION -->
<tr><td style="padding:0 40px 24px;">
  <h3 style="margin:0 0 12px;font-size:16px;font-weight:700;color:#fff;">How we select Cohort Alpha</h3>
  <p style="margin:0 0 10px;font-size:14px;color:#A0B4C8;line-height:1.7;">Cohort Alpha is not first come, first served.</p>
  <p style="margin:0;font-size:14px;color:#A0B4C8;line-height:1.7;">We are hand-selecting 500 founding members across Phoenix, New York, and Austin to create a balanced, high-quality community from day one. Selection is based on the depth and sincerity of your answers and your demonstrated commitment to what Intentional is actually for.</p>
</td></tr>

<!-- DIVIDER -->
<tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid rgba(13,148,136,0.2);margin:4px 0 24px;"></td></tr>

<!-- WHAT HAPPENS NEXT -->
<tr><td style="padding:0 40px 24px;">
  <h3 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#fff;">What happens next</h3>
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding:0 0 12px;"><span style="color:#0D9488;font-weight:700;font-size:14px;">01 &nbsp;</span><span style="font-size:14px;color:#A0B4C8;line-height:1.7;">Your application is reviewed alongside others in your city.</span></td></tr>
    <tr><td style="padding:0 0 12px;"><span style="color:#0D9488;font-weight:700;font-size:14px;">02 &nbsp;</span><span style="font-size:14px;color:#A0B4C8;line-height:1.7;">Upon launch, accepted applicants receive their invitation to complete face verification and build their full compatibility profile.</span></td></tr>
    <tr><td style="padding:0 0 12px;"><span style="color:#0D9488;font-weight:700;font-size:14px;">03 &nbsp;</span><span style="font-size:14px;color:#A0B4C8;line-height:1.7;">You complete your 35+ dimension profile — the most thoughtful questions you've ever answered about what you want.</span></td></tr>
    <tr><td style="padding:0 0 4px;"><span style="color:#0D9488;font-weight:700;font-size:14px;">04 &nbsp;</span><span style="font-size:14px;color:#A0B4C8;line-height:1.7;">Your Cohort Alpha pricing — $20/month, locked forever — activates at launch. No charge until then.</span></td></tr>
  </table>
</td></tr>

<!-- DIVIDER -->
<tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid rgba(13,148,136,0.2);margin:4px 0 24px;"></td></tr>

<!-- REFERRAL -->
<tr><td style="padding:0 40px 24px;">
  <h3 style="margin:0 0 12px;font-size:16px;font-weight:700;color:#fff;">Know someone who belongs here?</h3>
  <p style="margin:0 0 12px;font-size:14px;color:#A0B4C8;line-height:1.7;">Referring two people who complete verification moves your application to priority review. It doesn't guarantee acceptance — but it tells us something real about who you are.</p>
  <p style="margin:0 0 16px;font-size:14px;color:#A0B4C8;line-height:1.7;">You know who in your life is serious about love, who's been let down by the apps, who would show up with integrity. Referring them says as much about your character as anything else in your application.</p>
  <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:2px;color:#888;text-transform:uppercase;">Your personal invitation link</p>
  <p style="margin:0 0 20px;font-family:monospace;font-size:13px;color:#F59E0B;word-break:break-all;">intentionaldating.app/join?ref=${referralCode}</p>
</td></tr>

<!-- DIVIDER -->
<tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid rgba(13,148,136,0.2);margin:4px 0 24px;"></td></tr>

<!-- WHAT YOU LOCKED IN -->
<tr><td style="padding:0 40px 24px;">
  <h3 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#fff;">What you locked in as a Cohort Alpha Founding Member</h3>
  <p style="margin:0 0 8px;font-size:14px;color:#0D9488;">✓ &nbsp;$20/month — forever. This price never increases for you.</p>
  <p style="margin:0 0 8px;font-size:14px;color:#0D9488;">✓ &nbsp;All Intentional+ features included at launch.</p>
  <p style="margin:0 0 8px;font-size:14px;color:#0D9488;">✓ &nbsp;Gold Founding Member badge · Cohort Alpha — permanent on your profile.</p>
  <p style="margin:0 0 8px;font-size:14px;color:#0D9488;">✓ &nbsp;Priority placement in the matching pool at launch.</p>
  <p style="margin:0 0 8px;font-size:14px;color:#0D9488;">✓ &nbsp;Your experience directly shapes what we build next.</p>
  <p style="margin:0;font-size:14px;color:#0D9488;">✓ &nbsp;No charge until launch. This is a promise, not a purchase.</p>
</td></tr>

<!-- DIVIDER -->
<tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid rgba(13,148,136,0.2);margin:4px 0 24px;"></td></tr>

<!-- WHY IT MATTERS -->
<tr><td style="padding:0 40px 28px;">
  <h3 style="margin:0 0 12px;font-size:16px;font-weight:700;color:#fff;">Why this membership matters beyond you</h3>
  <p style="margin:0 0 12px;font-size:14px;color:#A0B4C8;line-height:1.7;">Your membership funds an app built on relationship science — one that uses technology to help people connect more honestly, with less anxiety, and with better odds of finding something real.</p>
  <p style="margin:0 0 24px;font-size:14px;color:#A0B4C8;line-height:1.7;">You're not just paying for yourself. You're helping build something that makes dating — and our culture — a little more intentional. That's worth something.</p>
  <p style="margin:0 0 6px;font-size:14px;color:#A0B4C8;">We'll be in touch soon.</p>
  <p style="margin:0 0 6px;font-size:14px;font-style:italic;color:#A0B4C8;">With intention,</p>
  <p style="margin:0;font-size:14px;font-weight:700;color:#fff;">The Intentional Team</p>
</td></tr>

<!-- FOOTER -->
<tr><td style="padding:20px 40px;background:#0D0D1A;border-top:1px solid rgba(13,148,136,0.12);">
  <p style="margin:0 0 6px;text-align:center;font-size:13px;font-weight:700;color:#fff;">INTENTIONAL.</p>
  <p style="margin:0 0 6px;text-align:center;font-size:12px;font-style:italic;color:#666;">The most transformative dating experience you'll ever have.</p>
  <p style="margin:0 0 6px;text-align:center;font-size:12px;"><a href="https://intentionaldating.app" style="color:#0D9488;text-decoration:none;">intentionaldating.app</a> &nbsp;·&nbsp; <a href="mailto:admissions@intentionaldating.app" style="color:#0D9488;text-decoration:none;">admissions@intentionaldating.app</a></p>
  <p style="margin:0 0 6px;text-align:center;font-size:11px;color:#444;">© 2026 Firesign Holdings LLC. All rights reserved. Intentional™ is a trademark of Firesign Holdings LLC.</p>
  <p style="margin:0;text-align:center;font-size:11px;color:#444;font-style:italic;">This email was intended solely for the addressee. If you did not apply, please disregard. <a href="{{unsubscribe_url}}" style="color:#444;">Unsubscribe</a></p>
</td></tr>

</table>
</td></tr>
</table>
</body></html>`;
}

function buildOtherCityEmail(firstName, city) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>We're coming to your city</title></head>
<body style="margin:0;padding:0;background:#0D0D1A;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0D0D1A;padding:32px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#111122;border-radius:20px;border:1px solid rgba(13,148,136,0.25);overflow:hidden;">

<tr><td align="center" style="padding:36px 40px 20px;border-bottom:1px solid rgba(13,148,136,0.15);">
  <p style="margin:0 0 8px;font-size:28px;color:#0D9488;">♥</p>
  <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;color:#0D9488;text-transform:uppercase;">The Intentional Dating App</p>
  <p style="margin:0;font-size:13px;color:#A0B4C8;font-style:italic;">City Founding List</p>
</td></tr>

<tr><td align="center" style="padding:28px 40px 0;">
  <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#fff;">We're not in ${city} yet.</h1>
  <h2 style="margin:0 0 24px;font-size:26px;font-weight:700;color:#0D9488;">You'll be first when we are.</h2>
  <p style="margin:0 0 12px;font-size:15px;color:#A0B4C8;line-height:1.7;text-align:left;">Hi ${firstName},</p>
  <p style="margin:0 0 12px;font-size:15px;color:#A0B4C8;line-height:1.7;text-align:left;">We're launching in Phoenix, New York, and Austin first — but the fact that you're here tells us exactly where we should be going next.</p>
  <p style="margin:0 0 24px;font-size:15px;color:#A0B4C8;line-height:1.7;text-align:left;">You've been added to the founding list for ${city}. When we expand, you'll be among the very first to receive an invitation — with founding-era access and pricing.</p>
</td></tr>

<tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid rgba(13,148,136,0.2);margin:4px 0 24px;"></td></tr>

<tr><td style="padding:0 40px 24px;">
  <h3 style="margin:0 0 12px;font-size:16px;font-weight:700;color:#fff;">What Intentional is building</h3>
  <p style="margin:0 0 12px;font-size:14px;color:#A0B4C8;line-height:1.7;">A dating app built on verified identity, 35+ compatibility dimensions, and the question no one else asks — how do you handle conflict, and how do you repair?</p>
  <p style="margin:0 0 24px;font-size:14px;color:#A0B4C8;line-height:1.7;">Not for casual. Not for hookups. For people who are serious about finding the right long-term partner — and willing to put in the depth to get there.</p>
  <p style="margin:0 0 6px;font-size:14px;color:#A0B4C8;">We'll be in touch when ${city} is ready.</p>
  <p style="margin:0 0 6px;font-size:14px;font-style:italic;color:#A0B4C8;">With intention,</p>
  <p style="margin:0;font-size:14px;font-weight:700;color:#fff;">The Intentional Team</p>
</td></tr>

<tr><td style="padding:20px 40px;background:#0D0D1A;border-top:1px solid rgba(13,148,136,0.12);">
  <p style="margin:0 0 6px;text-align:center;font-size:13px;font-weight:700;color:#fff;">INTENTIONAL.</p>
  <p style="margin:0 0 6px;text-align:center;font-size:12px;"><a href="https://intentionaldating.app" style="color:#0D9488;text-decoration:none;">intentionaldating.app</a> &nbsp;·&nbsp; <a href="mailto:admissions@intentionaldating.app" style="color:#0D9488;text-decoration:none;">admissions@intentionaldating.app</a></p>
  <p style="margin:0 0 6px;text-align:center;font-size:11px;color:#444;">© 2026 Firesign Holdings LLC. All rights reserved. Intentional™ is a trademark of Firesign Holdings LLC.</p>
  <p style="margin:0;text-align:center;font-size:11px;color:#444;font-style:italic;">This email was intended solely for the addressee. If you did not apply, please disregard. <a href="{{unsubscribe_url}}" style="color:#444;">Unsubscribe</a></p>
</td></tr>

</table>
</td></tr>
</table>
</body></html>`;
}

// ── MAIN HANDLER ─────────────────────────────────────────────────────────────
export async function onRequestPost(context) {
  const { request, env } = context;
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  try {
    const body = await request.json();
    const { name, email, phone, city, optSms, optNewsletter, q1, q2, q3, q4 } = body;

    if (!email) return new Response(JSON.stringify({ success: false, error: "Email required." }), { status: 400, headers });

    const referralCode = (name.toLowerCase().replace(/\s+/g, "") + Date.now().toString(36)).slice(0, 12);
    const firstName = name ? name.split(" ")[0] : "there";
    const timestamp = new Date().toISOString();
    const cityTier = getCityTier(city);
    const isLaunchCity = cityTier === 'Launch';

    const sheetUrl = isLaunchCity
      ? env.GOOGLE_SCRIPT_URL
      : env.GOOGLE_SCRIPT_OTHER_URL;

    const emailHtml = isLaunchCity
      ? buildLaunchEmail(firstName, referralCode)
      : buildOtherCityEmail(firstName, city || 'your city');

    const emailSubject = isLaunchCity
      ? "Your Cohort Alpha application is under review"
      : `We're coming to ${city || 'your city'} — you'll be first`;

    const [sheetResult, emailResult] = await Promise.allSettled([
      fetch(sheetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, city, cityTier, optSms, optNewsletter, q1, q2, q3, q4, referralCode, timestamp, source: "waitlist-v7" }),
      }),
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: `${FROM_NAME} <${FROM_EMAIL}>`, to: [email], subject: emailSubject, html: emailHtml }),
      }),
    ]);

    console.log("Sheet:", sheetResult.status, isLaunchCity ? "launch" : "other");
    console.log("Email:", emailResult.status);

    return new Response(JSON.stringify({ success: true, referralCode, cityTier }), { status: 200, headers });

  } catch (err) {
    console.error("Handler error:", err);
    return new Response(JSON.stringify({ success: false, error: "Something went wrong." }), { status: 500, headers });
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  }});
}
