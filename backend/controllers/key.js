const Key = require("../models/key");
const crypto = require("crypto");

const SECRET = process.env.ENCRYPTION_KEY;

// 🔐 Encrypt function
function encryptApiKey(plainText) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(
    "aes-256-gcm",
    Buffer.from(SECRET.padEnd(32).slice(0, 32)),
    iv
  );
  const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  // iv + authTag + encrypted — sab ek saath base64 mein
  const combined = Buffer.concat([iv, authTag, encrypted]);
  return combined.toString("base64");
}

// 🔓 Decrypt function
function decryptApiKey(encryptedBase64) {
  const combined = Buffer.from(encryptedBase64, "base64");
  const iv = combined.slice(0, 12);
  const authTag = combined.slice(12, 28);
  const data = combined.slice(28);

  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    Buffer.from(SECRET.padEnd(32).slice(0, 32)),
    iv
  );
  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
}

// ✅ Save — encrypt karke save karo
const Addkey = async (req, res) => {
  try {
    const { apiKey } = req.body;
    const encrypted = encryptApiKey(apiKey); // 🔐 encrypt
    const newKey = new Key({ key: encrypted });
    await newKey.save();
    res.status(201).json({ message: "Key encrypted aur save ho gayi!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Fetch — decrypt karke return karo
const fetchKey = async (req, res) => {
  try {
    const key = await Key.findOne().sort({ _id: -1 });
    if (!key) return res.status(404).json({ error: "API Key not found" });

    const decrypted = decryptApiKey(key.key); // 🔓 decrypt
    res.status(200).json({ apiKey: decrypted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { Addkey, fetchKey, decryptApiKey };