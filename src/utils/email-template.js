export const  generateOrderConfirmationEmail = ({ customerName, orderId, items, totalPrice, estimatedDelivery }) => {
  const itemRows = items.map(item => `
    <tr>
      <td style="padding: 8px 0;">${item.name}</td>
      <td style="padding: 8px 0;">${item.quantity}</td>
      <td style="padding: 8px 0;">₺${item.price}</td>
    </tr>
  `).join('');

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2>Hi ${customerName},</h2>
      <p>Thank you for your order!</p>
      <p>Your order <strong>#${orderId}</strong> has been taked.</p>

      <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
        <thead>
          <tr>
            <th align="left">Product</th>
            <th align="left">Qty</th>
            <th align="left">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemRows}
        </tbody>
      </table>

      <p style="margin-top: 20px;"><strong>Total:</strong> ₺${totalPrice}</p>
      <p><strong>Estimated delivery:</strong> ${estimatedDelivery}</p>

      <p style="margin-top: 30px;">You will receive another email when your order ships.</p>

      <p style="margin-top: 40px; font-size: 12px; color: #888;">If you have any questions, reply to this email.</p>
    </div>
  `;
}

export const  generateOrderDeliveredEmail = ({ customerName, orderId, deliveryDate, items }) => {
  const itemRows = items.map(item => `
    <tr>
      <td style="padding: 8px 0;">${item.name}</td>
      <td style="padding: 8px 0;">${item.quantity}</td>
    </tr>
  `).join('');

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2>Hello ${customerName},</h2>

      <p>Your order <strong>#${orderId}</strong> has been <strong>delivered</strong> on <strong>${deliveryDate}</strong>.</p>

      <h3 style="margin-top: 30px;">Items Delivered:</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr>
            <th align="left">Product</th>
            <th align="left">Quantity</th>
          </tr>
        </thead>
        <tbody>
          ${itemRows}
        </tbody>
      </table>

      <p style="margin-top: 20px;">We hope you enjoy your purchase!</p>

      <p>If you have any issues with your order, <a href="https://yourstore.com/contact" style="color: #007bff;">contact our support</a>.</p>

      <p style="margin-top: 40px; font-size: 12px; color: #888;">
        Thank you for shopping with us.<br>
        — The YourStore Team
      </p>
    </div>
  `;
}


export const  generateWelcomeEmail = ( customerName ) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2>Welcome to YourStore, ${customerName}!</h2>

      <p>We're excited to have you on board. YourStore is your one-stop shop for quality products and great deals.</p>

      <p>To get started, you can:</p>
      <ul>
        <li>🛍️ Browse our latest products</li>
        <li>💳 Save your shipping and payment preferences</li>
        <li>🎁 Enjoy member-only discounts and offers</li>
      </ul>

      <a href="https://yourstore.com" style="
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      ">Start Shopping</a>

      <p style="margin-top: 40px; font-size: 12px; color: #888;">
        If you have any questions, just reply to this email or visit our 
        <a href="https://yourstore.com/support" style="color: #007bff;">Help Center</a>.
        <br><br>
        — The YourStore Team
      </p>
    </div>
  `;
}

