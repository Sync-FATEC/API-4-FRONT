// hooks/useWebSocket.ts
import { useEffect, useRef } from "react";

export interface NotificationMessage {
  type: string;
  message: string;
  data?: AlertMessageData;
}

export interface AlertMessageData {
  alertId: string;
  alertName: string;
  value: number;
}

export function useWebSocket(url: string) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      console.log("WebSocket conectado");
    };

    socketRef.current.onmessage = (event) => {
      // Parse the JSON string to get a JavaScript object
      const data = JSON.parse(event.data) as NotificationMessage;
      
      // Use the toast notification instead of alert
      if (window.addToast) {
        window.addToast(data);
      } else {
        console.warn("Toast notification system not initialized");
      }
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket erro", error);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket desconectado");
    };

    return () => {
      socketRef.current?.close();
    };
  }, [url]);

}
