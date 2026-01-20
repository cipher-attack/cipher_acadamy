
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { UserProfile, LessonProgress, LeaderboardEntry } from '../types';

interface EthicalCodeDB extends DBSchema {
  user: {
    key: string;
    value: UserProfile;
  };
  progress: {
    key: string; // lessonId
    value: LessonProgress;
  };
}

const DB_NAME = 'EthicalCodeDB';
const DB_VERSION = 2; 
const LS_USER_KEY = 'ethical_code_user';
const LS_PROGRESS_KEY = 'ethical_code_progress';

let dbPromise: Promise<IDBPDatabase<EthicalCodeDB>> | null = null;
let isIDBFailed = false;

export const initDB = async () => {
  if (isIDBFailed) return null;
  
  if (!dbPromise) {
    try {
        dbPromise = openDB<EthicalCodeDB>(DB_NAME, DB_VERSION, {
        upgrade(db, oldVersion, newVersion, transaction) {
            if (!db.objectStoreNames.contains('user')) {
                db.createObjectStore('user');
            }
            if (!db.objectStoreNames.contains('progress')) {
                db.createObjectStore('progress', { keyPath: 'lessonId' });
            }
        },
        });
        await dbPromise; // Wait to ensure it opens successfully
    } catch (error) {
        console.warn("IndexedDB initialization failed, falling back to LocalStorage:", error);
        isIDBFailed = true;
        dbPromise = null;
        return null;
    }
  }
  return dbPromise;
};

// --- HELPERS FOR LOCAL STORAGE FALLBACK ---

const getLSUser = (): UserProfile | null => {
    try {
        const data = localStorage.getItem(LS_USER_KEY);
        return data ? JSON.parse(data) : null;
    } catch (e) { return null; }
};

const saveLSUser = (user: UserProfile) => {
    try {
        localStorage.setItem(LS_USER_KEY, JSON.stringify(user));
    } catch (e) {}
};

