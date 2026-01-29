import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Code2, Menu, Mail, Send, MapPin, ExternalLink, 
  Link, Receipt, Utensils, Gift, Eye, Ticket, Globe, 
  GraduationCap, BookOpen, Download, Loader2,
  CheckCircle2, AlertCircle, Music, ZoomIn, X, 
  Database, Smartphone, Origami, Plane, Target,
  Home, Briefcase, Cpu, User, Infinity, Info,
  Radio, Film, Search, ChevronDown, Lock, Key,
  ShieldCheck, FileLock, Heart, Mic, Zap, Clock,
  PenTool, SlidersHorizontal, Calendar, Activity, Terminal
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

// --- ICONS ---
import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, SiTailwindcss, SiTypescript,
  SiFirebase, SiSupabase, SiPython, SiNodedotjs, SiExpress,
  SiArduino, SiRaspberrypi, SiAdobecreativecloud,
  SiGithub, SiAutodesk
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

// --- FIREBASE IMPORTS ---
import { initializeApp } from "firebase/app";
import { 
  getFirestore, doc, getDoc, setDoc, updateDoc, increment, 
  collection, addDoc, serverTimestamp, deleteDoc, onSnapshot 
} from "firebase/firestore";

// --- CONFIGURATION ---
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

// ⚠️ REPLACE THIS WITH YOUR BOT USERNAME (No @ symbol)
const BOT_USERNAME = "great_portfolio_bot"; 

