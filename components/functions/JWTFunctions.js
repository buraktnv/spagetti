export function decodeToken(token) {
  try {
    // if the token has more or less than 3 parts or is not a string
    // then is not a valid token
    if (token.split(".").length !== 3 || typeof token !== "string") {
      return null;
    }

    // payload ( index 1 ) has the data stored and
    // data about the expiration time
    const payload = token.split(".")[1];
    // handle unicode parsing issues between atob and JWT base64 format
    const base64 = payload.replace("-", "+").replace("_", "/");
    // decode and parse to json
    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (error) {
    // Return null if something goes wrong
    return null;
  }
}

export function isTokenExpired(token) {
  const decodedToken = decodeToken(token);
  let result = true;

  if (decodedToken && decodedToken.exp) {
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp); // sets the expiration seconds
    // compare the expiration time and the current time
    result = expirationDate.valueOf() < new Date().valueOf() - 300000;
  }

  return result;
}
