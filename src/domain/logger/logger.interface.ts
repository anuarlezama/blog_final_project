export interface iLogger {
  debug(context: string, message: string): void;
  log(context: string, message: string): void;
  error(context: string, message: string, stack: string): void;
  warn(context: string, message: string): void;
  verbose(context: string, message: string): void;
}