// --- FIREBASE CONFIG ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- SHORTENED COUNTRY DATA (For Development) ---
const allCountries = [
  { name: "Afghanistan", dial_code: "+93", code: "AF" },
  { name: "Aland Islands", dial_code: "+358", code: "AX" },
  { name: "Albania", dial_code: "+355", code: "AL" },
  { name: "Algeria", dial_code: "+213", code: "DZ" },
  { name: "American Samoa", dial_code: "+1684", code: "AS" },
  { name: "Andorra", dial_code: "+376", code: "AD" },
  { name: "Angola", dial_code: "+244", code: "AO" },
  { name: "Anguilla", dial_code: "+1264", code: "AI" },
  { name: "Antarctica", dial_code: "+672", code: "AQ" },
  { name: "Antigua and Barbuda", dial_code: "+1268", code: "AG" },
  { name: "Argentina", dial_code: "+54", code: "AR" },
  { name: "Armenia", dial_code: "+374", code: "AM" },
  { name: "Aruba", dial_code: "+297", code: "AW" },
  { name: "Australia", dial_code: "+61", code: "AU" },
  { name: "Austria", dial_code: "+43", code: "AT" },
  { name: "Azerbaijan", dial_code: "+994", code: "AZ" },
  { name: "Bahamas", dial_code: "+1242", code: "BS" },
  { name: "Bahrain", dial_code: "+973", code: "BH" },
  { name: "Bangladesh", dial_code: "+880", code: "BD" },
  { name: "Barbados", dial_code: "+1246", code: "BB" },
  { name: "Belarus", dial_code: "+375", code: "BY" },
  { name: "Belgium", dial_code: "+32", code: "BE" },
  { name: "Belize", dial_code: "+501", code: "BZ" },
  { name: "Benin", dial_code: "+229", code: "BJ" },
  { name: "Bermuda", dial_code: "+1441", code: "BM" },
  { name: "Bhutan", dial_code: "+975", code: "BT" },
  { name: "Bolivia", dial_code: "+591", code: "BO" },
  { name: "Bosnia and Herzegovina", dial_code: "+387", code: "BA" },
  { name: "Botswana", dial_code: "+267", code: "BW" },
  { name: "Bouvet Island", dial_code: "+47", code: "BV" },
  { name: "Brazil", dial_code: "+55", code: "BR" },
  { name: "British Indian Ocean Territory", dial_code: "+246", code: "IO" },
  { name: "Brunei Darussalam", dial_code: "+673", code: "BN" },
  { name: "Bulgaria", dial_code: "+359", code: "BG" },
  { name: "Burkina Faso", dial_code: "+226", code: "BF" },
  { name: "Burundi", dial_code: "+257", code: "BI" },
  { name: "Cambodia", dial_code: "+855", code: "KH" },
  { name: "Cameroon", dial_code: "+237", code: "CM" },
  { name: "Canada", dial_code: "+1", code: "CA" },
  { name: "Cape Verde", dial_code: "+238", code: "CV" },
  { name: "Cayman Islands", dial_code: "+1345", code: "KY" },
  { name: "Central African Republic", dial_code: "+236", code: "CF" },
  { name: "Chad", dial_code: "+235", code: "TD" },
  { name: "Chile", dial_code: "+56", code: "CL" },
  { name: "China", dial_code: "+86", code: "CN" },
  { name: "Christmas Island", dial_code: "+61", code: "CX" },
  { name: "Cocos (Keeling) Islands", dial_code: "+61", code: "CC" },
  { name: "Colombia", dial_code: "+57", code: "CO" },
  { name: "Comoros", dial_code: "+269", code: "KM" },
  { name: "Congo", dial_code: "+242", code: "CG" },
  { name: "Congo, Democratic Republic of the", dial_code: "+243", code: "CD" },
  { name: "Cook Islands", dial_code: "+682", code: "CK" },
  { name: "Costa Rica", dial_code: "+506", code: "CR" },
  { name: "Cote d'Ivoire", dial_code: "+225", code: "CI" },
  { name: "Croatia", dial_code: "+385", code: "HR" },
  { name: "Cuba", dial_code: "+53", code: "CU" },
  { name: "Curaçao", dial_code: "+599", code: "CW" },
  { name: "Cyprus", dial_code: "+357", code: "CY" },
  { name: "Czech Republic", dial_code: "+420", code: "CZ" },
  { name: "Denmark", dial_code: "+45", code: "DK" },
  { name: "Djibouti", dial_code: "+253", code: "DJ" },
  { name: "Dominica", dial_code: "+1767", code: "DM" },
  { name: "Dominican Republic", dial_code: "+1849", code: "DO" },
  { name: "Ecuador", dial_code: "+593", code: "EC" },
  { name: "Egypt", dial_code: "+20", code: "EG" },
  { name: "El Salvador", dial_code: "+503", code: "SV" },
  { name: "Equatorial Guinea", dial_code: "+240", code: "GQ" },
  { name: "Eritrea", dial_code: "+291", code: "ER" },
  { name: "Estonia", dial_code: "+372", code: "EE" },
  { name: "Ethiopia", dial_code: "+251", code: "ET" },
  { name: "Falkland Islands (Malvinas)", dial_code: "+500", code: "FK" },
  { name: "Faroe Islands", dial_code: "+298", code: "FO" },
  { name: "Fiji", dial_code: "+679", code: "FJ" },
  { name: "Finland", dial_code: "+358", code: "FI" },
  { name: "France", dial_code: "+33", code: "FR" },
  { name: "French Guiana", dial_code: "+594", code: "GF" },
  { name: "French Polynesia", dial_code: "+689", code: "PF" },
  { name: "French Southern Territories", dial_code: "+262", code: "TF" },
  { name: "Gabon", dial_code: "+241", code: "GA" },
  { name: "Gambia", dial_code: "+220", code: "GM" },
  { name: "Georgia", dial_code: "+995", code: "GE" },
  { name: "Germany", dial_code: "+49", code: "DE" },
  { name: "Ghana", dial_code: "+233", code: "GH" },
  { name: "Gibraltar", dial_code: "+350", code: "GI" },
  { name: "Greece", dial_code: "+30", code: "GR" },
  { name: "Greenland", dial_code: "+299", code: "GL" },
  { name: "Grenada", dial_code: "+1473", code: "GD" },
  { name: "Guadeloupe", dial_code: "+590", code: "GP" },
  { name: "Guam", dial_code: "+1671", code: "GU" },
  { name: "Guatemala", dial_code: "+502", code: "GT" },
  { name: "Guernsey", dial_code: "+44", code: "GG" },
  { name: "Guinea", dial_code: "+224", code: "GN" },
  { name: "Guinea-Bissau", dial_code: "+245", code: "GW" },
  { name: "Guyana", dial_code: "+592", code: "GY" },
  { name: "Haiti", dial_code: "+509", code: "HT" },
  { name: "Heard Island and McDonald Islands", dial_code: "+672", code: "HM" },
  { name: "Holy See (Vatican City State)", dial_code: "+379", code: "VA" },
  { name: "Honduras", dial_code: "+504", code: "HN" },
  { name: "Hong Kong", dial_code: "+852", code: "HK" },
  { name: "Hungary", dial_code: "+36", code: "HU" },
  { name: "Iceland", dial_code: "+354", code: "IS" },
  { name: "India", dial_code: "+91", code: "IN" },
  { name: "Indonesia", dial_code: "+62", code: "ID" },
  { name: "Iran", dial_code: "+98", code: "IR" },
  { name: "Iraq", dial_code: "+964", code: "IQ" },
  { name: "Ireland", dial_code: "+353", code: "IE" },
  { name: "Isle of Man", dial_code: "+44", code: "IM" },
  { name: "Israel", dial_code: "+972", code: "IL" },
  { name: "Italy", dial_code: "+39", code: "IT" },
  { name: "Jamaica", dial_code: "+1876", code: "JM" },
  { name: "Japan", dial_code: "+81", code: "JP" },
  { name: "Jersey", dial_code: "+44", code: "JE" },
  { name: "Jordan", dial_code: "+962", code: "JO" },
  { name: "Kazakhstan", dial_code: "+7", code: "KZ" },
  { name: "Kenya", dial_code: "+254", code: "KE" },
  { name: "Kiribati", dial_code: "+686", code: "KI" },
  { name: "Korea, Democratic People's Republic of", dial_code: "+850", code: "KP" },
  { name: "Korea, Republic of", dial_code: "+82", code: "KR" },
  { name: "Kuwait", dial_code: "+965", code: "KW" },
  { name: "Kyrgyzstan", dial_code: "+996", code: "KG" },
  { name: "Lao People's Democratic Republic", dial_code: "+856", code: "LA" },
  { name: "Latvia", dial_code: "+371", code: "LV" },
  { name: "Lebanon", dial_code: "+961", code: "LB" },
  { name: "Lesotho", dial_code: "+266", code: "LS" },
  { name: "Liberia", dial_code: "+231", code: "LR" },
  { name: "Libyan Arab Jamahiriya", dial_code: "+218", code: "LY" },
  { name: "Liechtenstein", dial_code: "+423", code: "LI" },
  { name: "Lithuania", dial_code: "+370", code: "LT" },
  { name: "Luxembourg", dial_code: "+352", code: "LU" },
  { name: "Macao", dial_code: "+853", code: "MO" },
  { name: "Macedonia, the Former Yugoslav Republic of", dial_code: "+389", code: "MK" },
  { name: "Madagascar", dial_code: "+261", code: "MG" },
  { name: "Malawi", dial_code: "+265", code: "MW" },
  { name: "Malaysia", dial_code: "+60", code: "MY" },
  { name: "Maldives", dial_code: "+960", code: "MV" },
  { name: "Mali", dial_code: "+223", code: "ML" },
  { name: "Malta", dial_code: "+356", code: "MT" },
  { name: "Marshall Islands", dial_code: "+692", code: "MH" },
  { name: "Martinique", dial_code: "+596", code: "MQ" },
  { name: "Mauritania", dial_code: "+222", code: "MR" },
  { name: "Mauritius", dial_code: "+230", code: "MU" },
  { name: "Mayotte", dial_code: "+262", code: "YT" },
  { name: "Mexico", dial_code: "+52", code: "MX" },
  { name: "Micronesia, Federated States of", dial_code: "+691", code: "FM" },
  { name: "Moldova, Republic of", dial_code: "+373", code: "MD" },
  { name: "Monaco", dial_code: "+377", code: "MC" },
  { name: "Mongolia", dial_code: "+976", code: "MN" },
  { name: "Montenegro", dial_code: "+382", code: "ME" },
  { name: "Montserrat", dial_code: "+1664", code: "MS" },
  { name: "Morocco", dial_code: "+212", code: "MA" },
  { name: "Mozambique", dial_code: "+258", code: "MZ" },
  { name: "Myanmar", dial_code: "+95", code: "MM" },
  { name: "Namibia", dial_code: "+264", code: "NA" },
  { name: "Nauru", dial_code: "+674", code: "NR" },
  { name: "Nepal", dial_code: "+977", code: "NP" },
  { name: "Netherlands", dial_code: "+31", code: "NL" },
  { name: "New Caledonia", dial_code: "+687", code: "NC" },
  { name: "New Zealand", dial_code: "+64", code: "NZ" },
  { name: "Nicaragua", dial_code: "+505", code: "NI" },
  { name: "Niger", dial_code: "+227", code: "NE" },
  { name: "Nigeria", dial_code: "+234", code: "NG" },
  { name: "Niue", dial_code: "+683", code: "NU" },
  { name: "Norfolk Island", dial_code: "+672", code: "NF" },
  { name: "Northern Mariana Islands", dial_code: "+1670", code: "MP" },
  { name: "Norway", dial_code: "+47", code: "NO" },
  { name: "Oman", dial_code: "+968", code: "OM" },
  { name: "Pakistan", dial_code: "+92", code: "PK" },
  { name: "Palau", dial_code: "+680", code: "PW" },
  { name: "Palestinian Territory, Occupied", dial_code: "+970", code: "PS" },
  { name: "Panama", dial_code: "+507", code: "PA" },
  { name: "Papua New Guinea", dial_code: "+675", code: "PG" },
  { name: "Paraguay", dial_code: "+595", code: "PY" },
  { name: "Peru", dial_code: "+51", code: "PE" },
  { name: "Philippines", dial_code: "+63", code: "PH" },
  { name: "Pitcairn", dial_code: "+64", code: "PN" },
  { name: "Poland", dial_code: "+48", code: "PL" },
  { name: "Portugal", dial_code: "+351", code: "PT" },
  { name: "Puerto Rico", dial_code: "+1939", code: "PR" },
  { name: "Qatar", dial_code: "+974", code: "QA" },
  { name: "Reunion", dial_code: "+262", code: "RE" },
  { name: "Romania", dial_code: "+40", code: "RO" },
  { name: "Russian Federation", dial_code: "+7", code: "RU" },
  { name: "Rwanda", dial_code: "+250", code: "RW" },
  { name: "Saint Barthelemy", dial_code: "+590", code: "BL" },
  { name: "Saint Helena", dial_code: "+290", code: "SH" },
  { name: "Saint Kitts and Nevis", dial_code: "+1869", code: "KN" },
  { name: "Saint Lucia", dial_code: "+1758", code: "LC" },
  { name: "Saint Martin", dial_code: "+590", code: "MF" },
  { name: "Saint Pierre and Miquelon", dial_code: "+508", code: "PM" },
  { name: "Saint Vincent and the Grenadines", dial_code: "+1784", code: "VC" },
  { name: "Samoa", dial_code: "+685", code: "WS" },
  { name: "San Marino", dial_code: "+378", code: "SM" },
  { name: "Sao Tome and Principe", dial_code: "+239", code: "ST" },
  { name: "Saudi Arabia", dial_code: "+966", code: "SA" },
  { name: "Senegal", dial_code: "+221", code: "SN" },
  { name: "Serbia", dial_code: "+381", code: "RS" },
  { name: "Seychelles", dial_code: "+248", code: "SC" },
  { name: "Sierra Leone", dial_code: "+232", code: "SL" },
  { name: "Singapore", dial_code: "+65", code: "SG" },
  { name: "Sint Maarten (Dutch part)", dial_code: "+1721", code: "SX" },
  { name: "Slovakia", dial_code: "+421", code: "SK" },
  { name: "Slovenia", dial_code: "+386", code: "SI" },
  { name: "Solomon Islands", dial_code: "+677", code: "SB" },
  { name: "Somalia", dial_code: "+252", code: "SO" },
  { name: "South Africa", dial_code: "+27", code: "ZA" },
  { name: "South Georgia and the South Sandwich Islands", dial_code: "+500", code: "GS" },
  { name: "South Sudan", dial_code: "+211", code: "SS" },
  { name: "Spain", dial_code: "+34", code: "ES" },
  { name: "Sri Lanka", dial_code: "+94", code: "LK" },
  { name: "Sudan", dial_code: "+249", code: "SD" },
  { name: "Suriname", dial_code: "+597", code: "SR" },
  { name: "Svalbard and Jan Mayen", dial_code: "+47", code: "SJ" },
  { name: "Swaziland", dial_code: "+268", code: "SZ" },
  { name: "Sweden", dial_code: "+46", code: "SE" },
  { name: "Switzerland", dial_code: "+41", code: "CH" },
  { name: "Syrian Arab Republic", dial_code: "+963", code: "SY" },
  { name: "Taiwan", dial_code: "+886", code: "TW" },
  { name: "Tajikistan", dial_code: "+992", code: "TJ" },
  { name: "Tanzania, United Republic of", dial_code: "+255", code: "TZ" },
  { name: "Thailand", dial_code: "+66", code: "TH" },
  { name: "Timor-Leste", dial_code: "+670", code: "TL" },
  { name: "Togo", dial_code: "+228", code: "TG" },
  { name: "Tokelau", dial_code: "+690", code: "TK" },
  { name: "Tonga", dial_code: "+676", code: "TO" },
  { name: "Trinidad and Tobago", dial_code: "+1868", code: "TT" },
  { name: "Tunisia", dial_code: "+216", code: "TN" },
  { name: "Turkey", dial_code: "+90", code: "TR" },
  { name: "Turkmenistan", dial_code: "+993", code: "TM" },
  { name: "Turks and Caicos Islands", dial_code: "+1649", code: "TC" },
  { name: "Tuvalu", dial_code: "+688", code: "TV" },
  { name: "Uganda", dial_code: "+256", code: "UG" },
  { name: "Ukraine", dial_code: "+380", code: "UA" },
  { name: "United Arab Emirates", dial_code: "+971", code: "AE" },
  { name: "United Kingdom", dial_code: "+44", code: "GB" },
  { name: "United States", dial_code: "+1", code: "US" },
  { name: "United States Minor Outlying Islands", dial_code: "+1", code: "UM" },
  { name: "Uruguay", dial_code: "+598", code: "UY" },
  { name: "Uzbekistan", dial_code: "+998", code: "UZ" },
  { name: "Vanuatu", dial_code: "+678", code: "VU" },
  { name: "Venezuela", dial_code: "+58", code: "VE" },
  { name: "Vietnam", dial_code: "+84", code: "VN" },
  { name: "Virgin Islands, British", dial_code: "+1284", code: "VG" },
  { name: "Virgin Islands, U.S.", dial_code: "+1340", code: "VI" },
  { name: "Wallis and Futuna", dial_code: "+681", code: "WF" },
  { name: "Western Sahara", dial_code: "+212", code: "EH" },
  { name: "Yemen", dial_code: "+967", code: "YE" },
  { name: "Zambia", dial_code: "+260", code: "ZM" },
  { name: "Zimbabwe", dial_code: "+263", code: "ZW" }
];

