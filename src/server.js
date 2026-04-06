/**
 * @file server.js
 * @description IDOR Lab Environment - Istinye University
 * @instructor Keyvan Arasteh
 * @author Safa Hacıbayramoğlu
 * * SECURITY ADVISORY:
 * - Vulnerability: IDOR (Insecure Direct Object Reference)
 * - CWE Category: CWE-639 (Access Control Bypass)
 * - Severity: High / Critical
 */

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// TODO: Implement 'helmet.js' for enhanced HTTP security headers.
// FIXME: Ensure directory traversal protection on static assets.
app.use(express.static(__dirname));

/**
 * MOCK DATABASE - IN-MEMORY
 * Simulates sensitive user invoice data.
 */
const invoices = {
    "100": { id: 100, owner: "Safa", amount: "1500 TL", detail: "Laptop Tamiri", date: "2026-03-01" },
    "101": { id: 101, owner: "Basak", amount: "450 TL", detail: "Internet Faturasi", date: "2026-03-05" },
    "102": { id: 102, owner: "Mehmet", amount: "2100 TL", detail: "Kira Odemesi", date: "2026-03-10" }
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * @api {get} /api/invoice/:id Fetch Invoice Data
 * @apiDescription VULNERABILITY: Missing Authorization Check (IDOR).
 * Any authenticated/unauthenticated user can access any ID by incrementing the parameter.
 * * TODO: Use UUIDs instead of sequential integers to prevent enumeration.
 */
app.get('/api/invoice/:id', (req, res) => {
    const id = req.params.id;
    const invoice = invoices[id];

    if (invoice) {
        // FIXME: SECURITY RISK - Application trust user input directly without session validation.
        res.json(invoice);
    } else {
        res.status(404).json({ error: "Fatura bulunamadı!" });
    }
});

// TODO: Add logging middleware (e.g., Winston) to track unauthorized access attempts.
// TODO: Integrate Express-Rate-Limit to mitigate automated ID scanning.

app.listen(PORT, () => {
    console.log(`[!] LAB ACTIVE: Vulnerable server running at http://localhost:${PORT}`);
});
