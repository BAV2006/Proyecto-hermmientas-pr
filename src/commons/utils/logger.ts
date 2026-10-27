interface ILogger {
  error: Error;
  module: string;
}

export function logger({ error, module }: ILogger) {
  console.error(`[${module}] ${error.message}`);
}
