const axios = require("axios");
const fs = require("fs");

const username = process.env.b659a1ab944d475b9fe6bf2755d90c62;
const password = process.env.5c41edfd2e97427fb8421467fc1568e2;

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
