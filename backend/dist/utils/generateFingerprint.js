import crypto from 'crypto';
// it hashes the network fingerprint(e.g., SSID + BSSID) using SHA-256.
export function generateWiFiFingerprint(ssid, bssid) {
    return crypto.createHash('sha256').update(`${ssid}-${bssid}`).digest('hex');
}
