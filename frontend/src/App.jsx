import { useState } from 'react'
import './App.css'
import ReportPage from './pages/Dashboard.jsx'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Index from './pages/Index';
import Dashboard  from './components/Dashboard.jsx';
import WebSummary from './components/WebSummary';
import WebIncidents from "./components/WebIncidents";
import Sidebar from "./components/Sidebar.jsx"

function BrandPerceptionLayout() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Navbar name="Brand Perception AI - Early Signals" />
      <ReportPage />
    </div>
  )
}

function BrandInfringementLayout() {
  return (
    <div className="flex h-screen flex-col bg-neutral-100 text-neutral-900">
      <Navbar name="Brand Infringement AI" />

      <div className="flex min-h-0 flex-1">
        <Sidebar />

        <div className="min-w-0 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Index />} />

        <Route
          path="/brand_perception"
          element={<BrandPerceptionLayout />}
        />

        {/* Nested Routes */}
        <Route element={<BrandInfringementLayout />}>
          <Route path="/brand_infridgement" element={<Dashboard />} />
          <Route path="/web-summary" element={<WebSummary />} />
          <Route path="/web-incidents" element={<WebIncidents />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}


export default App