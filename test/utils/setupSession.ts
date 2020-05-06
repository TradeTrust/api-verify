import axios from "axios";
import uuid from "uuid/v4";

const ENDPOINT = process.env.ENDPOINT || "http://localhost:3000";

export const userReference = "S1234567B";
export const phone = "+6599999999";

export const createOperatorToken = async (): Promise<string> => {
  const token = uuid();
  await axios({
    method: "post",
    url: `${ENDPOINT}/auth`,
    data: {
      operatorToken: token,
      role: "OPERATOR",
      userReference,
      validFrom: 1,
      validTill: 3686052000000 // Year 2086
    }
  });
  return token;
};

export const createSessionFromOperatorToken = async (operatorToken: string): Promise<string> => {
  await axios({
    method: "post",
    url: `${ENDPOINT}/auth/register`,
    data: {
      code: operatorToken,
      phone
    }
  });
  const { data } = await axios({
    method: "post",
    url: `${ENDPOINT}/auth/confirm`,
    data: {
      code: operatorToken,
      phone,
      otp: "000000"
    }
  });
  return data.sessionToken;
};

export const createSession = async () => {
  const operatorToken = await createOperatorToken();
  const sessionToken = await createSessionFromOperatorToken(operatorToken);
  return { operatorToken, sessionToken };
};