// --- HELPER: GENERATE SESSION UUID ---
const generateSessionId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// --- HELPER: FORMAT NUMBERS (Fixed to 2 decimals) ---
const formatLikes = (num) => {
  if (!num) return 0;
  if (num >= 1000000) {
    return (Math.floor(num / 10000) / 100) + 'm';
  }
  if (num >= 1000) {
    return (Math.floor(num / 10) / 100) + 'k';
  }
  return num;
};

// --- HELPER: STATUS BADGE LOGIC ---
const getStatusStyle = (status) => {
  const s = status.toLowerCase();
  if (s.includes("planning")) return { icon: PenTool, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" };
  if (s.includes("implementing") || s.includes("coding")) return { icon: Code2, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" };
  if (s.includes("progress")) return { icon: Loader2, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20" };
  if (s.includes("almost") || s.includes("testing")) return { icon: SlidersHorizontal, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" };
  if (s.includes("done") || s.includes("completed")) return { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" };
  return { icon: Clock, color: "text-slate-400", bg: "bg-slate-800", border: "border-slate-700" };
};

// --- COMPONENT: SYSTEM STATUS DASHBOARD ---
const SystemStatus = () => {
  const [deployDate, setDeployDate] = useState("INITIALIZING...");

  useEffect(() => {
    // CRASH FIX: We use a safe local date instead of relying on the build variable immediately
    // ensuring the app doesn't break if vite.config.js isn't updated.
    const date = new Date();
    setDeployDate(`${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
      className="fixed z-[45] flex flex-col items-end gap-1 pointer-events-none
        top-4 right-4 
        md:top-20 md:right-8"
    >
      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-full shadow-lg">
        <div className="relative flex items-center justify-center w-2 h-2">
          <span className="absolute w-full h-full bg-green-500 rounded-full animate-ping opacity-75"></span>
          <span className="relative w-1.5 h-1.5 bg-green-500 rounded-full"></span>
        </div>
        <span className="text-[10px] font-mono text-slate-300 tracking-wider">SYSTEM: ONLINE</span>
      </div>
      <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-full">
        <Activity size={10} className="text-slate-500" />
        <span className="text-[10px] font-mono text-slate-500">LAST DEPLOY: {deployDate}</span>
      </div>
    </motion.div>
  );
};

// --- COMPONENT: BOOT SEQUENCE ---
const BootSequence = ({ onComplete }) => {
  const [text, setText] = useState([]);
  
  useEffect(() => {
    const sequence = [
      { text: "> INITIALIZING CORE MODULES...", delay: 200 },
      { text: "> ESTABLISHING SECURE CONNECTION...", delay: 800 },
      { text: "> LOADING ASSETS...", delay: 1400 },
      { text: "> ACCESS GRANTED.", delay: 2000, color: "text-neon-green" }
    ];

    let timeouts = [];

    sequence.forEach((line) => {
      const timeout = setTimeout(() => {
        setText(prev => [...prev, line]);
      }, line.delay);
      timeouts.push(timeout);
    });

    // Failsafe: Ensure completion triggers even if logic lags
    const finishTimeout = setTimeout(() => {
      onComplete();
    }, 3000);
    timeouts.push(finishTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center font-mono text-sm sm:text-base p-8 cursor-pointer"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onClick={onComplete} // Tap to skip feature
    >
      <div className="w-full max-w-md pointer-events-none">
        {text.map((line, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`mb-2 ${line.color || "text-slate-400"}`}
          >
            {line.text}
          </motion.div>
        ))}
        <motion.div 
          animate={{ opacity: [0, 1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-4 bg-neon-green inline-block ml-1 align-middle" 
        />
      </div>
      
      {/* Skip Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 text-[10px] text-slate-600"
      >
        [ TAP ANYWHERE TO SKIP ]
      </motion.div>
    </motion.div>
  );
};

// --- COMPONENT: HOLOGRAPHIC 3D CARD ---
const HoloCard = ({ children, className = "", onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]); // Inverted for tilt effect
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  // Glare position
  const glareX = useTransform(x, [-100, 100], [0, 100]);
  const glareY = useTransform(y, [-100, 100], [0, 100]);

  const handleMove = (clientX, clientY, rect) => {
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const moveX = clientX - centerX;
    const moveY = clientY - centerY;

    // Normalize values roughly between -100 and 100 based on card size
    // 200 is the sensitivity factor
    x.set((moveX / rect.width) * 200);
    y.set((moveY / rect.height) * 200);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, e.clientY, rect);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(touch.clientX, touch.clientY, rect);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 1000 }}
      className={`relative h-full ${className}`}
      onClick={onClick}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-full relative"
        whileHover={{ scale: 1.02 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleLeave}
        onTouchCancel={handleLeave}
      >
        {children}
        
        {/* Holographic Glare Overlay */}
        <motion.div 
          style={{ 
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.1) 0%, transparent 80%)`,
            zIndex: 20
          }}
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </motion.div>
    </motion.div>
  );
};

// --- COMPONENT: LIKE BUTTON (Persistent & Toggleable) ---
const ProjectLikeButton = ({ title }) => {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const likedProjects = JSON.parse(localStorage.getItem('liked_projects') || '[]');
    if (likedProjects.includes(title)) {
      setHasLiked(true);
    }
  }, [title]);

  useEffect(() => {
    const docRef = doc(db, "project_stats", title);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setLikes(doc.data().likes || 0);
      }
    });
    return () => unsubscribe();
  }, [title]);

  const handleLike = async (e) => {
    e.stopPropagation();
    const docRef = doc(db, "project_stats", title);
    let likedProjects = JSON.parse(localStorage.getItem('liked_projects') || '[]');

    try {
      if (hasLiked) {
        setHasLiked(false);
        likedProjects = likedProjects.filter(t => t !== title);
        localStorage.setItem('liked_projects', JSON.stringify(likedProjects));
        await setDoc(docRef, { likes: increment(-1) }, { merge: true });
      } else {
        setHasLiked(true);
        likedProjects.push(title);
        localStorage.setItem('liked_projects', JSON.stringify(likedProjects));
        await setDoc(docRef, { likes: increment(1) }, { merge: true });
      }
    } catch (err) {
      console.error("Like action failed:", err);
    }
  };

  return (
    <button 
      onClick={handleLike} 
      className={`relative z-30 flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded-full transition-all border ${
        hasLiked 
          ? "border-pink-500/50 bg-pink-500/10 text-pink-500" 
          : "border-slate-800 bg-slate-900 text-slate-400 hover:text-pink-400 hover:border-pink-500/30"
      }`}
    >
      <Heart size={14} className={hasLiked ? "fill-pink-500 text-pink-500" : ""} />
      <span>{formatLikes(likes)}</span>
    </button>
  );
};

