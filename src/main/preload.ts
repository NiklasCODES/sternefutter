import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { CREATE_CUSTOMER, READ_CUSTOMER } from '../ipc-strings';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    createCustomer(channel: string, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    readCustomer(args: unknown[]) {
      ipcRenderer.send("READ_CUSTOMER", args);
    },
    initDBClient(channel: string, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
