const generateConfig = () => ({
  network: process.env.NETWORK || "homestead"
});

export const config = generateConfig();