// --- COMPONENT: COUNTRY SELECTOR ---
const CountrySelector = ({ selectedCode, onChange, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = useMemo(() => {
    if (!search) return allCountries;
    return allCountries.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.dial_code.includes(search)
    );
  }, [search]);

  const selectedCountry = allCountries.find(c => c.dial_code === selectedCode) || allCountries[0];

  return (
    <div className="relative w-32" ref={dropdownRef}>
      <input type="hidden" name={name} value={selectedCountry?.dial_code} />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-blue-500 outline-none transition-colors flex items-center justify-between gap-2"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <img 
            src={`https://flagcdn.com/w20/${selectedCountry?.code.toLowerCase()}.png`} 
            srcSet={`https://flagcdn.com/w40/${selectedCountry?.code.toLowerCase()}.png 2x`}
            width="20" 
            alt={selectedCountry?.code} 
            className="rounded-sm object-cover shrink-0"
          />
          <span className="text-slate-300 truncate">{selectedCountry?.dial_code}</span>
        </div>
        <ChevronDown size={14} className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 mb-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-2 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search country..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-9 pr-3 text-xs text-slate-300 focus:border-neon-green outline-none"
                  autoFocus
                />
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => {
                        onChange(country.dial_code);
                        setIsOpen(false);
                        setSearch("");
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-800 transition-colors text-left ${
                        selectedCountry?.code === country.code ? "bg-slate-800/50" : ""
                      }`}
                    >
                      <img 
                        src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`} 
                        srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                        width="20" 
                        alt={country.name} 
                        className="rounded-sm object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-200 truncate">{country.name}</span>
                          <span className="text-xs text-slate-500 font-mono ml-2">{country.dial_code}</span>
                        </div>
                      </div>
                    </button>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-500">
                  No countries found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- DATA ---
const data = {
  about: {
    bio: "I’m a hobbyist AI developer by passion, fitting projects into whatever free time my busy schedule allows. My journey began with simple curiosity, how technology could be shaped to solve everyday problems. Being extremely picky about details, I often found myself imagining better alternatives, which eventually turned into building my own solutions. This mindset fuels my interest in connecting the digital and physical worlds. To unwind from my hectic routine, I practice origami, which helps refine my focus, precision, and hand control. And yes, somewhere along the way, I also completed a Master’s in Graphic Designing… lol.",
    highlights: [
      { icon: Code2, label: "Full Stack Development", color: "text-blue-400", bg: "bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/20" },
      { icon: Database, label: "IoT Engineering", color: "text-cyan-400", bg: "bg-gradient-to-br from-cyan-500/20 to-transparent border border-cyan-500/20" },
      { icon: Smartphone, label: "Mobile Development", color: "text-blue-500", bg: "bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-600/20" },
      { icon: Origami, label: "Origami", color: "text-pink-400", bg: "bg-gradient-to-br from-pink-500/20 to-transparent border border-pink-500/20" },
      { icon: Plane, label: "Travel Enthusiast", color: "text-orange-400", bg: "bg-gradient-to-br from-orange-500/20 to-transparent border border-orange-500/20" },
      { icon: Target, label: "Problem Solving", color: "text-green-400", bg: "bg-gradient-to-br from-green-500/20 to-transparent border border-green-500/20" },
    ]
  },
  skills: {
    frontend: [
      { name: "Html & CSS", level: 95, color: "from-orange-500 to-red-500", icon: SiHtml5, iconColor: "#E34F26" },
      { name: "JavaScript", level: 95, color: "from-yellow-400 to-yellow-600", icon: SiJavascript, iconColor: "#F7DF1E" },
      { name: "React.js", level: 90, color: "from-cyan-400 to-blue-500", icon: SiReact, iconColor: "#61DAFB" },
      { name: "Tailwind CSS", level: 90, color: "from-cyan-300 to-teal-400", icon: SiTailwindcss, iconColor: "#06B6D4" },
      { name: "TypeScript", level: 85, color: "from-blue-500 to-indigo-600", icon: SiTypescript, iconColor: "#3178C6" },
    ],
    backend: [
      { name: "Firebase", level: 85, color: "from-yellow-500 to-orange-600", icon: SiFirebase, iconColor: "#FFCA28" },
      { name: "Supabase", level: 80, color: "from-green-400 to-emerald-600", icon: SiSupabase, iconColor: "#3ECF8E" },
      { name: "Python", level: 75, color: "from-blue-400 to-indigo-500", icon: SiPython, iconColor: "#3776AB" },
      { name: "Node.js", level: 80, color: "from-green-500 to-emerald-700", icon: SiNodedotjs, iconColor: "#339933" },
      { name: "Express.js", level: 80, color: "from-gray-400 to-gray-600", icon: SiExpress, iconColor: "#ffffff" },
    ],
    iot: [
      { name: "Arduino", level: 85, color: "from-emerald-500 to-teal-600", icon: SiArduino, iconColor: "#00979D" },
      { name: "Raspberry Pi", level: 75, color: "from-pink-500 to-rose-600", icon: SiRaspberrypi, iconColor: "#C51A4A" },
      { name: "Sensors & Actuators", level: 80, color: "from-purple-500 to-violet-600", icon: Cpu, iconColor: "#A78BFA" },
      { name: "Flipper Zero", level: 90, color: "from-orange-500 to-red-600", icon: Radio, iconColor: "#E88C30" },
      { name: "Kode", level: 85, color: "from-indigo-400 to-blue-600", icon: Code2, iconColor: "#818CF8" },
    ],
    tools: [
      { name: "Adobe Suite", level: 95, color: "from-pink-500 to-rose-600", icon: SiAdobecreativecloud, iconColor: "#DA4943" },
      { name: "Video (Pr, Ae)", level: 85, color: "from-purple-500 to-violet-600", icon: Film, iconColor: "#9999FF" },
      { name: "3D & CAD", level: 80, color: "from-blue-500 to-indigo-600", icon: SiAutodesk, iconColor: "#0696D7" },
      { name: "Git/GitHub", level: 90, color: "from-gray-500 to-slate-700", icon: SiGithub, iconColor: "#ffffff" },
      { name: "VS Code", level: 95, color: "from-blue-500 to-cyan-600", icon: VscVscode, iconColor: "#007ACC" },
    ]
  },
  projects: [
    {
      title: "Connect - Link in Bio",
      desc: "Easiest way to connect with me along with my gaming stats for others to play and compete with me.",
      tags: ["HTML", "CSS", "JS", "Gaming", "Social"],
      image: "https://raw.githubusercontent.com/Hawkay002/React-portfolio/main/img/Screenshot_20260118_111726_Chrome.jpg", 
      link: "https://sdconnect.netlify.app/", 
      icon: Link, 
      date: "Jan 18, 2026",
      color: "text-blue-400", 
      bg: "bg-blue-400/10",
      cardBorder: "border-blue-500/20",
      hoverBg: "hover:bg-gradient-to-br hover:from-blue-500/20 hover:via-blue-500/5 hover:to-transparent",
      hoverBorder: "hover:border-blue-400/50",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(96,165,250,0.2)]",
    },
    {
      title: "Rent Invoicing App",
      desc: "Fast and reliable way to create and send rent invoices to tenants.",
      tags: ["Web App", "Offline", "Local Storage"],
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
      link: "https://inv-henna.vercel.app/",
      icon: Receipt,
      date: "Nov 15, 2025", 
      color: "text-green-400", 
      bg: "bg-green-400/10",
      cardBorder: "border-green-500/20",
      hoverBg: "hover:bg-gradient-to-br hover:from-green-500/20 hover:via-green-500/5 hover:to-transparent",
      hoverBorder: "hover:border-green-400/50",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(74,222,128,0.2)]",
    },
    {
      title: "Restaurant POS System",
      desc: "A multifunctional POS System for restaurants to take and serve orders.",
      tags: ["POS", "Management", "Real-time"],
      image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800",
      link: "https://new-pos-ten.vercel.app/",
      icon: Utensils,
      date: "Dec 10, 2025", 
      color: "text-orange-400", 
      bg: "bg-orange-400/10",
      cardBorder: "border-orange-500/20",
      hoverBg: "hover:bg-gradient-to-br hover:from-orange-500/20 hover:via-orange-500/5 hover:to-transparent",
      hoverBorder: "hover:border-orange-400/50",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(251,146,60,0.2)]",
    },
    {
      title: "Birthday & Shagun Bot",
      desc: "User interact first telegram bot for send birthday wish cards along with a shagun if you're lucky.",
      tags: ["Telegram", "Bot", "Automation"],
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800",
      link: "https://t.me/Wish_ind_bot",
      icon: Gift, 
      date: "Oct 09, 2025",
      color: "text-pink-400", 
      bg: "bg-pink-400/10",
      cardBorder: "border-pink-500/20",
      hoverBg: "hover:bg-gradient-to-br hover:from-pink-500/20 hover:via-pink-500/5 hover:to-transparent",
      hoverBorder: "hover:border-pink-400/50",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(244,114,182,0.2)]",
    },
    {
      title: "Unredactor",
      desc: "Unredact any document or image. Works only if the document or file wasn't rescanned after the redaction.",
      tags: ["Python", "Security", "Forensics"],
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
      isDownload: true,
      locked: true,
      link: "https://raw.githubusercontent.com/Hawkay002/React-portfolio/main/docs/unredactor.py-main.zip", 
      icon: Eye,
      date: "Jan 05, 2026", 
      color: "text-red-400", 
      bg: "bg-red-400/10",
      cardBorder: "border-red-500/20",
      hoverBg: "hover:bg-gradient-to-br hover:from-red-500/20 hover:via-red-500/5 hover:to-transparent",
      hoverBorder: "hover:border-red-400/50",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(248,113,113,0.2)]",
    },
    {
      title: "Ransomware",
      desc: "An educational Python tool demonstrating ransomware mechanics, encryption protocols, and data recovery for security research.",
      tags: ["Python", "Encryption", "Security"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      isDownload: true,
      locked: true,
      link: "https://example.com/ransomware_tool.zip", 
      icon: FileLock,
      date: "Jan 27, 2026", 
      color: "text-cyan-400", 
      bg: "bg-cyan-400/10",
      cardBorder: "border-cyan-500/20",
      hoverBg: "hover:bg-gradient-to-br hover:from-cyan-500/20 hover:via-cyan-500/5 hover:to-transparent",
      hoverBorder: "hover:border-cyan-400/50",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]",
    },
    {
      title: "Event Ticketing System",
      desc: "A fast and Reliable source to manage events, issue tickets, check guestlists, and scan entries offline.",
      tags: ["Management", "Admin", "Firestore"],
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
      link: "https://entryticket.netlify.app/",
      icon: Ticket,
      date: "Dec 30, 2025", 
      color: "text-purple-400", 
      bg: "bg-purple-400/10",
      cardBorder: "border-purple-500/20",
      hoverBg: "hover:bg-gradient-to-br hover:from-purple-500/20 hover:via-purple-500/5 hover:to-transparent",
      hoverBorder: "hover:border-purple-400/50",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(192,132,252,0.2)]",
    },
    {
      title: "Portfolio Website",
      desc: "A website to showcase my developer skills as an AI full-stack developer.",
      tags: ["React", "Showcase", "Hobby"],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      link: "https://react-portfolio-nine-wine.vercel.app/#home",
      icon: Globe,
      date: "Jan 27, 2026", 
      color: "text-indigo-400", 
      bg: "bg-indigo-400/10",
      cardBorder: "border-indigo-500/20",
      hoverBg: "hover:bg-gradient-to-br hover:from-indigo-500/20 hover:via-indigo-500/5 hover:to-transparent",
      hoverBorder: "hover:border-indigo-400/50",
      hoverShadow: "hover:shadow-[0_0_20px_rgba(129,140,248,0.2)]",
    }
  ],
  // --- UPDATED ROADMAP WITH SINGLE ENTRY ---
  roadmap: [
    {
      title: "16 Personalities Quiz - Valentines Day Special",
      desc: "A fun, themed personality test to find your perfect match type this Valentine's.",
      eta: "Feb 14, 2026",
      status: "Planning",
      icon: Heart // Icon matches the "Valentines" theme
    },
    {
  title: "16 Personalities Quiz - Valentines Day Special",
  desc: "A fun, themed personality test to find your perfect match type this Valentine's.",
  eta: "Feb 14, 2026",
  status: "Implementing",
  icon: Heart // Icon matches the "Valentines" theme
},
{
  title: "16 Personalities Quiz - Valentines Day Special",
  desc: "A fun, themed personality test to find your perfect match type this Valentine's.",
  eta: "Feb 14, 2026",
  status: "In Progress",
  icon: Heart // Icon matches the "Valentines" theme
},
{
  title: "16 Personalities Quiz - Valentines Day Special",
  desc: "A fun, themed personality test to find your perfect match type this Valentine's.",
  eta: "Feb 14, 2026",
  status: "Testing",
  icon: Heart // Icon matches the "Valentines" theme
},
{
  title: "16 Personalities Quiz - Valentines Day Special",
  desc: "A fun, themed personality test to find your perfect match type this Valentine's.",
  eta: "Feb 14, 2026",
  status: "Done",
  icon: Heart // Icon matches the "Valentines" theme
},
{
  title: "16 Personalities Quiz - Valentines Day Special",
  desc: "A fun, themed personality test to find your perfect match type this Valentine's.",
  eta: "Feb 14, 2026",
  status: "Paused",
  icon: Heart // Icon matches the "Valentines" theme
}
  ],
  education: [
    { title: "Master’s Degree in Criminology", place: "Edinburgh, United Kingdom", status: "96%", icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10" },
    { title: "Master’s Degree in International Relations", place: "Edinburgh, United Kingdom", status: "92%", icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10" },
    { title: "Master’s Degree in Graphic Designing", place: "West Bengal, India", status: "96%", icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10" },
    { title: "Master’s Degree in Computer Science", place: "Delhi, India", status: "90%", icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10" },
    { title: "Bachelor's Degree in Business Administration", place: "West Bengal, India", status: "85%", icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10" },
    { title: "Bachelor's Degree in Science", place: "West Bengal, India", status: "88%", icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10" },
    { title: "Bachelor's Degree in Commerce", place: "West Bengal, India", status: "95%", icon: GraduationCap, color: "text-green-400", bg: "bg-green-400/10" },
    { title: "Higher Secondary (WBCHSE)", place: "West Bengal, India", status: "92%", icon: BookOpen, color: "text-green-400", bg: "bg-green-400/10" },
    { title: "Secondary (WBBSE)", place: "West Bengal, India", status: "87%", icon: BookOpen, color: "text-green-400", bg: "bg-green-400/10" },
  ]
};

// --- HELPER COMPONENTS ---

const Typewriter = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let i = 0; 
    setDisplayText('');
    const timer = setInterval(() => { 
      if (i < text.length) { 
        setDisplayText(text.substring(0, i + 1)); 
        i++; 
      } else { 
        clearInterval(timer); 
      } 
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return <span className="inline-block">{displayText}<span className="animate-blink ml-1">|</span></span>;
};

const ScaleRevealCard = ({ children, delay = 0 }) => (
  <motion.div 
    initial={{ scale: 0.5, opacity: 0 }} 
    whileInView={{ scale: 1, opacity: 1 }} 
    viewport={{ once: true }} 
    transition={{ duration: 0.5, delay: delay, type: "spring", stiffness: 60 }}
  >
    {children}
  </motion.div>
);

const RevealCard = ({ children, delay = 0, className = "", direction = "bottom" }) => {
  const variants = { 
    hidden: { opacity: 0, y: direction === "bottom" ? 50 : 0, x: direction === "left" ? -75 : direction === "right" ? 75 : 0 }, 
    visible: { opacity: 1, y: 0, x: 0 } 
  };
  return (
    <motion.div 
      variants={variants} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-50px" }} 
      transition={{ duration: 0.6, delay: delay, type: "spring", stiffness: 40 }} 
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AnimatedCounter = ({ value, color }) => (
  <div className="relative h-4 overflow-hidden inline-flex items-center justify-center">
    <span className="invisible font-mono text-[10px] px-px">{value}</span>
    <AnimatePresence mode="popLayout">
      <motion.span 
        key={value} 
        initial={{ y: -15, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        exit={{ y: 15, opacity: 0 }} 
        transition={{ duration: 0.3, ease: "easeOut" }} 
        className={`absolute font-mono text-[10px] ${color} left-0 right-0 text-center`}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  </div>
);

const SectionTitle = ({ subtitle, title }) => (
  <div className="flex flex-col items-center mb-12 mt-20">
    <span className="text-neon-green text-lg font-mono mb-2">{'>'} {subtitle}</span>
    <h2 className="text-3xl font-bold text-white relative inline-block">
      {title}
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-neon-green rounded-full"></span>
    </h2>
  </div>
);

const Card = ({ children, className = "", style }) => (
  <div style={style} className={`bg-card-bg rounded-2xl border border-white/5 p-6 glow-card transition-all duration-300 ${className}`}>
    {children}
  </div>
);

// --- COMPONENT: PROGRESS BAR ---
const ProgressBar = ({ name, level, color, icon: Icon, iconColor }) => (
  <div className="mb-5 last:mb-0">
    <div className="flex justify-between items-end mb-2">
      <div className="flex items-center gap-2">
        {Icon && (
          <div className="p-1.5 rounded-md bg-white/5 border border-white/5 shadow-sm">
            <Icon size={16} style={{ color: iconColor }} />
          </div>
        )}
        <span className="text-sm font-medium text-slate-200">{name}</span>
      </div>
      <span className="text-xs text-slate-400 font-mono">{level}%</span>
    </div>
    <div className="w-full bg-slate-800 rounded-full h-3 relative overflow-hidden">
      <motion.div 
        initial={{ width: 0 }} 
        whileInView={{ width: `${level}%` }} 
        viewport={{ once: true }} 
        transition={{ duration: 1.5, ease: "easeOut" }} 
        className={`h-full rounded-full absolute top-0 left-0 bg-gradient-to-r ${color} relative overflow-hidden`}
      >
        <div 
          className="absolute inset-0 w-full h-full opacity-30 animate-[progress-stripes_1s_linear_infinite]" 
          style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }}
        ></div>
        
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/40 animate-[bubble-rise_3s_infinite_ease-in]"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              bottom: '-5px',
              animationDelay: Math.random() * 2 + 's',
              animationDuration: Math.random() * 2 + 2 + 's'
            }}
          />
        ))}
      </motion.div>
    </div>
  </div>
);

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const isManualScroll = useRef(false);
  
  const navLinks = [
    { name: 'Home', href: '#home' }, 
    { name: 'About', href: '#about' }, 
    { name: 'Skills', href: '#skills' }, 
    { name: 'Projects', href: '#projects' }, 
    { name: 'Education', href: '#education' }, 
    { name: 'Contact', href: '#contact' }
  ];
  
  const mobileDockItems = [
    { id: 'home', icon: Home, href: '#home' }, 
    { id: 'about', icon: User, href: '#about' }, 
    { id: 'skills', icon: Cpu, href: '#skills' }, 
    { id: 'projects', icon: Briefcase, href: '#projects' }, 
    { id: 'education', icon: GraduationCap, href: '#education' }, 
    { id: 'contact', icon: Mail, href: '#contact' }
  ];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const targetId = id.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      isManualScroll.current = true;
      setActiveTab(targetId);
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top; 
      const elementRect = element.getBoundingClientRect().top; 
      const elementPosition = elementRect - bodyRect; 
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      history.pushState(null, null, id);
      setTimeout(() => { isManualScroll.current = false; }, 1000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isManualScroll.current) return;
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 300;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) { 
          const { offsetTop, offsetHeight } = element; 
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="hidden md:flex fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10 shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center gap-2">
              <div className="bg-neon-green/20 p-1.5 rounded-lg"><Code2 className="text-neon-green w-5 h-5" /></div>
              <span className="text-xl font-bold bg-gradient-to-r from-neon-green to-cyan-400 bg-clip-text text-transparent">Shovith.dev</span>
            </a>
          </div>
          <div className="ml-10 flex items-baseline space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => scrollToSection(e, link.href)} 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === link.href.replace('#', '') ? 'text-neon-green bg-white/5' : 'text-gray-300 hover:text-neon-green hover:bg-white/5'}`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
      
      <div className="md:hidden fixed top-5 left-5 z-40 bg-black/20 backdrop-blur-sm p-2 rounded-xl border border-white/5 flex items-center gap-2">
        <Code2 className="text-neon-green w-5 h-5" />
        <span className="text-sm font-bold bg-gradient-to-r from-neon-green to-cyan-400 bg-clip-text text-transparent">Shovith.dev</span>
      </div>
      
      <div className="md:hidden fixed bottom-12 inset-x-0 flex justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-1.5 shadow-2xl flex items-center gap-5">
          {mobileDockItems.map((item) => { 
            const isActive = activeTab === item.id; 
            return (
              <a 
                key={item.id} 
                href={item.href} 
                onClick={(e) => scrollToSection(e, item.href)} 
                className={`relative p-2 rounded-full transition-colors duration-300 flex items-center justify-center ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              >
                {isActive && (
                  <motion.div layoutId="active-dock-pill" className="absolute inset-0 bg-slate-800 rounded-full" transition={{ type: "spring", bounce: 0, duration: 0.6 }} />
                )}
                {isActive && (
                  <motion.div layoutId="active-dock-indicator" className="absolute -bottom-1.5 w-6 h-1.5 bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.4)] z-20" style={{ clipPath: 'polygon(0% 100%, 100% 100%, 75% 0%, 25% 0%)' }} transition={{ type: "spring", bounce: 0, duration: 0.6 }} />
                )}
                <span className="relative z-10">
                  <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                </span>
              </a>
            ); 
          })}
        </div>
      </div>
    </>
  );
};

// --- MAIN APP COMPONENT ---
function App() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showBootSequence, setShowBootSequence] = useState(true);
  const profileImage = "https://raw.githubusercontent.com/Hawkay002/React-portfolio/d6f210fd03713af59270c31f4872d7d3001cd418/img/Picsart_26-01-18_00-00-17-928.png"; 

  // Contact Form States
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTelegram, setIsTelegram] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91"); 
  const [dbQuota, setDbQuota] = useState(6); 

  // --- TELEGRAM OTP STATES ---
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [verificationStep, setVerificationStep] = useState(1);
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // --- NEW STATE: CATEGORY FILTER ---
  const [activeCategory, setActiveCategory] = useState("All");

  // --- QUOTA MANAGEMENT ---
  useEffect(() => {
    const fetchQuota = async () => {
      try {
        const docRef = doc(db, "stats", "email_quota");
        const docSnap = await getDoc(docRef);
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.month !== currentMonth || data.year !== currentYear) {
            await updateDoc(docRef, { count: 0, month: currentMonth, year: currentYear });
            setDbQuota(0);
          } else {
            setDbQuota(data.count);
          }
        } else {
          await setDoc(docRef, { count: 6, month: currentMonth, year: currentYear });
          setDbQuota(6);
        }
      } catch (error) { 
        console.error("Quota Error:", error); 
      }
    };
    fetchQuota();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // --- UNIVERSAL SECURE DOWNLOAD LOGIC ---
  const handleDownloadClick = (project) => {
    if (project.locked) {
      setCurrentProject(project);
      setIsOtpModalOpen(true);
      setVerificationStep(1); 
      setOtpCode("");
      setOtpError("");
    } else {
      window.open(project.link, '_blank');
    }
  };

  // --- TELEGRAM VERIFICATION LOGIC ---
  const handleStartVerification = () => {
    let sessionId = localStorage.getItem('secure_download_session_id');
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem('secure_download_session_id', sessionId);
    }
    const botUrl = `https://t.me/${BOT_USERNAME}?start=${sessionId}`;
    window.open(botUrl, '_blank');
    setVerificationStep(2);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!otpCode) return;
    setIsVerifying(true);
    setOtpError("");

    const sessionId = localStorage.getItem('secure_download_session_id');
    if (!sessionId) {
      setOtpError("Session expired. Please start again.");
      setIsVerifying(false);
      return;
    }

    try {
      const docRef = doc(db, "otp_sessions", sessionId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.otp === otpCode.trim()) {
          
          await addDoc(collection(db, "verified_downloads"), {
            telegram_id: data.telegram_id,
            telegram_name: data.telegram_name || "Unknown",
            telegram_username: data.telegram_username || "None",
            phone_number: data.phone_number || "Not Shared",
            project: currentProject.title,
            timestamp: serverTimestamp()
          });

          showNotification(`Verification Successful! Downloading ${currentProject.title}...`, "success");
          const link = document.createElement('a');
          link.href = currentProject.link;
          link.download = currentProject.title;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          await deleteDoc(docRef);
          localStorage.removeItem('secure_download_session_id');
          setIsOtpModalOpen(false);
        } else {
          setOtpError("Incorrect code. Check your Telegram.");
        }
      } else {
        setOtpError("Session not found. Please click 'Verify via Telegram' again.");
      }
    } catch (error) {
      console.error("Verify Error:", error);
      setOtpError("System error. Try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = `${formData.get("countryCode")} ${formData.get("phone")}`;
    const message = formData.get("message");

    try {
      if (isTelegram) {
        if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
           showNotification("Error: Missing Telegram Config.", 'error'); 
           setIsSubmitting(false); 
           return;
        }
const text = `
📩 *New Message Reveived from Portfolio Contact form*
👤 *Name:* ${firstName} ${lastName}
📧 *Email:* ${email}
📱 *Phone:* ${phone}
📝 *Message:* ${message}
        `;
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST", 
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: "Markdown" })
        });
        if (await response.json().then(d => d.ok)) { 
          showNotification("Message sent!"); 
          event.target.reset(); 
        } else { 
          showNotification("Failed to send.", 'error'); 
        }
      } else {
        if (!WEB3FORMS_KEY) { 
          showNotification("Error: Missing Web3Forms Key.", 'error'); 
          setIsSubmitting(false); 
          return; 
        }
        if (dbQuota >= 250) { 
          showNotification("Monthly limit reached. Use Telegram.", 'error'); 
          setIsSubmitting(false); 
          return; 
        }
        formData.append("access_key", WEB3FORMS_KEY); 
        formData.append("name", `${firstName} ${lastName}`); 
        formData.append("phone", phone);
        const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
        const data = await response.json();
        if (data.success) {
          showNotification("Message sent!");
          await updateDoc(doc(db, "stats", "email_quota"), { count: increment(1) });
          setDbQuota(prev => prev + 1);
          event.target.reset();
        } else { 
          showNotification(data.message || "Error.", 'error'); 
        }
      }
    } catch (error) { 
      console.error(error); 
      showNotification("Error occurred.", 'error'); 
    } finally { 
      setIsSubmitting(false); 
    }
  };

  // --- FILTER LOGIC ---
  const categories = ["All", "Web Dev", "Python & AI", "IoT & Hardware", "Security"];
  
  const filteredProjects = useMemo(() => {
    return data.projects.filter(project => {
      if (activeCategory === "All") return true;
      if (activeCategory === "Web Dev") return project.tags.includes("React") || project.tags.includes("HTML") || project.tags.includes("CSS");
      if (activeCategory === "Python & AI") return project.tags.includes("Python") || project.tags.includes("Bot");
      if (activeCategory === "IoT & Hardware") return project.tags.includes("IoT");
      if (activeCategory === "Security") return project.tags.includes("Security") || project.tags.includes("Forensics") || project.tags.includes("Encryption");
      return false;
    });
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-app-bg text-slate-200 font-sans selection:bg-neon-green selection:text-black overflow-x-hidden">
      <style>{`
        @keyframes progress-stripes { 
          from { background-position: 1rem 0; } 
          to { background-position: 0 0; } 
        } 
        @keyframes bubble-rise { 
          0% { transform: translateY(0); opacity: 0; } 
          50% { opacity: 1; } 
          100% { transform: translateY(-20px); opacity: 0; } 
        } 
        .perspective-1000 { perspective: 1000px; } 
        .transform-style-3d { transform-style: preserve-3d; } 
        .backface-hidden { backface-visibility: hidden; } 
        .rotate-y-180 { transform: rotateY(180deg); } 
        .scrollbar-thin::-webkit-scrollbar { width: 4px; } 
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; } 
        .scrollbar-thin::-webkit-scrollbar-thumb { background-color: #334155; border-radius: 20px; }
      `}</style>

      {/* --- BOOT SEQUENCE --- */}
      <AnimatePresence>
        {showBootSequence && <BootSequence onComplete={() => setShowBootSequence(false)} />}
      </AnimatePresence>

      {/* --- SYSTEM STATUS DASHBOARD --- */}
      <SystemStatus />

      {/* --- OTP MODAL --- */}
      <AnimatePresence>
        {isOtpModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md relative shadow-2xl"
            >
              <button onClick={() => setIsOtpModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={20} /></button>

              <div className="flex flex-col items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
                  <ShieldCheck className="text-blue-500 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Security Verification</h3>
                <p className="text-sm text-slate-400 text-center mt-2">
                  To download <strong className="text-white">{currentProject?.title}</strong>, please verify your identity via Telegram.
                </p>
              </div>

              {verificationStep === 1 ? (
                <div className="space-y-4">
                  <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-sm text-slate-300">
                    <p className="mb-2"><strong className="text-neon-green">Step 1:</strong> Click the button below.</p>
                    <p className="mb-2"><strong className="text-neon-green">Step 2:</strong> Press <strong>Start</strong> in the Telegram Bot.</p>
                    <p className="mb-2"><strong className="text-neon-green">Step 3:</strong> Tap <strong>"Share Phone Number"</strong> when asked.</p>
                    <p><strong className="text-neon-green">Step 4:</strong> The bot will send you a code.</p>
                  </div>
                  <button 
                    onClick={handleStartVerification} 
                    className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={18} /> Verify via Telegram
                  </button>
                </div>
              ) : (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 ml-1">Enter 6-Digit Code</label>
                    <div className="relative mt-1">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                      <input 
                        type="text" 
                        required 
                        value={otpCode} 
                        onChange={(e) => setOtpCode(e.target.value)} 
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 pl-10 pr-3 text-sm focus:border-neon-green outline-none tracking-widest text-center text-lg" 
                        placeholder="××××××" 
                        autoFocus 
                      />
                    </div>
                  </div>
                  {otpError && <p className="text-red-500 text-xs text-center animate-pulse">{otpError}</p>}
                  <button 
                    type="submit" 
                    disabled={isVerifying} 
                    className="w-full py-3 bg-neon-green text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isVerifying ? <Loader2 className="animate-spin w-5 h-5" /> : "Unlock Download"}
                  </button>
                  <button type="button" onClick={() => setVerificationStep(1)} className="w-full text-xs text-slate-500 hover:text-slate-300 underline">Restart Verification</button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isProfileOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" 
            onClick={() => setIsProfileOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.8 }} 
              animate={{ scale: 1 }} 
              exit={{ scale: 0.8 }} 
              className="relative max-w-2xl w-full" 
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setIsProfileOpen(false)} className="absolute -top-12 right-0 p-2 text-white hover:text-neon-green"><X size={32} /></button>
              <img src={profileImage} alt="Profile" className="w-full h-auto rounded-2xl border border-neon-green/30 shadow-[0_0_50px_rgba(16,185,129,0.3)]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -50 }} 
            className="fixed top-5 left-0 right-0 mx-auto w-fit z-[70] flex items-center gap-3 bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-2xl"
          >
            {notification.type === 'success' ? <CheckCircle2 className="text-green-500" /> : <AlertCircle className="text-red-500" />}
            <p className="text-sm font-medium text-white">{notification.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      <main className="max-w-md mx-auto px-5 pt-28 pb-32 md:pb-20">
        
        {/* --- HERO --- */}
        <section id="home" className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="relative w-32 h-32 mb-8 group cursor-pointer" 
            onClick={() => setIsProfileOpen(true)}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-neon-green to-cyan-400 animate-spin-slow blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-1 rounded-full overflow-hidden z-10 relative">
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="text-neon-green w-8 h-8" />
              </div>
            </div>
          </motion.div>
          <RevealCard>
            <h1 className="text-4xl font-bold text-white mb-3">Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-cyan-400">Shovith</span></h1>
            <div className="text-lg text-slate-300 mb-6 flex items-center justify-center gap-2 h-8">
              <Typewriter text="Hobbyist Full Stack Developer & IoT Engineer" />
            </div>
          </RevealCard>
          <RevealCard delay={0.1}>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 px-2">Passionate about creating innovative digital solutions with modern technologies. Currently on active duty under IDS HQ as JOO for India's MoD.</p>
          </RevealCard>
          <RevealCard delay={0.2} className="flex flex-col w-full gap-4">
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} 
              className="w-full py-3.5 bg-gradient-to-r from-neon-green to-teal-500 rounded-full text-black font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:opacity-90 transition-opacity"
            >
              Get In Touch
            </button>
            <div className="flex justify-center gap-4">
              <a href="mailto:shovith2@gmail.com" className="p-3 rounded-full bg-slate-900 border border-slate-800 text-neon-green hover:bg-slate-800 transition-colors"><Mail size={20} /></a>
              <a href="https://t.me/X_o_x_o_002" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-slate-900 border border-slate-800 text-neon-green hover:bg-slate-800 transition-colors"><Send size={20} /></a>
            </div>
          </RevealCard>
        </section>

        {/* --- ABOUT --- */}
        <section id="about">
          <SectionTitle subtitle="" title="about_me" />
          <RevealCard className="mb-8">
            <Card>
              <div className="flex gap-1.5 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <p className="text-slate-300 text-sm leading-7">{data.about.bio}</p>
            </Card>
          </RevealCard>
          <div className="grid grid-cols-2 gap-3">
            {data.about.highlights.map((item, idx) => (
              <ScaleRevealCard key={idx} delay={idx * 0.1}>
                <Card className="flex flex-col items-center justify-center p-4 h-full text-center hover:bg-slate-900/80">
                  <div className={`p-3 rounded-xl mb-3 border ${item.bg} ${item.color}`}>
                    <item.icon size={22} />
                  </div>
                  <span className="text-xs font-medium text-slate-300">{item.label}</span>
                </Card>
              </ScaleRevealCard>
            ))}
          </div>
          <RevealCard className="mt-8">
            <Card className="flex flex-col items-center justify-center py-8 relative">
              <div className="mb-6 relative w-24 h-24 flex items-center justify-center">
                <div className="absolute -top-3 -right-5 z-20 w-16 h-24 pointer-events-none">
                  <div className="absolute top-3 right-4 w-5 h-5 rounded-full bg-zinc-800 border border-zinc-600 shadow-xl flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full"></div>
                  </div>
                  <div className="absolute top-5 right-6 w-1.5 h-14 bg-zinc-700 origin-top rotate-[25deg] rounded-full border-r border-zinc-600/50 shadow-lg">
                    <div className="absolute bottom-0 -left-1 w-3.5 h-5 bg-zinc-800 rounded-sm border border-zinc-600 flex justify-center">
                      <div className="w-0.5 h-full bg-zinc-900/50"></div>
                    </div>
                  </div>
                </div>
                <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center animate-[spin_3s_linear_infinite] shadow-lg relative z-10">
                  <div className="absolute inset-1 rounded-full border border-zinc-800 opacity-50"></div>
                  <div className="absolute inset-3 rounded-full border border-zinc-800 opacity-50"></div>
                  <div className="absolute inset-5 rounded-full border border-zinc-800 opacity-50"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center z-10">
                    <Music size={14} className="text-white" />
                  </div>
                </div>
              </div>
              <p className="font-mono text-xs sm:text-sm text-slate-300 leading-6 max-w-xs text-center">"Music and programming share the same foundation - patterns, rhythm, and harmony."</p>
            </Card>
          </RevealCard>
        </section>

        {/* --- SKILLS --- */}
        <section id="skills">
          <SectionTitle subtitle="" title="technical_skills" />
          <div className="space-y-4">
            <RevealCard>
              <Card>
                <h3 className="text-lg font-bold text-neon-green mb-4">Frontend</h3>
                {data.skills.frontend.map((s, i) => <ProgressBar key={i} {...s} />)}
              </Card>
            </RevealCard>
            <RevealCard>
              <Card>
                <h3 className="text-lg font-bold text-neon-green mb-4">Backend</h3>
                {data.skills.backend.map((s, i) => <ProgressBar key={i} {...s} />)}
              </Card>
            </RevealCard>
            <RevealCard>
              <Card>
                <h3 className="text-lg font-bold text-neon-green mb-4">IoT & Hardware</h3>
                {data.skills.iot.map((s, i) => <ProgressBar key={i} {...s} />)}
              </Card>
            </RevealCard>
            <RevealCard>
              <Card>
                <h3 className="text-lg font-bold text-neon-green mb-4">Tools & Others</h3>
                {data.skills.tools.map((s, i) => <ProgressBar key={i} {...s} />)}
              </Card>
            </RevealCard>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["React", "Node.js", "TypeScript", "Arduino", "Firebase", "Supabase", "IoT", "Flipper Zero", "Adobe", "3D Modeling"].map((tag, i) => (
              <motion.span 
                key={i} 
                initial={{ opacity: 0, scale: 0.5 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }} 
                className="px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 text-xs text-neon-green font-mono cursor-default hover:border-neon-green hover:shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </section>

        {/* --- PROJECTS --- */}
        <section id="projects">
          <SectionTitle subtitle="" title="featured_projects" />
          
          {/* CATEGORY TABS */}
          <div className="flex justify-center mb-8 flex-wrap gap-2 px-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  activeCategory === cat 
                    ? "bg-neon-green text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <RevealCard key={project.title} direction={idx % 2 === 0 ? "left" : "right"}>
                  <HoloCard>
                    <Card className={`group relative overflow-hidden transition-all duration-300 h-full ${project.cardBorder} ${project.hoverBg} ${project.hoverBorder} ${project.hoverShadow}`}>
                      <div className="h-40 w-[calc(100%+3rem)] -mx-6 -mt-6 mb-6 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-gradient-to-t from-card-bg to-transparent opacity-60"></div>
                      </div>
                      
                      <div className="flex justify-between items-start mb-4 relative z-30">
                        <div className={`p-3 rounded-xl inline-block ${project.bg} ${project.color}`}>
                          <project.icon size={24} />
                        </div>
                        <ProjectLikeButton title={project.title} />
                      </div>

                      <div className="flex justify-between items-center mb-3 relative z-30">
                        <h3 className={`font-bold text-lg text-white group-hover:${project.color.split(' ')[0]} transition-colors`}>{project.title}</h3>
                        {project.isDownload ? (
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleDownloadClick(project); }} 
                            className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-white group-hover:border-white/20 transition-colors cursor-pointer"
                          >
                            {project.locked ? <Lock size={16} className="text-red-400" /> : <Download size={16} />}
                          </button>
                        ) : (
                          <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-white group-hover:border-white/20 transition-colors cursor-pointer">
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 mb-5 leading-relaxed relative z-30">{project.desc}</p>
                      <div className="flex flex-wrap gap-2 relative z-30 mb-4">
                        {project.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-white/30 transition-colors">{tag}</span>
                        ))}
                      </div>

                      {/* Published Date Display */}
                      <div className="flex items-center gap-1.5 pt-4 border-t border-white/5 relative z-30">
                        <Calendar size={12} className="text-slate-500" />
                        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Published on: {project.date}</span>
                      </div>
                    </Card>
                  </HoloCard>
                </RevealCard>
              ))}
            </AnimatePresence>
          </div>

          {/* --- FUTURE ROADMAP (UPDATED) --- */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-slate-900/50 -skew-y-3 transform origin-left w-full h-full -z-10 rounded-3xl" />
            <h3 className="text-center text-xl font-bold text-slate-300 mb-8 flex items-center justify-center gap-2">
              <Zap className="text-yellow-400" /> Future Roadmap
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {data.roadmap.map((item, idx) => {
                // Get style based on status string
                const badgeStyle = getStatusStyle(item.status);
                const BadgeIcon = badgeStyle.icon;

                return (
                  <div key={idx} className="bg-slate-950 border border-dashed border-slate-700 p-5 rounded-2xl opacity-70 hover:opacity-100 transition-opacity">
                    <div className="flex justify-between items-start mb-3">
                      {/* Dynamic Project Icon */}
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-slate-200">
                        <item.icon size={20}/>
                      </div>
                      
                      {/* Status Badge */}
                      <div className={`flex items-center gap-1.5 px-2 py-1 rounded border ${badgeStyle.bg} ${badgeStyle.border} ${badgeStyle.color}`}>
                        <BadgeIcon size={12} />
                        <span className="text-[10px] uppercase font-bold tracking-wider">{item.status}</span>
                      </div>
                    </div>
                    <h4 className="font-bold text-slate-200 mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 mb-3">{item.desc}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <Clock size={12} /> ETA: {item.eta}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- EDUCATION --- */}
        <section id="education">
          <SectionTitle subtitle="" title="education_achievements" />
          <div className="space-y-4">
            {data.education.map((edu, idx) => (
              <RevealCard key={idx}>
                <Card className="flex gap-4 items-center">
                  <div className={`shrink-0 p-3 rounded-xl ${edu.bg} ${edu.color}`}>
                    <edu.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base text-white">{edu.title}</h3>
                    <p className="text-sm text-slate-400 mt-0.5">{edu.place}</p>
                    <span className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${edu.bg} ${edu.color}`}>{edu.status}</span>
                  </div>
                </Card>
              </RevealCard>
            ))}
          </div>
        </section>

        {/* --- CONTACT --- */}
        <section id="contact">
          <SectionTitle subtitle="" title="get_in_touch" />
          <div className="space-y-3 mb-10">
            <RevealCard delay={0.1}>
              <Card className="flex items-center gap-4 py-4">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-neon-green">
                  <MapPin size={18} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-slate-500 mb-0.5">Location</p>
                  <p className="text-sm font-medium text-white truncate">Based in India</p>
                </div>
              </Card>
            </RevealCard>
          </div>

          <RevealCard>
            <div className="flex justify-center mb-6">
              <div 
                className="bg-slate-900 p-1 rounded-full border border-slate-800 flex relative w-64 cursor-pointer" 
                onClick={() => { setIsTelegram(!isTelegram); setNotification(null); }}
              >
                <motion.div 
                  className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-neon-green/20 rounded-full border border-neon-green/50" 
                  animate={{ left: isTelegram ? '50%' : '4px' }} 
                  transition={{ type: "spring", stiffness: 300, damping: 30 }} 
                />
                <button className={`flex-1 py-2 text-xs font-bold text-center z-10 transition-colors ${!isTelegram ? 'text-neon-green' : 'text-slate-400'}`}>Send Email</button>
                <button className={`flex-1 py-2 text-xs font-bold text-center z-10 transition-colors ${isTelegram ? 'text-neon-green' : 'text-slate-400'}`}>Direct Message</button>
              </div>
            </div>

            <div className="relative perspective-1000 h-[550px] md:h-[600px]">
              <motion.div 
                animate={{ rotateY: isTelegram ? 180 : 0 }} 
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }} 
                className="relative w-full h-full transform-style-3d"
              >
                
                {/* FRONT (WEB3FORMS) */}
                <Card className="border-t-4 border-t-neon-green absolute w-full h-full backface-hidden">
                   <div className="flex justify-between items-start mb-6">
                     <h3 className="text-lg font-bold text-neon-green flex items-center gap-2"><Mail size={20}/> Send Email</h3>
                     <div className="group relative">
                       <div className="px-2 py-1 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-400 cursor-help flex items-center gap-1">
                         <span>Limit: </span>
                         <AnimatedCounter value={dbQuota} color={dbQuota >= 250 ? "text-red-500" : "text-neon-green"} />
                         <span>/250</span>
                       </div>
                     </div>
                   </div>
                   <form onSubmit={onSubmit} className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                       <div><label className="text-xs text-slate-400 ml-1">First Name</label><input required name="firstName" type="text" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-neon-green outline-none transition-colors placeholder:text-slate-600" placeholder="John" /></div>
                       <div><label className="text-xs text-slate-400 ml-1">Last Name</label><input required name="lastName" type="text" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-neon-green outline-none transition-colors placeholder:text-slate-600" placeholder="Doe" /></div>
                     </div>
                     <div><label className="text-xs text-slate-400 ml-1">Email</label><input required name="email" type="email" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-blue-500 outline-none transition-colors placeholder:text-slate-600" placeholder="john@example.com" /></div>
                     <div>
                       <label className="text-xs text-slate-400 ml-1">Phone Number</label>
                       <div className="flex gap-2 mt-1">
                         <CountrySelector name="countryCode" selectedCode={selectedCountryCode} onChange={setSelectedCountryCode} />
                         <input required name="phone" type="tel" className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-blue-500 outline-none transition-colors placeholder:text-slate-600" placeholder="9876543210" />
                       </div>
                     </div>
                     <div><label className="text-xs text-slate-400 ml-1">Message</label><textarea required name="message" rows={3} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-blue-500 outline-none transition-colors placeholder:text-slate-600" placeholder="Your message..." /></div>
                     <button type="submit" disabled={isSubmitting || dbQuota >= 250} className="w-full py-3 bg-neon-green text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                       {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Sending...</> : "Send Email"}
                     </button>
                   </form>
                </Card>

                {/* BACK (TELEGRAM) */}
                <Card className="border-t-4 border-t-blue-500 absolute w-full h-full backface-hidden rotate-y-180" style={{ transform: "rotateY(180deg)" }}>
                   <div className="flex justify-between items-start mb-6">
                     <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2"><Send size={20}/> Direct Message</h3>
                     <div className="group relative">
                       <div className="px-2 py-1 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-400 cursor-help flex items-center gap-1">
                         <span>Limit: </span><Infinity size={12} className="text-blue-400" />
                       </div>
                     </div>
                   </div>
                   <form onSubmit={onSubmit} className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                       <div><label className="text-xs text-slate-400 ml-1">First Name</label><input required name="firstName" type="text" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-blue-500 outline-none transition-colors placeholder:text-slate-600" placeholder="Jane" /></div>
                       <div><label className="text-xs text-slate-400 ml-1">Last Name</label><input required name="lastName" type="text" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-blue-500 outline-none transition-colors placeholder:text-slate-600" placeholder="Doe" /></div>
                     </div>
                     <div><label className="text-xs text-slate-400 ml-1">Email</label><input required name="email" type="email" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-blue-500 outline-none transition-colors placeholder:text-slate-600" placeholder="jane@example.com" /></div>
                     <div>
                       <label className="text-xs text-slate-400 ml-1">Phone Number</label>
                       <div className="flex gap-2 mt-1">
                         <CountrySelector name="countryCode" selectedCode={selectedCountryCode} onChange={setSelectedCountryCode} />
                         <input required name="phone" type="tel" className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-blue-500 outline-none transition-colors placeholder:text-slate-600" placeholder="9876543210" />
                       </div>
                     </div>
                     <div><label className="text-xs text-slate-400 ml-1">Message</label><textarea required name="message" rows={3} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:border-blue-500 outline-none transition-colors placeholder:text-slate-600" placeholder="Your message..." /></div>
                     <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                       {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Sending...</> : "Send"}
                     </button>
                   </form>
                </Card>
              </motion.div>
            </div>
          </RevealCard>
        </section>
      </main>

      <footer className="py-8 text-center text-xs text-slate-600 border-t border-slate-900">
        <p>© 2025 Shovith Debnath. Crafted with <span className="text-red-500">♥</span> and React.js</p>
      </footer>
    </div>
  )
}

export default App;
