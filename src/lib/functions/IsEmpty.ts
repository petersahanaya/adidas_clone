import { PostFormValues } from "@/app/homepage/post/Post";

export function isEmpty(value: PostFormValues): boolean {
  if (
    value?.title &&
    value?.stock &&
    value?.description &&
    value?.price &&
    value?.size?.value !== "UNKNOWN" &&
    value?.type?.value !== "UNKNOWN" &&
    value?.category?.value !== "UNKNOWN"
  )
    return false;

  return true;
}
