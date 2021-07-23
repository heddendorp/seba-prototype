import {io} from "socket.io-client";
import {StudyGroupService} from "@seba/api-services";
import {useChatContext} from "../../../context/src/lib/chat-context";

export enum SyncEvent {
  PLAY,
  PAUSE
}

export async function createStudyGroup(student_id: string) {
  const response = await StudyGroupService.create({student_id: student_id})

  if (response.message !== "Success.")
    throw new Error(response.message);

  return new StudyGroup(response.group_id);
}

export async function joinStudyGroup(student_id: string, group_id: string) {
  const response = await StudyGroupService.join({student_id: student_id, group_id: group_id});
  const body = await response.json();

  if (body.message !== "Success.")
    throw new Error(body.message);

  return new StudyGroup(group_id);
}

export class StudyGroup {
  public static BASE_SOCKET_URL = "ws://localhost:4444";

  private socket;

  public readonly group_id: string;
  public readonly messages;

  public constructor(group_id: string) {
    this.group_id = group_id;
    this.messages = [];

    this.socket = io(StudyGroup.BASE_SOCKET_URL);

    // Connect to socket.io room
    this.socket.emit("groupConnect", group_id);

    this.socket.on("message", data => {
      this.messages.push(data);
    })

    this.socket.on("sync", syncEvent => {
      const videoElement = document.getElementById("video_stream");

      switch (+syncEvent) {
        case SyncEvent.PLAY:
          videoElement.play();
          break;
        case SyncEvent.PAUSE:
          videoElement.pause();
          break;
        default:
          throw new Error("Not implemented");
      }
    });
  }

  public sendMessage(author: string, message: string) {
    this.socket.emit("message", {
      group_id: this.group_id,
      author: author,
      message: message
    });
  }

  public sendSyncEvent(syncEvent: SyncEvent) {
    this.socket.emit("sync", {
      group_id: this.group_id,
      syncEvent: syncEvent,
    })
  }
}
