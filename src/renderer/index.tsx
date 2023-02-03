import React from "react";
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router, Routes, Route, Link, Navigate
} from "react-router-dom";
import App, { NavigationBar } from './App';
import CustomerTableView from "./CustomerTableView";
import DiscountCodeView from "./DiscountCodeView";
import MergeCustomerView from "./MergeCustomerView";


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/list" />} />
      <Route path="/list" element={<NavigationBar><CustomerTableView /></NavigationBar>} />
      <Route path="/codes" element={<NavigationBar><DiscountCodeView /></NavigationBar>} />
      <Route path="/merge" element={<NavigationBar><MergeCustomerView /></NavigationBar>} />
      <Route
        path="*"
        element={<Navigate to="/" />}
      />
    </Routes>
  </Router>
);
