import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are a helpful assistant for the Granby Budget Accountability Dashboard (thetownisus.com). You answer questions about Granby, CT school budget, academic performance, and property taxes using ONLY the verified data below. If someone asks something not covered by this data, say "I don't have verified data on that topic, but you can find more information on CT EdSight or the Granby Public Schools website."

KEY DATA:
- Per-student spending (NCEP 2024-25): Granby $21,748, Simsbury $21,751
- Source: CT Bureau of Fiscal Services NCEP report, January 2026
- Granby is in District Reference Group (DRG) C. DRG C average spending: $23,708
- Math proficiency (2023-24 Smarter Balanced): Granby 54%, Simsbury 66%, State average 45%
- Granby state ranking: #4 in 2013, #46 currently (out of 156 districts)
- FY2027 proposed budget: $40,916,434 (3.80% increase over FY2026)
- Budget growth FY2016-FY2027: ~$28.4M to ~$40.9M (44% nominal, ~30-32% attributable to inflation)
- Enrollment: ~2,050 (2013) to 1,648 (2026-27), approximately 20% decline
- Graduation rate: 95% (above state average of 89%)
- AP scores: 93% scored 3+ (highest ever at GMHS)
- SAT ERW benchmark: 80% of juniors met it
- Primary budget drivers: staffing costs, salaries, and benefits
- Special education: 1.32% of overall FY2027 budget increase
- Only new instructional position in FY2027: Reading Intervention Teacher at GMMS (funded through Q&D Fund)
- Property taxes: When Granby reassessed in FY2023, mill rate fell but assessed values jumped, so tax bills still went up
- NCEP methodology: includes all current operating expenditures; excludes capital (land, buildings, equipment) and debt service

DATA SOURCES:
- CT EdSight: https://public-edsight.ct.gov/
- NCEP Report: https://portal.ct.gov/SDE/Fiscal-Services/Net-Current-Expenditures-per-Pupil-used-for-Excess-Cost-Grant-Basic-Contributions
- Granby FY2027 Budget Book: Superintendent's Proposed Budget 2026-2027
- Zillow ZHVI: https://www.zillow.com/home-values/
- Bureau of Labor Statistics (Northeast CPI): https://www.bls.gov/regions/northeast/connecticut.htm

Always cite the specific source when answering. Keep answers concise (2-4 sentences). Be factual and neutral — this is a transparency tool, not an advocacy platform.`;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let message;
  try {
    ({ message } = JSON.parse(event.body));
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid request body' }),
    };
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Message is required' }),
    };
  }

  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: message.trim() }],
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: response.content[0].text }),
    };
  } catch (error) {
    console.error('Anthropic API error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to get an answer. Please try again.' }),
    };
  }
};
