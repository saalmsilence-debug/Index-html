// server.js
// Node 18+ recommended
import express from 'express';
import fetch from 'node-fetch';
import crypto from 'crypto';

const app = express();
app.use(express.json());

// --- CONFIG (set these in your hosting environment) ---
const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY; // FLWSECK_TEST-... or FLWSECK-...
const FLW_PUBLIC_KEY = process.env.FLW_PUBLIC_KEY; // optional for UI, not used by server
const PORT = process.env.PORT || 3000;
if (!FLW_SECRET_KEY) {
  console.error("Set FLW_SECRET_KEY env var");
  process.exit(1);
}

// Simple in-memory store for demo (replace with DB in production)
const txStates = {}; // tx_ref -> { status, flutter_resp }

function makeTxRef() {
  return 'BOOK7-' + Date.now() + '-' + Math.floor(Math.random()*9000+1000);
}

// Endpoint called by front-end to create an Mpesa charge
app.post('/create_charge', async (req, res) => {
  try {
    const { phone_number, amount=500, email='customer@book7.example' } = req.body;
    if (!phone_number || !/^2547\d{8}$/.test(phone_number)) {
      return res.status(400).json({ message: 'phone_number must be in 2547XXXXXXXX format' });
    }

    const tx_ref = makeTxRef();
    const payload = {
      tx_ref,
      amount: amount.toString(),
      currency: "KES",
      redirect_url: "", // not required for MPESA STK
      payment_options: "mpesa",
      customer: { email, phonenumber: phone_number, name: "Book7 Customer" },
      meta: { consumer_id: "book7_customer", consumer_mac: "kiosk" }
    };

    const r = await fetch('https://api.flutterwave.com/v3/charges?type=mpesa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + FLW_SECRET_KEY
      },
      body: JSON.stringify(payload)
    });

    const json = await r.json();
    // Save minimal state so we can poll/check later
    txStates[tx_ref] = { status: json.status || 'pending', flutter_resp: json, created_at: Date.now() };

    return res.status(r.ok ? 200 : 500).json({ ok: r.ok, data: json, tx_ref });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Simple check endpoint the front-end will poll
app.get('/check_tx', async (req, res) => {
  const tx_ref = req.query.tx_ref;
  if (!tx_ref) return res.status(400).json({ message: 'tx_ref required' });
  const state = txStates[tx_ref];
  if (!state) return res.json({ status: 'not_found' });
  return res.json({ status: state.status, data: state.flutter_resp });
});

// Webhook endpoint that Flutterwave will POST to on status change
app.post('/webhook', async (req, res) => {
  // IMPORTANT: Verify request authenticity in production
  // Flutterwave can sign webhook requests; check docs for recommended verification.
  const body = req.body;
  console.log('Webhook received:', JSON.stringify(body).slice(0,600));

  // Example: update txStates when status is successful
  if (body.data && body.data.tx_ref) {
    const tx_ref = body.data.tx_ref;
    txStates[tx_ref] = { status: body.data.status || 'unknown', flutter_resp: body, updated_at: Date.now() };
  }
  // return 200 quickly
  res.json({ received: true });
});

app.listen(PORT, ()=> console.log('Server running on port',PORT));