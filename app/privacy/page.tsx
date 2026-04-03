'use client';
import { useRouter } from 'next/navigation';

export default function Privacy() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-500 cursor-pointer" onClick={() => router.push('/')}>BuddhAI ☿</h1>
        <button onClick={() => router.push('/')} className="text-xs text-gray-400 hover:text-white">← Back to Home</button>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: April 2025</p>

        <div className="space-y-8 text-gray-300 text-sm leading-relaxed">

          <div>
            <h2 className="text-white font-semibold text-lg mb-3">1. Introduction</h2>
            <p>BuddhAI Technologies ("BuddhAI", "we", "us", or "our") is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect your information when you use our AI-powered customer experience platform at budhai-frontend.vercel.app.</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg mb-3">2. Information We Collect</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong className="text-white">Account Information:</strong> Name, email address, phone number when you register.</li>
              <li><strong className="text-white">Business Information:</strong> Business name, industry, policies you configure in settings.</li>
              <li><strong className="text-white">Chat Data:</strong> Conversations between your customers and BuddhAI agents.</li>
              <li><strong className="text-white">Usage Data:</strong> How you interact with our platform, analytics, and performance data.</li>
              <li><strong className="text-white">Payment Information:</strong> Billing details processed securely through Razorpay.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg mb-3">3. How We Use Your Information</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>To provide and improve our AI customer support services.</li>
              <li>To personalize AI responses based on your business data.</li>
              <li>To process payments and manage your subscription.</li>
              <li>To send service-related communications and updates.</li>
              <li>To comply with legal obligations including the DPDP Act 2023.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg mb-3">4. Data Storage & Security</h2>
            <p className="mb-2">All personal data is stored on servers located in India, in compliance with the Digital Personal Data Protection (DPDP) Act 2023. We implement industry-standard security measures including:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>End-to-end encryption for all data in transit (HTTPS/TLS).</li>
              <li>Encrypted password storage using bcrypt.</li>
              <li>Secure JWT-based authentication.</li>
              <li>Regular security audits and updates.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg mb-3">5. DPDP Act 2023 Compliance</h2>
            <p className="mb-2">BuddhAI is fully compliant with India's Digital Personal Data Protection Act 2023. As a Data Fiduciary, we:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Obtain explicit consent before collecting personal data.</li>
              <li>Process data only for specified, lawful purposes.</li>
              <li>Implement reasonable security safeguards.</li>
              <li>Notify users within 72 hours of any data breach.</li>
              <li>Honor data deletion requests within 30 days.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg mb-3">6. Your Rights</h2>
            <p className="mb-2">Under the DPDP Act 2023, you have the right to:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong className="text-white">Access:</strong> Request a copy of your personal data we hold.</li>
              <li><strong className="text-white">Correction:</strong> Request correction of inaccurate data.</li>
              <li><strong className="text-white">Deletion:</strong> Request deletion of your personal data.</li>
              <li><strong className="text-white">Grievance:</strong> Lodge a complaint with our Data Protection Officer.</li>
            </ul>
            <p className="mt-2">To exercise these rights, email us at: <span className="text-blue-400">privacy@buddhai.in</span></p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg mb-3">7. Third-Party Services</h2>
            <p>We use the following third-party services to operate BuddhAI:</p>
            <ul className="space-y-2 list-disc list-inside mt-2">
              <li><strong className="text-white">Anthropic Claude API:</strong> Powers our AI chat responses. Data may be processed on Anthropic's servers.</li>
              <li><strong className="text-white">Vercel:</strong> Frontend hosting platform.</li>
              <li><strong className="text-white">Railway:</strong> Backend and database hosting.</li>
              <li><strong className="text-white">Razorpay:</strong> Payment processing (PCI-DSS compliant).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg mb-3">8. Data Retention</h2>
            <p>We retain your data for as long as your account is active. Upon account deletion, we will delete your data within 30 days, except where required by law.</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg mb-3">9. Contact Us</h2>
            <p>For any privacy-related queries or to exercise your rights:</p>
            <div className="mt-2 bg-gray-900 rounded-xl p-4 space-y-1">
              <p><strong className="text-white">BuddhAI Technologies</strong></p>
              <p>Email: <span className="text-blue-400">privacy@buddhai.in</span></p>
              <p>Website: <span className="text-blue-400">budhai-frontend.vercel.app</span></p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}