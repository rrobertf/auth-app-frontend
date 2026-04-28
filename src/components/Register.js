import React, { useState } from 'react';

function Register({ onRegister, onSwitchToLogin, loading }) {
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const validateStep0 = () => {
    const e = {};
    if (!username || username.trim().length < 2) e.username = 'Por favor ingresa tu nombre completo';
    if (!email) e.email = 'Por favor ingresa tu email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Email inválido';
    return e;
  };

  const validateStep1 = () => {
    const e = {};
    if (!password) e.password = 'Crea una contraseña segura';
    else if (password.length < 6) e.password = 'Mínimo 6 caracteres';
    if (!terms) e.terms = 'Debes aceptar los términos';
    return e;
  };

  const handleNext = (ev) => {
    ev.preventDefault();
    const errs = validateStep0();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep(1);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const errs = validateStep1();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onRegister(username, email, password);
  };

  const sideContent = (
    <div>
      <div style={{
        fontFamily: 'Instrument Serif, serif',
        fontSize: 44,
        lineHeight: 1.05,
        color: 'var(--fg)',
        letterSpacing: '-0.02em',
        marginBottom: 20,
      }}>
        Comienza<br />
        <em style={{ color: 'var(--accent)' }}>tu viaje seguro.</em>
      </div>
      <p style={{
        fontSize: 15,
        lineHeight: 1.55,
        color: 'var(--fg-muted)',
        marginBottom: 32,
      }}>
        Crea tu cuenta gratis. Sin tarjeta de crédito. Protección de datos garantizada.
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[
          'Encriptación JWT de grado empresarial',
          'Autenticación segura de dos pasos',
          'Protección contra SQL injection',
          'Soporte prioritario 24/7',
        ].map((feature) => (
          <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'var(--fg)' }}>
            <span style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2 2 4-4" stroke="var(--accent-fg)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--bg)',
      color: 'var(--fg)',
      fontFamily: 'inherit',
    }}>
      <div style={{
        flex: 1,
        padding: '48px 60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'var(--bg)',
        borderRight: '1px solid var(--border)',
      }}>
        {sideContent}
      </div>

      <div style={{
        flex: 1,
        padding: '48px 60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'var(--bg-elev)',
        animation: 'fadeIn 0.4s ease',
      }}>
        <div style={{ maxWidth: 320, margin: '0 auto', width: '100%' }}>
          <Logo />

          <h1 style={{
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--fg)',
            margin: '28px 0 6px 0',
          }}>
            {step === 0 ? 'Crea tu cuenta' : 'Protege tu cuenta'}
          </h1>
          <p style={{
            fontSize: 14,
            color: 'var(--fg-muted)',
            margin: '0 0 28px 0',
            lineHeight: 1.5,
          }}>
            {step === 0
              ? 'Únete a usuarios que confían en SecureAuth.'
              : 'Una contraseña fuerte es tu primera línea de defensa.'}
          </p>

          <form onSubmit={step === 0 ? handleNext : handleSubmit} noValidate>
            {step === 0 ? (
              <>
                <TextField
                  label="Nombre completo"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) setErrors({ ...errors, username: undefined });
                  }}
                  error={errors.username}
                  autoComplete="name"
                  autoFocus
                  name="username"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M3 12.5c0-2.5 2-4 5-4s5 1.5 5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  }
                />

                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  error={errors.email}
                  autoComplete="email"
                  name="email"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="2" y="3.5" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M2.5 5l5.5 4 5.5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  }
                />

                <Button type="submit" fullWidth>
                  Siguiente
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
              </>
            ) : (
              <>
                <TextField
                  label="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  error={errors.password}
                  autoComplete="new-password"
                  name="password"
                  autoFocus
                  icon={
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="3" y="7" width="10" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  }
                />

                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 8,
                  fontSize: 13,
                  color: 'var(--fg-muted)',
                  cursor: 'pointer',
                  marginBottom: 22,
                  userSelect: 'none',
                }}>
                  <input
                    type="checkbox"
                    checked={terms}
                    onChange={(e) => {
                      setTerms(e.target.checked);
                      if (errors.terms) setErrors({ ...errors, terms: undefined });
                    }}
                    style={{ accentColor: 'var(--accent)', width: 14, height: 14, cursor: 'pointer', marginTop: 3, flexShrink: 0 }}
                  />
                  <span>
                    Acepto los términos de servicio y la política de privacidad
                  </span>
                </label>

                {errors.terms && (
                  <div style={{
                    fontSize: 12,
                    color: 'var(--danger)',
                    marginBottom: 16,
                    animation: 'fadeIn 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" />
                      <path d="M6 3v3.5M6 8.5v.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    {errors.terms}
                  </div>
                )}

                <Button type="submit" fullWidth loading={loading}>
                  {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>

                <button
                  type="button"
                  onClick={() => setStep(0)}
                  style={{
                    width: '100%',
                    marginTop: 8,
                    padding: '12px 16px',
                    background: 'transparent',
                    color: 'var(--fg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  ← Atrás
                </button>
              </>
            )}
          </form>

          <div style={{
            marginTop: 24,
            paddingTop: 20,
            borderTop: '1px solid var(--border)',
            fontSize: 13,
            color: 'var(--fg-muted)',
            textAlign: 'center',
          }}>
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={onSwitchToLogin}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: 13,
                padding: 0,
              }}
            >
              Inicia sesión →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function TextField({ label, type = 'text', value, onChange, error, autoComplete, autoFocus, icon, name }) {
  const [focused, setFocused] = React.useState(false);
  const [showPwd, setShowPwd] = React.useState(false);
  const isPwd = type === 'password';
  const effType = isPwd && showPwd ? 'text' : type;
  const filled = value && value.length > 0;

  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{
        display: 'block',
        fontSize: 12,
        fontWeight: 500,
        color: 'var(--fg-muted)',
        marginBottom: 7,
        letterSpacing: '0.01em',
      }}>
        {label}
      </label>
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--bg-elev)',
        border: `1px solid ${error ? 'var(--danger)' : focused ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 'var(--radius)',
        transition: 'all 0.15s ease',
        boxShadow: focused ? `0 0 0 3px color-mix(in oklch, var(--accent) 15%, transparent)` : 'none',
      }}>
        {icon && (
          <span style={{
            paddingLeft: 12,
            color: 'var(--fg-subtle)',
            display: 'flex',
            alignItems: 'center',
          }}>
            {icon}
          </span>
        )}
        <input
          name={name}
          type={effType}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          style={{
            flex: 1,
            padding: '12px 14px',
            paddingLeft: icon ? 8 : 14,
            fontSize: 14,
            color: 'var(--fg)',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            borderRadius: 'var(--radius)',
          }}
        />
        {isPwd && filled && (
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0 12px',
              color: 'var(--fg-muted)',
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {showPwd ? 'Ocultar' : 'Mostrar'}
          </button>
        )}
      </div>
      {error && (
        <div style={{
          fontSize: 12,
          color: 'var(--danger)',
          marginTop: 6,
          animation: 'fadeIn 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" />
            <path d="M6 3v3.5M6 8.5v.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}

function Button({ children, onClick, type = 'button', loading, disabled, fullWidth }) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={loading || disabled}
      style={{
        width: fullWidth ? '100%' : 'auto',
        padding: '12px 16px',
        background: 'var(--accent)',
        color: 'var(--accent-fg)',
        border: '1px solid var(--accent)',
        borderRadius: 'var(--radius)',
        fontSize: 14,
        fontWeight: 600,
        cursor: loading || disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        transition: 'all 0.15s ease',
        opacity: loading || disabled ? 0.6 : 1,
      }}
      onMouseEnter={(e) => {
        if (!loading && !disabled) {
          e.currentTarget.style.background = 'color-mix(in oklch, var(--accent) 85%, black)';
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        }
      }}
      onMouseLeave={(e) => {
        if (!loading && !disabled) {
          e.currentTarget.style.background = 'var(--accent)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      {loading ? (
        <>
          <span style={{
            display: 'inline-block',
            width: 14,
            height: 14,
            borderRadius: '50%',
            border: '2px solid var(--accent-fg)',
            borderTopColor: 'transparent',
            animation: 'spin 0.6s linear infinite',
          }} />
        </>
      ) : (
        children
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}

function Logo({ small }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={small ? 24 : 28} height={small ? 24 : 28} viewBox="0 0 32 32" fill="none" style={{ display: 'block' }}>
        <rect x="2" y="2" width="28" height="28" rx="8" fill="var(--accent)" />
        <path d="M10 16 L14 20 L22 12" stroke="var(--accent-fg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      <span style={{
        fontSize: small ? 15 : 17,
        fontWeight: 600,
        letterSpacing: '-0.01em',
        color: 'var(--fg)',
      }}>
        SecureAuth
      </span>
    </div>
  );
}

export default Register;