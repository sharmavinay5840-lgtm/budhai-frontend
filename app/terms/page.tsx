'use client';
import { useRouter } from 'next/navigation';

export default function Terms() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-500 cursor-pointer" onClick={() => router.push('/')}>BuddhAI ☿</h1>
        <button onClick={() => router.push('/')} className="text-xs text-gray-400 hover:text-white">← Back to Home</button>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: April 2025</p>

        <div className="space-y-8 text-gray-300 text-sm leading-relaxed">

          <div>
            <h2 className="text-white font-semibold text-lg mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using BuddhAI's platform, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg mb-3">2. Description of Services</h2>
            <p>BuddhAI provides an AI-powered customer experience platform including:</p>
            <ul className="space-y-2 list-disc list-inside mt-2">
              <li>24/7 AI customer support in Hindi and English.</li>
              <li>Embeddable chat widget for websites and apps.</li>
              <li>Marketing automation and WhatsApp integration.</li>
              <li>Analytics dashboard and business insights.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg mb-3">3. Subscription & Payment</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>BuddhAI offers monthly subscription plans starting at ₹4,999/month.</li>
              <li>A 30-day free trial is available — no credit card required.</li>
              <li>Payments are processed securely via Razorpay.</li>
              <li>Subscriptions auto-renew unless cancelled before the renewal date.</li>
              <li>No refunds for partial months unless due to service failure on our part.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg mb-3">4. Acceptable Use</h2>
            <p className="mb-2">You agree NOT to use BuddhAI for:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Any illegal, fraudulent, or harmful activities.</li>
              <li>Spamming, harassment, or misleading customers.</li>
              <li>Violating any applicable Indian or international laws.</li>
              <li>Attempting to reverse-engineer or hack our platform.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg mb-3">5. Intellectual Property</h2>
            <p>BuddhAI and all associated content, logos, and technology are owned by BuddhAI Technologies. You may not copy, modify, or distribute our platform without written permission.</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg mb-3">6. Limitation of Liability</h2>
            <p>BuddhAI is not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid by you in the last 3 months.</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg mb-3">7. Service Availability</h2>
            <p>We strive for 99.9% uptime but do not guarantee uninterrupted service. Scheduled maintenance will be communicated in advance. We are not liable for downtime caused by third-party services.</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg mb-3">8. Termination</h2>
            <p>We reserve the right to suspend or terminate accounts that violate these terms. You may cancel your subscription at any time from your account settings.</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg mb-3">9. Governing Law</h2>
            <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Indore, Madhya Pradesh, India.</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg mb-3">10. Contact Us</h2>
            <div className="bg-gray-900 rounded-xl p-4 space-y-1">
              <p><strong className="text-white">BuddhAI Technologies</strong></p>
              <p>Email: <span className="text-blue-400">legal@buddhai.in</span></p>
              <p>Website: <span className="text-blue-400">budhai-frontend.vercel.app</span></p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}