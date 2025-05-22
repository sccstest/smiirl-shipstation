
const axios = require("axios");
const fs = require("fs");

const username = process.env.SS_API_KEY;
const password = process.env.SS_API_SECRET;

async function updateOrderCount() {
  try {
    const res = await axios.get("https://ssapi.shipstation.com/orders", {
      params: { orderStatus: "awaiting_shipment" },
      auth: { username, password }
    });

    const count = res.data.total;
    fs.writeFileSync("public/order_count.json", JSON.stringify({ value: count }));
    console.log(`Updated order count: ${count}`);
  } catch (err) {
    console.error("Error fetching ShipStation orders:", err);
  }
}

updateOrderCount();
