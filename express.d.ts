declare module "http" {
  interface IncomingMessage {
    user: any;
  }
}
