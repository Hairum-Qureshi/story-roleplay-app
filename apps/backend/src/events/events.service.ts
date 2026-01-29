import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  private socketToUserMap: Map<string, number> = new Map<string, number>();

  identifyUser(socketId: string, userId: number) {
    this.socketToUserMap.set(socketId, userId);
  }

  viewMap(): Map<string, number> {
    return this.socketToUserMap;
  }

  removeUserBySocketId(socketId: string) {
    this.socketToUserMap.delete(socketId);
  }
}
