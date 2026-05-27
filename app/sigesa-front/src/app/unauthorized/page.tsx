import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Acceso no autorizado</h1>
      <p className="mt-2 max-w-md text-sm text-gray-600">
        Tu rol no tiene permiso para acceder a esta vista del MVP. Contacta a la
        Jefatura DUEA si necesitas acceso.
      </p>
      <Link
        href="/login"
        className="mt-6 text-sm text-blue-600 underline hover:text-blue-800"
      >
        Volver al inicio de sesión
      </Link>
    </div>
  );
}
