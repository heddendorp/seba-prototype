import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {ILecture} from "@seba/models";
import {LectureService} from "@seba/api-services";

type LectureProviderProps = { children: ReactNode }
type State = {
  lectures: [ILecture] | undefined,
  updateLectures: () => void
}

const LectureContext = createContext<State | undefined>(undefined);

export function LectureProvider({children}: LectureProviderProps) {
  const [lectures, setLectures] = useState<[ILecture]>();

  function updateLectures() {
    LectureService.getAll().then(updated_lectures => setLectures([...updated_lectures]));
  }

  useEffect(() => {
    updateLectures();
  }, []);

  return (
    <LectureContext.Provider value={{lectures: lectures, updateLectures: updateLectures}}>
      {children}
    </LectureContext.Provider>
  )
}

export function useLectureContext() {
  const context = useContext(LectureContext);
  if (context === undefined) {
    throw new Error("useLectures must be used within a LectureProvider");
  }
  return context;
}
