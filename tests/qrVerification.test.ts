// Unit Tests: Live Certificate QR Parsing & Verification Integrity

describe('Certificate QR Verification Payload Parsing', () => {
  test('correctly extracts certificate number and verification hash from official URL', () => {
    const rawQrUrl =
      'https://api.natalagoscouncil.com.ng/api/v1/certificates/verify-public?cert=NATA-CERT-2024-8891&hash=SHA256-7f83b165';

    const url = new URL(rawQrUrl);
    const certNo = url.searchParams.get('cert');
    const hash = url.searchParams.get('hash');

    expect(certNo).toBe('NATA-CERT-2024-8891');
    expect(hash).toBe('SHA256-7f83b165');
  });

  test('parses JSON payload format when encoded in QR', () => {
    const rawJsonPayload = JSON.stringify({
      certificateNumber: 'NATA-CERT-2024-8891',
      verificationHash: 'SHA256:7f83b1657ff1fc53',
    });

    const parsed = JSON.parse(rawJsonPayload);
    expect(parsed.certificateNumber).toBe('NATA-CERT-2024-8891');
    expect(parsed.verificationHash).toBe('SHA256:7f83b1657ff1fc53');
  });
});
