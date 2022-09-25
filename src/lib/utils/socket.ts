export function InitSocket(url: string) {
  try {
    const socket = new WebSocket(url);

    return socket;
  } catch (error) {
    console.log("error", error);
    console.log(JSON.stringify(error));
  }
}
