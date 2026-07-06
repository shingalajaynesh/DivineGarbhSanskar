const API_URL = import.meta.env.VITE_GRAPHQL_API_URL || 'http://localhost:4000/graphql';

const SUBMIT_INQUIRY = `
  mutation SubmitInquiry($input: SubmitInquiryInput!) {
    submitInquiry(input: $input) {
      id
      status
    }
  }
`;

export async function submitInquiry(input) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: SUBMIT_INQUIRY, variables: { input } }),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok || payload?.errors?.length) {
    throw new Error(payload?.errors?.[0]?.message || 'Unable to submit your request. Please try again.');
  }
  return payload.data.submitInquiry;
}
