
import React, { useState, useRef } from 'react';
import { UserProfile } from '../types';
import { updateUserProfile } from '../services/dbService';
import { User, Save, Camera, BadgeCheck, Code, Fingerprint, Upload } from 'lucide-react';

interface ProfileSettingsProps {
  user: UserProfile;
  onUpdate: (updatedUser: UserProfile) => void;
}

const AVATARS = [
    'https://api.dicebear.com/7.x/bottts/svg?seed=1',
    'https://api.dicebear.com/7.x/bottts/svg?seed=2',
    'https://api.dicebear.com/7.x/bottts/svg?seed=3',
    'https://api.dicebear.com/7.x/bottts/svg?seed=4',
    'https://api.dicebear.com/7.x/bottts/svg?seed=5',
    'https://api.dicebear.com/7.x/bottts/svg?seed=6',
    'https://api.dicebear.com/7.x/bottts/svg?seed=7',
    'https://api.dicebear.com/7.x/bottts/svg?seed=8',
];

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user, onUpdate }) => {
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [username, setUsername] = useState(user.username || '');
  const [bio, setBio] = useState(user.bio || '');
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar || AVATARS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    setIsLoading(true);
    const updated = await updateUserProfile({
        firstName,
        lastName,
        username,
        bio,
        avatar: selectedAvatar
    });
    onUpdate(updated);
    setIsLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        if (file.size > 1024 * 1024 * 2) { // 2MB limit
            alert("Image is too large. Please select an image under 2MB.");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedAvatar(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4">
      
      <div className="mb-8 border-b border-border dark:border-gray-700 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <User className="text-brand" size={32} />
              Operative Profile
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your identity and credentials.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Avatar & Public Info */}
          <div className="col-span-1">
              <div className="bg-white dark:bg-[#161b22] border border-border dark:border-gray-700 rounded-xl p-6 shadow-card flex flex-col items-center text-center">
                  <div className="relative group cursor-pointer mb-4" onClick={() => fileInputRef.current?.click()}>
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                          <img src={selectedAvatar} alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Upload className="text-white" size={24} />
                      </div>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                      />
                  </div>
                  <button onClick={() => fileInputRef.current?.click()} className="text-xs text-brand hover:underline font-bold mb-4">
                      Upload from Gallery
                  </button>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{username}</h3>
                  <p className="text-sm text-gray-500 mb-4">{user.rankTitle}</p>
                  
                  <div className="w-full border-t border-border dark:border-gray-700 pt-4 mt-2 grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                          <div className="font-bold text-brand">{user.level}</div>
                          <div className="text-gray-500">LEVEL</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                          <div className="font-bold text-brand">{user.xp}</div>
                          <div className="text-gray-500">XP</div>
                      </div>
                  </div>
              </div>

              <div className="mt-6">
                  <label className="text-xs font-bold text-gray-500 uppercase mb-3 block">Or choose avatar</label>
                  <div className="grid grid-cols-4 gap-2">
                      {AVATARS.map((av, i) => (
                          <button 
                            key={i} 
                            onClick={() => setSelectedAvatar(av)}
                            className={`rounded-full overflow-hidden border-2 transition-all ${selectedAvatar === av ? 'border-brand scale-110' : 'border-transparent hover:border-gray-300'}`}
                          >
                              <img src={av} alt={`Avatar ${i}`} className="w-full h-full bg-gray-100" />
                          </button>
                      ))}
                  </div>
              </div>
          </div>

          {/* Right Column: Edit Form */}
          <div className="col-span-2 space-y-6">
              <div className="bg-white dark:bg-[#161b22] border border-border dark:border-gray-700 rounded-xl p-6 shadow-card">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <Fingerprint size={20} className="text-gray-400" />
                      Personal Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                          <input 
                            type="text" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-border dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                            placeholder="e.g. Abebe"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                          <input 
                            type="text" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-border dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                            placeholder="e.g. Kebede"
                          />
                      </div>
                  </div>

                  <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Codename (Alias)</label>
                      <div className="relative">
                          <Code className="absolute left-3 top-2.5 text-gray-400" size={16} />
                          <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full pl-10 px-4 py-2 rounded-lg border border-border dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all font-mono"
                            placeholder="Hacker_001"
                          />
                      </div>
                  </div>

                  <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                      <textarea 
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-border dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all resize-none"
                        placeholder="Tell us about your hacking journey..."
                      />
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded p-4 mb-6 flex gap-3">
                      <BadgeCheck className="text-blue-500 shrink-0" size={20} />
                      <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                          Your First and Last Name will be used for your <strong>Official Certificate</strong>. Your Codename will be displayed on the Leaderboard.
                      </p>
                  </div>

                  <div className="flex justify-end">
                      <button 
                        onClick={handleSave}
                        disabled={isLoading}
                        className="bg-brand hover:bg-brand-hover text-white font-bold py-2.5 px-6 rounded-lg shadow-lg shadow-brand/20 flex items-center gap-2 transition-all disabled:opacity-50"
                      >
                          {isLoading ? 'Saving...' : success ? 'Saved Successfully!' : 'Save Changes'}
                          {!isLoading && !success && <Save size={18} />}
                      </button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
