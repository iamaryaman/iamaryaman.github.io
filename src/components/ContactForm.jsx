import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ContactForm.module.css';

// Organic SVG blob shape for background corner decoration
function BlobShape({ className }) {
  return (
    <svg className={className} viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 60,160 C 60,80 80,30 160,30 C 240,30 290,80 290,160 C 290,230 240,290 160,290 C 80,290 60,240 60,160 Z"
        style={{ fill: 'currentColor' }}
      />
    </svg>
  );
}

const fieldVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.09, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

const infoVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.3, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ContactForm({ socialLinks }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('email', formData.email);
    formDataToSubmit.append('phone', formData.phone);
    formDataToSubmit.append('message', formData.message);
    
    // IMPORTANT: Replace this with your Web3Forms access key
    // Get your free key at https://web3forms.com by entering your email (aryamansharma2511@gmail.com)
    formDataToSubmit.append('access_key', '7ee3b780-3a68-4036-b087-56781f0de587');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSubmit
      });
      
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        console.error('Error submitting form:', data);
        alert('Failed to send message. Please replace YOUR_WEB3FORMS_ACCESS_KEY_HERE in ContactForm.jsx with a real key from web3forms.com.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message due to network error.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={styles.contactRoot}>
      {/* Organic decorative blobs */}
      <BlobShape className={`${styles.blob} ${styles.blobTopLeft}`} />
      <BlobShape className={`${styles.blob} ${styles.blobBottomRight}`} />

      <div className={styles.grid}>
        {/* ─── LEFT: FORM ─── */}
        <div className={styles.formSide}>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Hello, nice to meet you!
          </motion.h2>

          {submitted ? (
            <motion.div
              className={styles.successMsg}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p>Message sent! I'll be in touch soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              {[
                { name: 'name', label: "WHAT'S YOUR NAME?", type: 'text', placeholder: 'Jane Smith', required: true },
                { name: 'email', label: "WHAT'S YOUR EMAIL?", type: 'email', placeholder: 'jane@company.com', required: true },
                { name: 'phone', label: "WHAT'S YOUR PHONE NUMBER?", type: 'tel', placeholder: '+1 (555) 000-0000', required: false },
              ].map((field, i) => (
                <motion.div
                  key={field.name}
                  className={styles.fieldGroup}
                  custom={i}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label className={styles.fieldLabel} htmlFor={`cf-${field.name}`}>
                    {field.label}
                  </label>
                  <input
                    id={`cf-${field.name}`}
                    className={styles.fieldInput}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                </motion.div>
              ))}

              <motion.div
                className={styles.fieldGroup}
                custom={3}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
              >
                <label className={styles.fieldLabel} htmlFor="cf-message">
                  Talk to Me
                </label>
                <textarea
                  id="cf-message"
                  className={`${styles.fieldInput} ${styles.textarea}`}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="We're building a SaaS platform that..."
                  rows={4}
                  required
                />
              </motion.div>

              <motion.div
                custom={4}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
              >
                <button
                  type="submit"
                  className={styles.sendBtn}
                  disabled={sending}
                  id="cf-send"
                >
                  {sending ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>
                      <span>SEND</span>
                      <div className={styles.sendArrow}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          )}
        </div>

        {/* ─── RIGHT: INFO BOX ─── */}
        <motion.div
          className={styles.infoBox}
          variants={infoVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.infoInner}>
            <p className={styles.infoLabel}>BASED IN</p>
            <p className={styles.infoValue}>New Delhi, India 🇮🇳</p>

            <div className={styles.infoDivider} />

            <p className={styles.infoLabel}>PHONE</p>
            <a href="tel:+919667669912" className={styles.infoLink}>+919667669912</a>

            <div className={styles.infoDivider} />

            <p className={styles.infoLabel}>EMAIL</p>
            <a href="mailto:aryamansharma2511@gmail.com" className={styles.infoLink}>
              aryamansharma2511@gmail.com
            </a>

            <div className={styles.infoDivider} />

            <p className={styles.infoLabel}>FIND ME ON</p>
            <div className={styles.infoSocials}>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className={styles.infoSocialLink}
                >
                  {link.label}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
