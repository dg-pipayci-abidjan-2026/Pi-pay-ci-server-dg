const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const PI_API_KEY = process.env.PI_API_KEY;

app.get('/', (req,res)=>{ 
  res.send("Serveur PI-PAY-CI V9 PRO DG - 337 Pi proteges Abidjan !"); 
});

app.post('/approve', async (req, res) => {
  try {
    const r = await fetch(`https://api.minepi.com/v2/payments/${req.body.paymentId}/approve`, { 
      method: 'POST', 
      headers: { 'Authorization': `Key ${PI_API_KEY}` } 
    });
    const data = await r.json();
    res.json({ approved: true, data });
  } catch (e) { 
    res.status(500).json({ error: e.message }); 
  }
});

app.post('/complete', async (req, res) => {
  try {
    const r = await fetch(`https://api.minepi.com/v2/payments/${req.body.paymentId}/complete`, { 
      method: 'POST', 
      headers: { 'Authorization': `Key ${PI_API_KEY}`, 'Content-Type':'application/json' }, 
      body: JSON.stringify({ txid: req.body.txid }) 
    });
    const data = await r.json();
    res.json({ completed: true, data });
  } catch (e) { 
    res.status(500).json({ error: e.message }); 
  }
});

app.listen(10000, () => console.log("Serveur DG lance"));
