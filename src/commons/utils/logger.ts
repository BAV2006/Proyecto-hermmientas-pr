interface ILogger {
  error: Error;
  module: string;
}

// Registra los errores del servidor en la terminal (nunca se envían al navegador)
export function logger({ error, module }: ILogger) {
  const detail = process.env.NODE_ENV === 'production' ? error.message : error.stack ?? error.message;
  console.error(`[${new Date().toISOString()}] [${module}]`, detail);
}
