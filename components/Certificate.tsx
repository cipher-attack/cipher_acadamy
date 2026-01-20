
import React, { useState, useEffect } from 'react';
import { Download, Loader2, Share2, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';
import Logo from './Logo';
import html2canvas from 'html2canvas';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

interface CertificateProps {
  user: UserProfile;
  courseName: string;
  date: string;
}

// --- ASSETS ---
const PAPER_NOISE = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E`;

const CertificateTemplate = ({ user, courseName, currentDate }: { user: UserProfile, courseName: string, currentDate: string }) => {
    const displayName = user.firstName && user.lastName 
        ? `${user.firstName} ${user.lastName}` 
        : user.username;

    return (
        <div 
            id="certificate-node"
            className="relative text-[#0a0a0a] shadow-2xl flex flex-col overflow-hidden"
            style={{
                width: '1000px', 
                height: '700px', 
                minWidth: '1000px',
                minHeight: '700px',
                backgroundColor: '#fdfbf7',
                backgroundImage: `url("${PAPER_NOISE}"), radial-gradient(circle at 50% 30%, #fff 0%, #fdfbf7 100%)`,
            }}
        >
            {/* --- MINIMALIST BORDER --- */}
            <div className="absolute inset-6 border-[3px] border-[#111] z-10 pointer-events-none"></div>
            <div className="absolute inset-8 border-[1px] border-[#C5A059] z-10 pointer-events-none opacity-60"></div>

            {/* --- BACKGROUND --- */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <Logo className="w-[700px] h-[700px] text-black" />
            </div>

            {/* --- CONTENT --- */}
            <div className="relative z-30 flex flex-col h-full py-20 px-24">
                
                {/* HEADER */}
                <div className="flex justify-between items-start mb-16">
                    <div className="flex flex-col">
                         <div className="flex items-center gap-3 mb-2">
                            <Logo className="w-8 h-8 text-[#C5A059]" />
                            <span className="text-xs font-bold tracking-[0.4em] uppercase text-[#666] font-sans">Cipher Academy</span>
                         </div>
                         <div className="h-[1px] w-full bg-[#C5A059]"></div>
                    </div>
                    <div className="text-right">
                        <h2 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">Authenticity ID</h2>
                        <p className="font-mono text-xs font-bold text-[#111]">ETH-{user.userId.substring(4)}</p>
                    </div>
                </div>

                {/* BODY */}
                <div className="flex-1 flex flex-col justify-center items-center text-center -mt-10">
                    <h1 className="text-5xl font-serif text-[#111] tracking-tight mb-4" style={{ fontFamily: '"Playfair Display", serif', fontWeight: 900 }}>
                        CERTIFICATE
                    </h1>
                    <span className="text-sm font-sans tracking-[0.3em] text-[#C5A059] uppercase mb-12 font-semibold">of Achievement</span>

                    <p className="text-lg text-[#444] font-serif italic mb-8">This credential is awarded to</p>
                    
                    <div className="relative inline-block min-w-[550px] mx-auto mb-10">
                        <div className="border-b-2 border-[#111] px-10 pb-4">
                            <h2 className="text-5xl font-serif text-[#000] font-bold capitalize whitespace-nowrap tracking-wide leading-none translate-y-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                                {displayName}
                            </h2>
                        </div>
                    </div>

                    <p className="text-xl text-[#333] max-w-2xl mx-auto leading-relaxed font-serif">
                        For demonstrating elite proficiency in advanced <br/>
                        <strong className="text-[#111] font-bold">Ethical Hacking & Cyber Security</strong> operations.
                    </p>
                </div>

                {/* FOOTER */}
                <div className="w-full flex justify-between items-end mt-auto pt-10">
                    <div className="text-center">
                        <div className="w-40 border-t border-[#999] pt-3 text-lg font-serif text-[#111]">{currentDate}</div>
                        <div className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mt-1">Date Issued</div>
                    </div>

                    <div className="relative -mb-4">
                        <div className="w-28 h-28 rounded-full border border-[#C5A059] flex items-center justify-center bg-gradient-to-br from-[#fff] to-[#f0f0f0] shadow-lg relative">
                            <div className="absolute inset-1 rounded-full border-[2px] border-[#C5A059] opacity-30"></div>
                            <div className="absolute inset-2 rounded-full border border-[#111] opacity-10"></div>
                            <div className="flex flex-col items-center justify-center z-10">
                                <ShieldCheck size={32} className="text-[#C5A059] mb-1" />
                                <span className="text-[6px] font-black tracking-widest text-[#111] uppercase mt-1">Cipher<br/>Verified</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="w-40 border-t border-[#999] pt-3 text-lg font-serif text-[#111] flex justify-center items-center gap-2">
                             <Logo className="w-5 h-5 text-black" />
                             <span className="font-bold text-sm">Cipher System</span>
                        </div>
                        <div className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mt-1">Authority</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Certificate: React.FC<CertificateProps> = ({ user, courseName }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [scale, setScale] = useState(1);
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
  }));

  useEffect(() => {
      const handleResize = () => {
          if (window.innerWidth < 1040) {
              const newScale = (window.innerWidth - 32) / 1000;
              setScale(newScale);
          } else {
              setScale(1);
          }
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDownload = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 300)); 

    try {
        const template = document.getElementById('certificate-node');
        if (!template) throw new Error("Template not found");

        const clone = template.cloneNode(true) as HTMLElement;
        
        // Setup hidden clone for high-res capture
        clone.style.position = 'fixed';
        clone.style.top = '0';
        clone.style.left = '0';
        clone.style.width = '1000px'; 
        clone.style.height = '700px'; 
        clone.style.transform = 'none'; 
        clone.style.zIndex = '-9999'; 
        clone.style.margin = '0';
        clone.style.borderRadius = '0';
        
        document.body.appendChild(clone);

        const canvas = await html2canvas(clone, {
            scale: 2, 
            useCORS: true,
            backgroundColor: null, 
            logging: false,
            width: 1000,
            height: 700
        });

        document.body.removeChild(clone);
        
        const base64Data = canvas.toDataURL("image/png", 1.0);

        // --- NATIVE ANDROID/IOS HANDLING ---
        if (Capacitor.isNativePlatform()) {
            const fileName = `Cipher_Certificate_${user.username}.png`;
            
            // 1. Write file to cache directory
            await Filesystem.writeFile({
                path: fileName,
                data: base64Data, // Filesystem accepts data urls directly
                directory: Directory.Cache
            });

            // 2. Get the full URI
            const uriResult = await Filesystem.getUri({
                directory: Directory.Cache,
                path: fileName
            });

            // 3. Share the file (This opens the native share sheet - Save to Gallery, Drive, etc.)
            await Share.share({
                title: 'Cipher Academy Certificate',
                text: 'I am now a certified Ethical Hacker via Cipher Academy!',
                url: uriResult.uri,
                dialogTitle: 'Download Certificate'
            });

        } else {
            // --- WEB FALLBACK ---
            const link = document.createElement("a");
            link.href = base64Data;
            link.download = `Cipher_Certificate_${user.username}.png`;
            link.click();
        }

    } catch (e) {
        console.error("Generation failed", e);
        alert("Download failed. Please try again.");
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full h-full overflow-y-auto bg-[#030303] relative">
      <div 
        style={{ 
            transform: `scale(${scale})`, 
            transformOrigin: 'top center',
            marginBottom: `-${(700 - (700 * scale))}px` 
        }} 
        className="mt-8 shadow-2xl"
      >
          <CertificateTemplate user={user} courseName={courseName} currentDate={currentDate} />
      </div>

      <div className="flex flex-col items-center gap-4 mt-12 mb-20 z-50 w-full max-w-sm">
        <button 
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-3 bg-[#C5A059] text-black px-6 py-4 rounded-xl font-bold hover:bg-[#b08d4a] transition-all shadow-[0_4px_20px_rgba(197,160,89,0.3)] disabled:opacity-70 disabled:cursor-not-allowed tracking-wide uppercase text-sm"
        >
            {isGenerating ? <Loader2 className="animate-spin" size={20}/> : <Download size={20} />}
            {isGenerating ? "Processing..." : "Download Certificate"}
        </button>
      </div>
    </div>
  );
};

export default Certificate;
