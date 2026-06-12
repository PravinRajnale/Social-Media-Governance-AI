import { useState, useMemo, useRef, useEffect  } from "react";
import { ExternalLink } from "lucide-react";
import {
  BadgeCheck,     // Taken Down
  CircleOff,      // No Action
  Gavel, 
  ChevronDown,
} from "lucide-react";
import { fontString } from "chart.js/helpers";

function downloadCSV(data, filename) {
  if (!data?.length) return;
  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((h) => {
      const val = row[h] ?? "";
      const str = String(val);
      return str.includes(",") || str.includes('"') || str.includes("\n")
        ? `"${str.replace(/"/g, '""')}"`
        : str;
    }).join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `${filename}.csv`; a.click();
  URL.revokeObjectURL(url);
}

export const INCIDENTS_INITIAL = [
  {
    id: "279298841",
    date: "2026-02-27",
    brand: "Air India",
    platform: "Quora",
    category: "Fake Customer Care No",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-Customer-Care-Number-1/How-will-I-get-the-refund-of-my-air-ticket-Air-India-customer-care-number-938296-1470-booked-during-the-lockdown-p",
    contactNo: "9382961470",
    trademarkUsed: "Brand Name",
    handleName: "Air India Customer Care Number",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279236957",
    date: "2026-02-27",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/EDI-AIR-INDIA",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "EDI AIR INDIA",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298851",
    date: "2026-02-27",
    brand: "Air India",
    platform: "Quora",
    category: "Fake Customer Care No",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-Customer-Care-Number-1",
    contactNo: "9777174197",
    trademarkUsed: "Brand Name",
    handleName: "Air India Customer Care Number",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279236981",
    date: "2026-02-27",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-Flyer",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India Flyer",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279298844",
    date: "2026-02-27",
    brand: "Air India",
    platform: "Reddit",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.reddit.com/user/Airindia001/",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "u/Airindia001",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279297491",
    date: "2026-02-27",
    brand: "Air India",
    platform: "App Store",
    category: "Fake App",
    description: "NA",
    url: "https://www.pgyer.com/apk/apk/com.bets.airindia.ui",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "NA",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279298842",
    date: "2026-02-27",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-Flyer",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India Flyer",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279298831",
    date: "2026-02-27",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-8",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279236962",
    date: "2026-02-27",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-Delhi",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India Delhi",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279236959",
    date: "2026-02-27",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-Head-Office",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India Head Office",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279236985",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Reddit",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.reddit.com/user/Airindia001/",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air india 001",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279236976",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-23",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279298830",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-38",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298836",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-Training",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India Training",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298828",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Airindia-Amritsar",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Airindia Amritsar",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298843",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-Kuwait-ADMIN",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India, Kuwait ADMIN",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279298826",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Airindia-Airlines-Service-Hyderabad-Airlines-Service-Hyderabad",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Airindia Airlines Service Hyderabad Airlines Service Hyderabad",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279298835",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-Head-Office",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India Head Office",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298827",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Airindia-Information",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Airindia Information",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279236958",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-Cleaning",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India Cleaning",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279236971",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-Training",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India Training",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298832",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-14",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279298833",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-23",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279236982",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-Kuwait-ADMIN",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India, Kuwait ADMIN",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279236972",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-Services-India",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air Services India",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279236968",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-8",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279236960",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-34",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279236970",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-38",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298896",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Web Page",
    category: "Fake Website/Similar Domain",
    description: "NA",
    url: "https://qhevdtevsgeheas.com/",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
    {
    id: "279297490",
    date: "27-02-2026",
    brand: "Air India",
    platform: "App Store",
    category: "Fake App",
    description: "NA",
    url: "https://www.apk20.com/apk/com.bets.airindia.ui",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "NA",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279236975",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-14",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279297493",
    date: "27-02-2026",
    brand: "Air India",
    platform: "App Store",
    category: "Fake App",
    description: "NA",
    url: "https://apkcafe.fr/download?file_id=2972010/air-india",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "NA",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279297492",
    date: "27-02-2026",
    brand: "Air India",
    platform: "App Store",
    category: "Fake App",
    description: "NA",
    url: "https://appsonwindows.com/apk/1117736/",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "NA",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279298829",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/AIRFRAME-AIRINDIA",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "AIRFRAME AIRINDIA",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298837",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-34",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298852",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake Customer Care No",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-Customer-Care-NumberO6297250367",
    contactNo: "6297250367",
    trademarkUsed: "Brand Name",
    handleName: "Air India Customer Care NumberO6297250367..",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298839",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-Delhi",
    contactNo: "NA",
    trademarkUsed: "Brand Name & Logo",
    handleName: "Air India Delhi",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298840",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake Customer Care No",
    description: "NA",
    url: "https://wkyiffkejfmgjsem.quora.com/Air-India-customer-care-numberO6297-25-0367-Where-Air-India-India-head-office-in-India",
    contactNo: "6297250367",
    trademarkUsed: "Brand Name",
    handleName: "Air India Customer Care NumberO6297250367..",
    domainHost: "NA",
    priority: "High",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298881",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/ef4256b209a5a77f6593d2ecad94d9ab",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298883",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/795afe4a608b52506a85b0f407955033",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279298884",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/060e1029d8806a546f39781251e007f7",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298887",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/27ed89f86feacaa31ca4fa50aa2cc0be",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279298888",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/224675476/head-company-secretary-mumbai-india",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India SATS Airport Services Private Limited (AISATS)",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279298889",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/225466992/head-company-secretary-mumbai-india",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India SATS Airport Services Private",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298890",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/225334019/cargo-operations-manager-chef-de-lexploitation-fret-india",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India Cargo",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298891",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/223605192/manager-air-cargo-pricing-new-delhi",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Confidential",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279298892",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/224365777/manager-air-cargo-pricing-panchkula",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Seven N Half",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298893",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/224791695/manager-air-cargo-pricing-gurugram",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Seven N Half",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298894",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/224879348/manager-air-cargo-pricing-gurugram",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Seven N Half",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279298898",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/b73dab02b992b49421854dc4a62ad3d2",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298900",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/1598d8febd847f660f739103448502ee",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298903",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/33d1cab23247d89aa095a07d28415bb1",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
    {
    id: "279298905",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/bfe6614df8903c56425ffb5be57ea975",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298907",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/224813116/senior-manager-strategic-finance-india",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India SATS Airport Services Private Limited (AISATS)",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298908",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/225072582/senior-manager-strategic-finance-india",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India SATS Airport Services Private Limited (AISATS)",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279298909",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/225387618/senior-manager-strategic-finance-india",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India SATS Airport Services Private Limited (AISATS)",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298910",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/225397973/senior-manager-strategic-finance-india",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India SATS Airport Services Private Limited (AISATS)",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298911",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/223380161/senior-executive-finance-gurugram-india",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India SATS Airport Services Private Limited (AISATS)",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298859",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/110446a1952286f2804f4e40b40e398f",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279298845",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Reddit",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.reddit.com/user/AirIndiaa/",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "u/AirIndiaa",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298861",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/a056ce6ec64bc7ba35e5d48666286c5c",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298899",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/09c15c669ea8bb84d06356599aa290b8",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298897",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/09c32d19a2dcbe6ddded4b193168736d",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298880",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/eeba127f27481de6257e2163949d307d",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298865",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/058926f143eb139cac475d341640a8c3",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298868",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/224350332/senior-executive-finance-gurugram-india",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India SATS Airport Services Private Limited (AISATS)",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279298869",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/224512102/senior-executive-finance-yamuna-nagar-india",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India SATS Airport Services Private Limited (AISATS)",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298846",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Reddit",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.reddit.com/user/airindiab787-8/",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "u/airindiab787-8",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Recommended to Legal",
  },
    {
    id: "279298847",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Reddit",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.reddit.com/user/airindia333/",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "u/airindia333",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298850",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Reddit",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.reddit.com/user/AirIndiaFlight182/",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "u/AirIndiaFlight182",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298848",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Reddit",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.reddit.com/user/airindia_321/",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "u/airindia_321",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298857",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/a149f11dc2f6123cc99ab161a0e58431",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298862",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/223447528/senior-manager-strategic-finance-india",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India SATS Airport Services Private Limited (AISATS)",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298834",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-Cleaning",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India Cleaning",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279298858",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/8cb2135c032086ccbb6cdc444290c2cc",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298864",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/024464783b82a88f0bab468ee91d580a",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298854",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/bc3d8ff9e3d81a9188065007263e1e6b",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298855",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/5815d80c5a96f66d388c846c27e58e4b",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298878",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/0c1a7e31baf13955ac544783f7a64035",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298902",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/ddb7edb46c7148163b7e9984473ef8ed",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298873",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/223821923/senior-manager-strategic-finance-india",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India SATS Airport Services Private Limited (AISATS)",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298904",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/289fb24cdaa00d5c19f25e60108df77d",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298901",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/981321f36d10525ed6ee3bb5708c3357",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
    {
    id: "279298838",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/EDI-AIR-INDIA",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "EDI AIR INDIA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279236954",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-Express-5",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India Express",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279298886",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/8e6b9f04c9bd441efe4c97f3d81f0099",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279236955",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-Customer",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India Customer",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279236956",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-39",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279236961",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/AIR-INDIA-VA",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "AIR INDIA VA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279236963",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Reddit",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.reddit.com/user/airindia0/",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "airindia0",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279236964",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Reddit",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.reddit.com/user/airindiab787-8/",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "airindiab787-8",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279236965",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Reddit",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.reddit.com/user/AirIndiaa/",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "AirIndiaa",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279236966",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-15",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279236967",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/AIR-INDIA-26",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "AIR INDIA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279236969",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Irshada-Air-India",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Irshada Air India",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279236983",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/AIR-INDIA-EXPRESS-DUBAI-AIRPORT",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "AIR INDIA EXPRESS DUBAI AIRPORT",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279236984",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Reddit",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.reddit.com/user/airindiaexpert/",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "airindiaexpert",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279236974",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Reddit",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.reddit.com/user/AirIndiaFlight182/",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "AirIndiaFlight182",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
    {
    id: "279236977",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-40",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279236978",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/AIR-INDIA-KOLKATA",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "AIR INDIA KOLKATA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279236979",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/AIR-INDIA-3",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "AIR INDIA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Taken Down",
  },
  {
    id: "279236973",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Reddit",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.reddit.com/user/airindia_321/",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "airindia_321",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279236980",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Quora",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.quora.com/profile/Air-India-37",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279236986",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Reddit",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.reddit.com/user/airindia333/",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "airindia333",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298849",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Reddit",
    category: "Fake BS Handles",
    description: "NA",
    url: "https://www.reddit.com/user/airindia6/",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "u/airindia6",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298906",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/4383e4492cef3cff6fe79baeb1c7de8d",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298853",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/e7ea9653df9d17cf2f90db69bf36dd8e",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298882",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/f84df2c4b2a7496b7b99afc1eed3aa31",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298885",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/b55a03eaaf7b676cb27dee9f60369e0a",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298863",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/d32b5ffcb9893a29d3a34e8104453d28",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298866",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/d8f2af1da5d6568d7f40d892513fea50",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298856",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/08fd8cf4352388d666cdb4b4e7497c0d",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298877",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/224794946/senior-manager-strategic-finance-india",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India SATS Airport Services Private Limited (AISATS)",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298879",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/bfa9c48ff70bb1e8b6c4805dc89d2318",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298871",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/224523151/head-company-secretary-mumbai-india",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India SATS Airport Services Private Limited (AISATS)",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298874",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/224237912/senior-manager-strategic-finance-india",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India SATS Airport Services Private Limited (AISATS)",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298860",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/2950b1edbbf4ec80c5d9a18fb1f63634",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298872",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/224671144/head-company-secretary-mumbai-india",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India SATS Airport Services Private Limited (AISATS)",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298867",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Bebee",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://in.bebee.com/job/a9f25d2581ac231abeb2475b0c749815",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "NA",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298895",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/224895301/manager-air-cargo-pricing-gurugram",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Seven N Half",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298875",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/224428467/senior-manager-strategic-finance-india",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India SATS Airport Services Private Limited (AISATS)",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  },
  {
    id: "279298870",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/224951081/senior-executive-finance-gurugram-india",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India SATS Airport Services Private Limited (AISATS)",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Unresolved",
    takedownStatus: "No Action",
  },
  {
    id: "279298876",
    date: "27-02-2026",
    brand: "Air India",
    platform: "Kit Job",
    category: "Fake Job Promotions",
    description: "NA",
    url: "https://www.kitjob.in/job/224734814/senior-manager-strategic-finance-india",
    contactNo: "NA",
    trademarkUsed: "Brand Name",
    handleName: "Air India SATS Airport Services Private",
    domainHost: "NA",
    priority: "Low",
    ticketId: "0",
    ticketStatus: "Resolved",
    takedownStatus: "Recommended to Legal",
  }
];

const PriorityBadge = ({ priority }) => {
  const config = {
    // Critical: { dot: "bg-red-500",    text: "text-red-700",    bg: "bg-red-50",    border: "border-red-200" },
    High:     { dot: "bg-orange-500", text: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200" },
    // Medium:   { dot: "bg-[#86BC25]",  text: "text-[#5a8019]",  bg: "bg-[#f3fae0]", border: "border-[#cce87a]" },
    Low:      { dot: "bg-blue-500",   text: "text-blue-700",   bg: "bg-blue-50",   border: "border-blue-200" },
  };
  const c = config[priority] || config.Low;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border ${c.bg} ${c.text} ${c.border}`}
      style={{ fontWeight: 600, fontSize: "9px", letterSpacing: "0.02em", whiteSpace: "nowrap" }}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
      {priority}
    </span>
  );
};

const CategoryBadge = ({ category }) => {
  const config = {
    "Phishing":            { bg: "bg-red-50",    text: "text-red-600",    border: "border-red-200" },
    "Social Media":        { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
    "Counterfeit":         { bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-200" },
    "Fake BS Handles":     { bg: "bg-[#f3fae0]", text: "text-[#5a8019]",  border: "border-[#cce87a]" },
    "Fake Customer Care No": { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
    "Fake App":            { bg: "bg-pink-50",   text: "text-pink-700",   border: "border-pink-200" },
  };
  const c = config[category] || { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200" };
  return (
      <span
        className={`inline-block px-1 py-1 border ${c.bg} ${c.text} ${c.border}`}
        style={{
          fontSize: "9px",
          fontWeight: 600,
          letterSpacing: "0.05em",
          whiteSpace: "normal",
          wordBreak: "break-word",
          lineHeight: "1.2",
          maxWidth: "100%",
          textAlign: "center",
        }}
      >
        {category.toUpperCase()}
      </span>
  );
};

// ── Ticket Status chip with optional Mark Resolve button ──────────────────────
const TicketStatusChip = ({ status, onMarkResolve }) => {
  if (!status || status === "NA") {
    return <span style={{ fontSize: "9px" }} className="text-gray-300 font-medium">—</span>;
  }

  const positive = ["Resolved", "Completed", "Takedown Sent", "Sent"];
  const isPositive = positive.includes(status);

  const CheckIcon = () => (
    <svg className="w-3.5 h-3.5 text-[#86BC25] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );

  const WarnIcon = () => (
    <svg className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );

  if (status === "Unresolved") {
    return (
      <div className="flex flex-col gap-1.5 items-start">
        {/* Status label */}
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600" style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
          <WarnIcon />
          Unresolved
        </span>
        {/* Mark Resolve button — always visible */}
        <button
          onClick={onMarkResolve}
          className="inline-flex items-center gap-1 px-1 py-1 font-bold text-[#26890d] border border-[#26890d] bg-white cursor-pointer"
          style={{ fontSize: "10px", whiteSpace: "nowrap", lineHeight: 1.4 }}
        >
          <svg className="w-2.5 h-2.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Mark Resolve
        </button>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600" style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
      {isPositive ? <CheckIcon /> : <WarnIcon />}
      {status}
    </span>
  );
};

// ── Generic status chip (used for takedown status) ────────────────────────────
const StatusChip = ({ status }) => {
  const config = {
    "Taken Down": {
      icon: BadgeCheck,
      text: "text-[#5a8019]",
    },
    "No Action": {
      icon: CircleOff,
      text: "text-amber-600",
    },
    "Recommended to Legal": {
      icon: Gavel,
      text: "text-red-600",
    },
  };

  const c = config[status];

  if (!c) {
    return <span className="text-gray-300 text-xs font-medium">—</span>;
  }

  const Icon = c.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold ${c.text}`}
      style={{
        fontSize: "10px",
        whiteSpace: "normal",
        wordBreak: "break-word",
        overflowWrap: "break-word",
        lineHeight: "1.2",
        maxWidth: "100%",
      }}
    >
      <Icon size={10} strokeWidth={2.2} />
      <span>{status}</span>
    </span>
  );
};

const FilterPill = ({ label, value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative flex items-center gap-1 text-xs">
      <span className="font-medium whitespace-nowrap text-gray-400">
        {label}
      </span>

      <span className="text-gray-300">|</span>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 bg-transparent cursor-pointer text-xs font-semibold text-gray-700"
      >
        <span>{value}</span>

        <ChevronDown
          className={`h-3 w-3 text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[120px] overflow-hidden rounded-md bg-white shadow-lg">
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              className={`block cursor-pointer w-full px-3 py-2 text-left text-xs transition-colors
                ${
                  value === o
                    ? "bg-neutral-100 font-semibold text-gray-900"
                    : "text-gray-700 hover:bg-neutral-50"
                }`}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


const COLUMNS = [
  { label: "ID",                        width: 95 },
  { label: "Date",                      width: 80 },
  { label: "Brand",                     width: 70 },
  { label: "Platform",                  width: 65 },
  { label: "Category",                  width: 100 },
  { label: "Contact No",                width: 90 },
  { label: "Trademark Used",            width: 75 },
  { label: "Handle Name",               width: 90 },
  { label: "Priority",                  width: 80 },
  // { label: "Ticket ID",                 width: 90  },
  { label: "Ticket Status",             width: 95 },
  { label: "Take Down Status",          width: 105 },
];


export default function IncidentsTable() {
  // ── lift incidents into state so Mark Resolve can mutate it ──
  const [incidents, setIncidents] = useState(INCIDENTS_INITIAL);

  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState(new Set());
  const [filters, setFilters]   = useState({
    priority: "All",
    category: "All",
    platform: "All",
    status:   "All",
    takedown: "All",
  });

  const priorities = ["All", "High", "Low"];
  const categories = ["All", ...new Set(incidents.map((i) => i.category))];
  const platforms  = ["All", ...new Set(incidents.map((i) => i.platform))];
  const statuses   = ["All", ...new Set(incidents.map((i) => i.ticketStatus))];
  const takedowns  = ["All", ...new Set(incidents.map((i) => i.takedownStatus))];

  const filtered = useMemo(() => {
    return incidents.filter((row) => {
      const q = search.toLowerCase();
      return (
        (!q || JSON.stringify(row).toLowerCase().includes(q)) &&
        (filters.priority === "All" || row.priority       === filters.priority) &&
        (filters.category === "All" || row.category       === filters.category) &&
        (filters.platform === "All" || row.platform       === filters.platform) &&
        (filters.status   === "All" || row.ticketStatus   === filters.status)   &&
        (filters.takedown === "All" || row.takedownStatus === filters.takedown)
      );
    });
  }, [incidents, search, filters]);

  // ── Mark a single incident as Resolved ───────────────────────────────────
  const handleMarkResolve = (id) => {
    setIncidents((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, ticketStatus: "Resolved" } : row
      )
    );
  };

  const toggleRow = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = (checked) => {
    setSelected(checked ? new Set(filtered.map((r) => r.id)) : new Set());
  };

  const allChecked  = filtered.length > 0 && filtered.every((r) => selected.has(r.id));
  const someChecked = filtered.some((r) => selected.has(r.id));

  const handleSampleCSV = () => {
    downloadCSV(filtered, "incidents_export");
  };

  const tdBase = (extra = {}) => ({
    padding: "10px 12px",
    fontSize: 12,
    color: "#555",
    borderBottom: "1px solid #f0f0f0",
    verticalAlign: "top",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    whiteSpace: "normal",
    ...extra,
  });

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#f5f5f5",
        minHeight: "100vh",
        height: "139vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        .tbl-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(134,188,37,0.9) #f1f5f9;
        }
        .tbl-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
        .tbl-scroll::-webkit-scrollbar-track { background: #f8fafc; }
        .tbl-scroll::-webkit-scrollbar-thumb {
          background: rgba(134,188,37,0.9);
          border-radius: 9999px;
          border: 2px solid #f8fafc;
        }
        .tbl-scroll::-webkit-scrollbar-thumb:hover { background: rgba(104,147,25,0.95); }
        .inc-row:hover td { background: #f9fdf2 !important; }
        .inc-row.sel td   { background: #f3fae0 !important; }
      `}</style>

      <div
        className="max-w-screen-2xl mx-auto px-4 py-4"
        style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, width: "100%" }}
      >
        {/* ── Page Header ── */}
        <div className="flex items-center justify-between mb-3 flex-wrap gap-3" style={{ flexShrink: 0 }}>
          <div className="flex items-center gap-3">
            <span className="h-8 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
            <h2 className="text-xl font-semibold text-neutral-900">Web/App Incidents</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 bg-white hover:bg-[#f3fae0] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l-3 3m3-3l3 3" />
              </svg>
              Bulk Takedown
            </button>
            <button
              onClick={handleSampleCSV}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M8 12l4 4 4-4M12 4v12" />
              </svg>
              Sample CSV
            </button>
          </div>
        </div>

        {/* ── Filter Bar ── */}
        <div className="bg-white border border-gray-200 px-4 py-3 mb-3 shadow-sm" style={{ flexShrink: 0 }}>
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 pb-1 border-b border-gray-100 mb-1">
            <FilterPill label="Priority"        value={filters.priority} options={priorities} onChange={(v) => setFilters((f) => ({ ...f, priority: v }))} />
            <FilterPill label="Category"        value={filters.category} options={categories} onChange={(v) => setFilters((f) => ({ ...f, category: v }))} />
            <FilterPill label="Platform"        value={filters.platform} options={platforms}  onChange={(v) => setFilters((f) => ({ ...f, platform: v }))} />
            <FilterPill label="Status"          value={filters.status}   options={statuses}   onChange={(v) => setFilters((f) => ({ ...f, status: v }))} />
            <FilterPill label="Takedown Status" value={filters.takedown} options={takedowns}  onChange={(v) => setFilters((f) => ({ ...f, takedown: v }))} />
            <button
              onClick={() => setFilters({ priority: "All", category: "All", platform: "All", status: "All", takedown: "All" })}
              className="ml-auto text-xs text-gray-400 hover:text-red-500 font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ID or Handle..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 outline-none focus:border-[#86BC25] transition-colors bg-[#f9f9f9] placeholder:text-gray-400"
              />
            </div>
            <button className="px-3 py-1.5 text-xs font-semibold text-white bg-[#26890d] transition-colors">Submit</button>
            
            {/* <div className="ml-auto flex items-center gap-1.5">
              <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">Columns</span>
              <select className="text-xs border border-gray-200 px-2 py-1.5 outline-none bg-white text-gray-600 hover:border-[#86BC25] transition-colors cursor-pointer">
                <option>All</option>
                <option>Essential</option>
              </select>
              <button className="p-2 text-gray-400 hover:text-[#86BC25] border border-gray-200 bg-white hover:border-[#86BC25] transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M8 12l4 4 4-4M12 4v12" />
                </svg>
              </button>
            </div> */}
          </div>
        </div>

        {/* ── Table Card ── */}
        <div
          className="bg-white border border-gray-200 shadow-sm"
          style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}
        >
          <div className="tbl-scroll" style={{ flex: 1, minHeight: 0, overflow: "auto" }}>
            <table
              style={{
                borderCollapse: "separate",
                borderSpacing: 0,
                tableLayout: "fixed",
                width: "100%",
              }}
            >
              <colgroup>
                <col style={{ width: 30 }} />
                {COLUMNS.map((c) => <col key={c.label} style={{ width: c.width }} />)}
              </colgroup>

              <thead>
                <tr>
                  <th
                    style={{
                      position: "sticky", top: 0, zIndex: 20,
                      background: "#26890d",
                      padding: "3px 3px",
                      borderRight: "1px solid #78ab1a",
                      textAlign: "center",
                      width: 30,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={allChecked}
                      ref={(el) => { if (el) el.indeterminate = !allChecked && someChecked; }}
                      onChange={(e) => toggleAll(e.target.checked)}
                      style={{  width: 14, height: 14, cursor: "pointer", accentColor: "white" }}
                    />
                  </th>
                  {COLUMNS.map((col, i) => (
                    <th
                      key={col.label}
                      style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 20,
                        background: "#26890d",
                        color: "white",
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        padding: "7px 3px",
                        textAlign: "center",

                        borderRight:
                          i < COLUMNS.length - 1
                            ? "1px solid #78ab1a"
                            : "none",

                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        lineHeight: "1.2",
                        verticalAlign: "middle",
                      }}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={COLUMNS.length + 1} style={{ textAlign: "center", padding: 48, color: "#bbb", fontSize: 13 }}>
                      No incidents match your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((row, i) => {
                    const isSel = selected.has(row.id);
                    const rowBg = isSel ? "#f3fae0" : i % 2 === 0 ? "#fff" : "#fafafa";
                    const td = (extra = {}) => ({ ...tdBase({ background: rowBg }), ...extra });

                    return (
                      <tr key={row.id} className={`inc-row${isSel ? " sel" : ""}`}>
                        <td style={td({ textAlign: "center", verticalAlign: "middle" })}>
                          <input
                            type="checkbox"
                            checked={isSel}
                            onChange={() => toggleRow(row.id)}
                            style={{ width: 12, height: 12, cursor: "pointer", accentColor: "#86BC25" }}
                          />
                        </td>
                        <td className="text-center" style={td({ fontSize: 10, color: "#888" })}>
                          <a
                            href={row.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#86BC25", fontSize: 10, fontFamily: "'DM Mono', monospace", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}
                            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                          >
                            {row.id}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                        <td className="text-center" style={td({ fontSize: 10, color: "#888", whiteSpace: "nowrap" })}>{row.date}</td>
                        <td style={td({ fontSize: 10, fontWeight: 500, color: "#222" })}>{row.brand}</td>
                        <td style={td({ fontSize: 10 })}>{row.platform}</td>
                        <td style={td()}><CategoryBadge category={row.category} /></td>
                        <td className="text-center" style={td({ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#aaa" })}>{row.contactNo}</td>
                        <td style={td({ fontSize: 10, color: "#666" })}>{row.trademarkUsed}</td>
                        <td style={td({ fontSize: 10, color: "#555", wordBreak: "break-word" })}>{row.handleName}</td>
                        <td style={td()}><PriorityBadge priority={row.priority} /></td>
                        {/* <td className="text-center" style={td({ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#888" })}>{row.ticketId}</td> */}

                        {/* ── Ticket Status — uses TicketStatusChip with Mark Resolve ── */}
                        <td style={td()}>
                          <TicketStatusChip
                            status={row.ticketStatus}
                            onMarkResolve={() => handleMarkResolve(row.id)}
                          />
                        </td>

                        <td style={td()}><StatusChip status={row.takedownStatus} /></td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* ── Footer ── */}
          <div
            className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-[#fafafa]"
            style={{ flexShrink: 0 }}
          >
            <span className="text-xs text-gray-400">
              Showing <span className="font-semibold text-gray-600">{filtered.length}</span> of{" "}
              <span className="font-semibold text-gray-600">{incidents.length}</span> results
              {selected.size > 0 && (
                <span className="ml-2 text-[#86BC25] font-semibold">· {selected.size} selected</span>
              )}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}


