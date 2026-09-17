import { io } from "socket.io-client";

console.log("Trying to connect socket io....")
const socket = io(import.meta.env.VITE_SOCKET_URL, {
  withCredentials: true,
});

export default socket