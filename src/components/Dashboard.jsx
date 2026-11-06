import React from 'react';

function Dashboard({ user, onLogout }) {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--bg)',
      color: 'var(--fg)',
      fontFamily: 'inherit',
    }}>
      <div style={{
        width: 280,
        padding: '40px 32px',
        background: 'var(--bg-elev)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
      }}>
        <Logo small />

        <div style={{ flex: 1, marginTop: 48 }}>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--fg-subtle)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 12,
            paddingLeft: 8,
          }}>
            Navegación
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { icon: <DashboardIcon />, label: 'Dashboard' },
              { icon: <SecurityIcon />, label: 'Seguridad' },
              { icon: <SettingsIcon />, label: 'Configuración' },
            ].map((item) => (
              <button
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 12px',
                  width: '100%',
                  background: item.label === 'Dashboard' ? 'color-mix(in oklch, var(--accent) 15%, transparent)' : 'transparent',
                  color: item.label === 'Dashboard' ? 'var(--accent)' : 'var(--fg-muted)',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'left',
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div style={{
          padding: 12,
          background: 'color-mix(in oklch, var(--accent) 8%, transparent)',
          borderRadius: 'var(--radius)',
          border: '1px solid color-mix(in oklch, var(--accent) 30%, transparent)',
        }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent), color-mix(in oklch, var(--accent) 60%, white))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-fg)',
              fontWeight: 600,
              fontSize: 14,
            }}>
              {user.username.substring(0, 2).toUpperCase()}
            </div>
          </div>

          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', marginBottom: 2 }}>
            {user.username}
          </div>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginBottom: 12 }}>
            {user.email}
          </div>

          <button
            onClick={onLogout}
            style={{
              width: '100%',
              padding: '8px 12px',
              background: 'transparent',
              color: 'var(--danger)',
              border: '1px solid color-mix(in oklch, var(--danger) 30%, transparent)',
              borderRadius: 'var(--radius)',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <div style={{
        flex: 1,
        padding: '48px 60px',
        overflowY: 'auto',
        maxHeight: '100vh',
      }}>
        <div style={{ maxWidth: 1000 }}>
          <div style={{ marginBottom: 48 }}>
            <h1 style={{
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--fg)',
              margin: '0 0 8px 0',
            }}>
              Bienvenido, <span style={{ color: 'var(--accent)' }}>{user.username}</span>
            </h1>
            <p style={{
              fontSize: 15,
              color: 'var(--fg-muted)',
              margin: 0,
            }}>
              Tu cuenta está segura y protegida con encriptación de grado empresarial.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
            marginBottom: 48,
          }}>
            <StatCard
              label="Estado de seguridad"
              value="Óptimo"
              description="Tu cuenta está protegida"
              icon={<ShieldIcon />}
            />
            <StatCard
              label="Autenticación"
              value="JWT Activo"
              description="Token válido y seguro"
              icon={<CheckIcon />}
            />
            <StatCard
              label="Última autenticación"
              value="Ahora"
              description="Sesión actual activa"
              icon={<ClockIcon />}
            />
          </div>

          <div style={{
            background: 'var(--bg-elev)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 32,
            marginBottom: 32,
          }}>
            <h2 style={{
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color: 'var(--fg)',
              margin: '0 0 24px 0',
            }}>
              Información de tu cuenta
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 32,
            }}>
              <InfoField label="Usuario" value={user.username} />
              <InfoField label="Email" value={user.email} />
              <InfoField label="Tipo de cuenta" value="Segura" />
              <InfoField label="Miembro desde" value={new Date().toLocaleDateString('es-ES')} />
            </div>
          </div>

          <div style={{
            background: 'var(--bg-elev)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 32,
          }}>
            <h2 style={{
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color: 'var(--fg)',
              margin: '0 0 24px 0',
            }}>
              Características de seguridad
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 16,
            }}>
              {[
                { icon: <LockIcon />, title: 'Hash bcrypt' },
                { icon: <TokenIcon />, title: 'Tokens JWT' },
                { icon: <ServerIcon />, title: 'Full-Stack' },
                { icon: <CheckCircleIcon />, title: 'Producción' },
              ].map((feature) => (
                <div
                  key={feature.title}
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    padding: 16,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ marginBottom: 8 }}>
                    {feature.icon}
                  </div>
                  <div style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--fg)',
                  }}>
                    {feature.title}
                  </div>
                </div>
              ))}
            </div>
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

function StatCard({ label, value, description, icon }) {
  return (
    <div style={{
      background: 'var(--bg-elev)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: 24,
      animation: 'fadeIn 0.4s ease',
    }}>
      <div style={{
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--fg-subtle)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: 12,
      }}>
        {label}
      </div>
      <div style={{
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'var(--fg)',
        marginBottom: 8,
      }}>
        {value}
      </div>
      <div style={{
        fontSize: 13,
        color: 'var(--fg-muted)',
      }}>
        {description}
      </div>
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div>
      <div style={{
        fontSize: 11,
        fontWeight: 600,
        color: 'var(--fg-subtle)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: 8,
      }}>
        {label}
      </div>
      <div style={{
        fontSize: 16,
        fontWeight: 600,
        color: 'var(--accent)',
      }}>
        {value}
      </div>
    </div>
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

// Icon components
function DashboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function SecurityIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L3 3.5V7.5C3 11.5 8 14 8 14C8 14 13 11.5 13 7.5V3.5L8 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 1v2M8 13v2M15 8h-2M2 8H1M12.9 3.1L11.5 4.5M4.5 11.5L3.1 12.9M12.9 12.9L11.5 11.5M4.5 4.5L3.1 3.1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L4 4.5V9C4 13 10 16 10 16C10 16 16 13 16 9V4.5L10 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 10L8 13L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="9" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 9V6C6 4 7 3 10 3C13 3 14 4 14 6V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function TokenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 10h6M7 13h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="14" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="3" y="12" width="14" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="6" cy="5.5" r="1" fill="currentColor" />
      <circle cx="6" cy="14.5" r="1" fill="currentColor" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default Dashboard;