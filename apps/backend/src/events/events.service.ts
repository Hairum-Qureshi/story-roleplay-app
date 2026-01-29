import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  private socketToUserMap: Map<string, string> = new Map<string, string>();

  identifyUser(socketID: string, userID: string) {
    this.socketToUserMap.set(socketID, userID);
  }

  viewMap(): Map<string, string> {
    return this.socketToUserMap;
  }

  removeUserBySocketId(socketID: string) {
    this.socketToUserMap.delete(socketID);
  }

  getUserSocketId(userID: string): string | undefined {
    for (const [socketID, uid] of this.socketToUserMap.entries()) {
      if (uid === userID) {
        return socketID;
      }
    }

    return undefined;
  }
}
