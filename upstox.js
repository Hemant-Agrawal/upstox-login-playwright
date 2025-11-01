export async function getToken(code, client_id, client_secret, redirect_uri) {
  const url = "https://api.upstox.com/v2/login/authorization/token";

  const params = new URLSearchParams();
  params.append("code", code);
  params.append("client_id", client_id);
  params.append("client_secret", client_secret);
  params.append("redirect_uri", redirect_uri);
  params.append("grant_type", "authorization_code");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });
  return response.json();
}
