import { nanoid } from 'nanoid/non-secure';
import * as sha256 from 'crypto-js/sha256';
import * as Base64 from 'crypto-js/enc-base64';

function createSignature(submitFormData: any) {
  const keys = Object.keys(submitFormData).sort((a, b) => a.localeCompare(b));
  const values = keys.map((key) => submitFormData[key]).concat(INTERKASSA_SECRET_KEY);

  return values.join(':');
}

async function generatePaymentId(): Promise<number | string> {
  try {
    const paymentNumber = await TILDA_INTERKASSA.get('payment-number');
    await TILDA_INTERKASSA.put('payment-number', (Number(paymentNumber) + 1).toString());

    return Number(paymentNumber) + 1;
  } catch (error) {
    console.log('Error in generatePaymentId()', error);
  }

  return nanoid(10);
}

export async function handleRequest(request: Request): Promise<Response> {
  const paymentId = await generatePaymentId();
  const paymentProps = await request.json();

  const submitFormData = Object.assign(paymentProps, {
    ik_co_id: INTERKASSA_CHECKOUT_ID,
    ik_pm_no: `ID_${paymentId}`
  });

  const signature = createSignature(submitFormData);
  const signatureHash = Base64.stringify(sha256(signature));

  const responseJSON = JSON.stringify({
    ik_pm_no: `ID_${paymentId}`,
    ik_sign: signatureHash
  });

  return new Response(responseJSON, {
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    }
  });
}
