import { lazy, Suspense, useState } from 'react';
import { ArrowLeft, Loader2, QrCode } from 'lucide-react';
const Scanner = lazy(() => import('./Scanner'));

interface Props {
  onLogin: (term: string) => void;
  loginError: string | null;
  isLoggingIn: boolean;
}

export function LoginView({ onLogin, loginError, isLoggingIn }: Props) {
  const [manualId, setManualId] = useState('');
  const [scanning, setScanning] = useState(false);

  const submit = () => {
    const id = manualId.trim();
    if (id) onLogin(id);
  };

  if (scanning) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="p-3">
          <button
            onClick={() => setScanning(false)}
            className="p-2 hover:bg-surface-variant rounded-md"
            aria-label="Volver"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
        <div className="flex-1">
          <Suspense fallback={<div className="p-6 text-center text-on-surface-variant">Cargando escáner…</div>}>
            <Scanner
              onResult={(code) => {
                setScanning(false);
                onLogin(code);
              }}
            />
          </Suspense>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-2xl italic font-bold">Barrioteca Acalencá</h1>
      <p className="mt-2 text-sm text-on-surface-variant">
        Identifícate para gestionar tus préstamos.
      </p>

      <div className="w-full max-w-sm mt-8 space-y-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="login-id" className="text-sm font-semibold">
            ID de socia
          </label>
          <input
            id="login-id"
            type="text"
            value={manualId}
            onChange={(e) => setManualId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="ID de socia"
            aria-invalid={!!loginError}
            aria-describedby={loginError ? 'login-error' : undefined}
            className={`w-full bg-surface border rounded-md px-4 py-3 text-base outline-none focus:ring-2 focus:ring-primary ${
              loginError ? 'border-error focus:ring-error' : 'border-outline'
            }`}
          />
          {loginError && (
            <p id="login-error" className="text-sm text-error" aria-live="polite">
              {loginError}
            </p>
          )}
        </div>

        <button
          onClick={submit}
          disabled={isLoggingIn || !manualId.trim()}
          className="w-full bg-primary text-on-primary py-3 rounded-md font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoggingIn ? <Loader2 className="animate-spin" size={18} /> : 'Entrar'}
        </button>

        <div className="text-center text-xs text-on-surface-variant">o</div>

        <button
          onClick={() => setScanning(true)}
          disabled={isLoggingIn}
          className="w-full border border-primary text-primary py-3 rounded-md font-semibold flex items-center justify-center gap-2"
        >
          <QrCode size={18} />
          Escanear carné (QR o código de barras)
        </button>

      </div>
    </div>
  );
}
