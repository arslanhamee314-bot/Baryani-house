import bcrypt from "bcryptjs";

const DEFAULT_USERNAME = "Bari'suser";
// Default bcrypt hash for "Bari'sadmin" (salt rounds = 10)
const INITIAL_PASSWORD_HASH = "$2a$10$wT8KzQYv4J.X7K1K8Hw6/.X3X7zYyZ1/X7K1K8Hw6/.X3X7zYyZ1/"; // We will compute and set valid hash

// Key names
const AUTH_TOKEN_KEY = "baris_admin_session";
const LOCKOUT_KEY = "baris_admin_lockout";
const PASSWORD_HASH_KEY = "baris_admin_pwd_hash";

export interface SessionData {
  username: string;
  loginTime: number; // timestamp
  lastActivity: number; // timestamp
}

export interface LockoutData {
  attempts: number;
  lockUntil: number | null;
}

// Ensure password hash exists in localStorage or initialize with default hash for "Bari'sadmin"
export function getStoredPasswordHash(): string {
  const custom = localStorage.getItem(PASSWORD_HASH_KEY);
  if (custom) return custom;
  
  // Default hash for "Bari'sadmin"
  const defaultHash = bcrypt.hashSync("Bari'sadmin", 10);
  localStorage.setItem(PASSWORD_HASH_KEY, defaultHash);
  return defaultHash;
}

export function updatePasswordHash(newPassword: string): void {
  const hash = bcrypt.hashSync(newPassword, 10);
  localStorage.setItem(PASSWORD_HASH_KEY, hash);
}

export function getLockoutStatus(): LockoutData {
  const raw = localStorage.getItem(LOCKOUT_KEY);
  if (!raw) return { attempts: 0, lockUntil: null };
  try {
    const data: LockoutData = JSON.parse(raw);
    if (data.lockUntil && Date.now() > data.lockUntil) {
      // Lock expired
      const reset = { attempts: 0, lockUntil: null };
      localStorage.setItem(LOCKOUT_KEY, JSON.stringify(reset));
      return reset;
    }
    return data;
  } catch {
    return { attempts: 0, lockUntil: null };
  }
}

export function recordFailedAttempt(): { remaining: number; locked: boolean; lockTimeMinutes: number } {
  const current = getLockoutStatus();
  const newAttempts = current.attempts + 1;
  const lockMinutes = 15;

  if (newAttempts >= 5) {
    const lockUntil = Date.now() + lockMinutes * 60 * 1000;
    const lockData: LockoutData = { attempts: newAttempts, lockUntil };
    localStorage.setItem(LOCKOUT_KEY, JSON.stringify(lockData));
    return { remaining: 0, locked: true, lockTimeMinutes: lockMinutes };
  } else {
    const lockData: LockoutData = { attempts: newAttempts, lockUntil: null };
    localStorage.setItem(LOCKOUT_KEY, JSON.stringify(lockData));
    return { remaining: 5 - newAttempts, locked: false, lockTimeMinutes: 0 };
  }
}

export function clearLockout(): void {
  localStorage.removeItem(LOCKOUT_KEY);
}

export function loginAdmin(usernameInput: string, passwordInput: string): { success: boolean; error?: string } {
  const lockout = getLockoutStatus();
  if (lockout.lockUntil && Date.now() < lockout.lockUntil) {
    const minsLeft = Math.ceil((lockout.lockUntil - Date.now()) / (60 * 1000));
    return {
      success: false,
      error: `Account locked due to 5 failed login attempts. Please try again in ${minsLeft} minute(s).`,
    };
  }

  const currentHash = getStoredPasswordHash();
  const usernameMatch = usernameInput.trim() === DEFAULT_USERNAME;
  const passwordMatch = usernameMatch ? bcrypt.compareSync(passwordInput, currentHash) : false;

  if (!usernameMatch || !passwordMatch) {
    const status = recordFailedAttempt();
    if (status.locked) {
      return {
        success: false,
        error: `Too many failed login attempts! Account locked for 15 minutes.`,
      };
    }
    return {
      success: false,
      error: `Invalid credentials. ${status.remaining} attempt(s) remaining before account lockout.`,
    };
  }

  // Success
  clearLockout();
  const session: SessionData = {
    username: DEFAULT_USERNAME,
    loginTime: Date.now(),
    lastActivity: Date.now(),
  };
  sessionStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(session));
  return { success: true };
}

export function checkIsAuthenticated(): boolean {
  const raw = sessionStorage.getItem(AUTH_TOKEN_KEY);
  if (!raw) return false;

  try {
    const session: SessionData = JSON.parse(raw);
    const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
    
    // Inactivity timeout (2 hours)
    if (Date.now() - session.lastActivity > TWO_HOURS_MS) {
      logoutAdmin();
      return false;
    }

    // Refresh lastActivity timestamp
    session.lastActivity = Date.now();
    sessionStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(session));
    return true;
  } catch {
    logoutAdmin();
    return false;
  }
}

export function logoutAdmin(): void {
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
}
