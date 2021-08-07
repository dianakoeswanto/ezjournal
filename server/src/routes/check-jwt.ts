const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const domain = 'ezjournal.au.auth0.com';
const audience = 'https://web.api.ezjournal';

export const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${domain}/.well-known/jwks.json`,
    }),

    audience: audience,
    issuer: `https://${domain}/`,
    algorithms: ["RS256"],
});
