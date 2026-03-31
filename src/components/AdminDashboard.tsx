import { useState } from "react";

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const normalizePhone = (value: string) => {
    return value.replace(/\D/g, "");
  };

  const isValidPhone = (value: string) => {
    const digits = normalizePhone(value);
    return /^(?:254|0)7\d{8}$/.test(digits);
  };

  const formatDisplayPhone = (value: string) => {
    const digits = normalizePhone(value);
    if (digits.startsWith("254")) return "+" + digits;
    if (digits.startsWith("0")) return "+254" + digits.slice(1);
    return "+" + digits;
  };

  const handleStkPush = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidPhone(phone)) {
      setStatus("Enter a valid Kenyan phone number.");
      return;
    }

    const amountNum = Number(amount);
    if (!amountNum || amountNum < 100) {
      setStatus("Enter an amount of at least KSH 100.");
      return;
    }

    setIsLoading(true);
    const displayPhone = formatDisplayPhone(phone);
    setStatus(`Sending STK Push to ${displayPhone} for KSH ${amountNum.toLocaleString()}...`);

    // Simulate API call
    setTimeout(() => {
      setStatus(`STK Push requested successfully. Customer will receive notification on ${displayPhone}.`);
      setIsLoading(false);
      setPhone("");
      setAmount("");
    }, 2000);
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </header>

      <main className="admin-main">
        <div className="dashboard-card">
          <h2>Send STK Push Payment</h2>
          <p>Use this form to send STK Push payment requests to customers.</p>

          <form onSubmit={handleStkPush} className="stk-form">
            <div className="form-group">
              <label htmlFor="phone">Customer Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+254 712 345 678"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount (KSH)</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="100"
                step="100"
                placeholder="5000"
                required
              />
            </div>

            <button type="submit" disabled={isLoading} className="primary-button">
              {isLoading ? "Sending..." : "Send STK Push"}
            </button>
          </form>

          {status && (
            <div className={`status-message ${status.includes("successfully") ? "success" : "error"}`}>
              {status}
            </div>
          )}
        </div>

        <div className="dashboard-card">
          <h2>Recent Transactions</h2>
          <p>Transaction history will appear here.</p>
          <div className="empty-state">
            No recent transactions
          </div>
        </div>
      </main>
    </div>
  );
}