const getLSProgress = (): LessonProgress[] => {
    try {
        const data = localStorage.getItem(LS_PROGRESS_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) { return []; }
};

const saveLSProgress = (progress: LessonProgress) => {
    try {
        const list = getLSProgress();
        const index = list.findIndex(p => p.lessonId === progress.lessonId);
        if (index >= 0) {
            list[index] = progress;
        } else {
            list.push(progress);
        }
        localStorage.setItem(LS_PROGRESS_KEY, JSON.stringify(list));
    } catch (e) {}
};


// --- USER OPERATIONS ---

export const getUserProfile = async (): Promise<UserProfile> => {
  const db = await initDB();
  
  let user: UserProfile | undefined;

  if (db && !isIDBFailed) {
      try {
        user = await db.get('user', 'main_user');
      } catch (e) {
        console.warn("DB Read failed", e);
      }
  } 
  
  if (!user) {
      if (isIDBFailed || !user) user = getLSUser() || undefined;
  }
  
  const defaultUser: UserProfile = {
      userId: `ETH-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      username: 'Hacker_Initiate',
      firstName: '',
      lastName: '',
      bio: '',
      avatar: '',
      xp: 0,
      level: 1,
      rankTitle: 'Script Kiddie',
      streak: 1,
      lastLogin: new Date().toISOString(),
      ctfSolved: [],
      money: 100, 
      inventory: [],
      jobsCompleted: [],
      reverseSolved: [],
      cryptoSolved: [],
      vulnSolved: [],
      socialSolved: [],
      signalSolved: [],
      isCertified: false,
      examScore: 0
  };

  if (!user) {
    if (db && !isIDBFailed) {
        try {
            await db.put('user', defaultUser, 'main_user');
        } catch(e) { isIDBFailed = true; saveLSUser(defaultUser); }
    } else {
        saveLSUser(defaultUser);
    }
    return defaultUser;
  }
  
  return { ...defaultUser, ...user };
};

export const updateUserProfile = async (updates: Partial<UserProfile>): Promise<UserProfile> => {
    const current = await getUserProfile();
    const updated = { ...current, ...updates };
    
    const db = await initDB();
    if (db && !isIDBFailed) {
        try {
            await db.put('user', updated, 'main_user');
        } catch (e) { saveLSUser(updated); }
    } else {
        saveLSUser(updated);
    }
    return updated;
};

export const addXP = async (amount: number): Promise<UserProfile> => {
  const user = await getUserProfile();
  
  user.xp += amount;
  user.level = Math.floor(user.xp / 100) + 1;
  
  if (user.level < 5) user.rankTitle = "Script Kiddie";
  else if (user.level < 10) user.rankTitle = "Green Hat";
  else if (user.level < 20) user.rankTitle = "White Hat";
  else user.rankTitle = "Elite Hacker";
  
  const updatedUser = await updateUserProfile(user);
  
  return updatedUser;
};

// --- PROGRESS OPERATIONS ---

export const getCompletedLessons = async (): Promise<string[]> => {
  const db = await initDB();
  let allProgress: LessonProgress[] = [];

  if (db && !isIDBFailed) {
      try {
        allProgress = await db.getAll('progress');
      } catch (e) {
         allProgress = getLSProgress();
      }
  } else {
      allProgress = getLSProgress();
  }
  
  return allProgress.filter(p => p.completed).map(p => p.lessonId);
};

export const markLessonComplete = async (lessonId: string, score: number = 0) => {
  const db = await initDB();
  
  let isFirstTime = true;
  
  // Check existence
  if (db && !isIDBFailed) {
      try {
        const existing = await db.get('progress', lessonId);
        isFirstTime = !existing?.completed;
      } catch(e) {
          const lsList = getLSProgress();
          const existing = lsList.find(p => p.lessonId === lessonId);
          isFirstTime = !existing?.completed;
      }
  } else {
      const lsList = getLSProgress();
      const existing = lsList.find(p => p.lessonId === lessonId);
      isFirstTime = !existing?.completed;
  }

  const progress: LessonProgress = {
    lessonId,
    completed: true,
    score,
    completedAt: new Date().toISOString()
  };

  if (db && !isIDBFailed) {
      try {
        await db.put('progress', progress);
      } catch (e) {
          saveLSProgress(progress);
      }
  } else {
      saveLSProgress(progress);
  }

  if (isFirstTime) {
    await addXP(50); 
  }
  
  return isFirstTime; 
};

export const resetProgress = async () => {
    const db = await initDB();
    const defaultUser: UserProfile = {
        userId: `ETH-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        username: 'Hacker_Initiate',
        firstName: '',
        lastName: '',
        bio: '',
        avatar: '',
        xp: 0,
        level: 1,
        rankTitle: 'Script Kiddie',
        streak: 1,
        lastLogin: new Date().toISOString(),
        ctfSolved: [],
        money: 100,
        inventory: [],
        jobsCompleted: [],
        reverseSolved: [],
        cryptoSolved: [],
        vulnSolved: [],
        socialSolved: [],
        signalSolved: [],
        isCertified: false,
        examScore: 0
    };

    if (db && !isIDBFailed) {
        try {
            await db.clear('progress');
            await db.put('user', defaultUser, 'main_user');
        } catch (e) {}
    }
    
    localStorage.removeItem(LS_PROGRESS_KEY);
    saveLSUser(defaultUser);
};

// --- LEADERBOARD OPERATIONS ---

export const getLeaderboardData = async (): Promise<LeaderboardEntry[]> => {
  const user = await getUserProfile();
  
  // Mock data for leaderboard simulation - Rivals
  const rivals = [
    { username: "Ghost_Root", xp: Math.floor(user.xp * 1.5) + 500, badge: "Elite Hacker" },
    { username: "ZeroCool", xp: Math.floor(user.xp * 1.2) + 200, badge: "White Hat" },
    { username: "AcidBurn", xp: Math.floor(user.xp * 1.1) + 100, badge: "White Hat" },
    { username: "CerealKiller", xp: Math.max(0, Math.floor(user.xp * 0.9) - 50), badge: "Grey Hat" },
    { username: "LordNikon", xp: Math.max(0, Math.floor(user.xp * 0.8) - 100), badge: "Script Kiddie" }
  ];

  // Combine with current user
  const allUsers = [
    ...rivals,
    { username: user.username, xp: user.xp, badge: user.rankTitle, isUser: true }
  ];

  // Sort descending by XP
  allUsers.sort((a, b) => b.xp - a.xp);

  // Map to LeaderboardEntry with ranks
  return allUsers.map((u, index) => ({
    rank: index + 1,
    username: u.username,
    xp: u.xp,
    badge: u.badge,
    isUser: !!(u as any).isUser
  }));
};
