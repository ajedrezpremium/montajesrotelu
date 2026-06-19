export async function GET() {
  const key = process.env.OPENROUTER_API_KEY;
  return Response.json({
    hasKey: !!key,
    keyPrefix: key ? key.substring(0, 10) + '...' : null,
    keyLength: key ? key.length : 0,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
  });
}
