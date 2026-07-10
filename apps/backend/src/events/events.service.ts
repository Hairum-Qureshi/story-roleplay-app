import { Injectable } from '@nestjs/common';
import { Editor } from 'src/types';

@Injectable()
export class EventsService {
  private socketToUserMap: Map<string, string> = new Map<string, string>();
  private notesEditorMap: Map<string, Editor> = new Map<string, Editor>();

  identifyUser(socketID: string, userID: string) {
    this.socketToUserMap.set(socketID, userID);
  }

  viewSocketToUserMap(): Map<string, string> {
    return this.socketToUserMap;
  }

  addUserToNotesEditorMap(
    userID: string,
    chatID: string,
    username: string,
  ): Editor {
    const existingEditor = this.notesEditorMap.get(chatID);

    if (existingEditor) {
      return existingEditor;
    }

    const newEditor = { userID, username };
    this.notesEditorMap.set(chatID, newEditor);
    console.log(`User ${userID} is now editing a note for chat ${chatID}`);

    return newEditor;
  }

  viewNotesEditorMap(): Map<string, Editor> {
    return this.notesEditorMap;
  }

  getNotesEditor(chatID: string): Editor | undefined {
    return this.notesEditorMap.get(chatID);
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
