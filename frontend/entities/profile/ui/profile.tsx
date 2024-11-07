import { IProfile } from "@/entities/profile";
import BaseProfile from "./base-profile";
import DetailedProfile from "./detailed-profile";

interface Props {
  type: "base" | "detailed";
  profile?: IProfile;
}

export function Profile({ type, profile }: Props) {
  return (
    <>
      {type === "base" && <BaseProfile />}
      {type === "detailed" && profile && <DetailedProfile profile={profile} />}
    </>
  );
}
