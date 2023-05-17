/* eslint-disable @next/next/no-img-element */
"use client";

import Toast from "@/components/toast/Toast";
import { uploadImageToCloudinary } from "@/lib/functions/uploadImage";
import UploadIcon from "@components/icons/uploadIcon/UploadIcon";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { PostFormValues, PostStepEnum } from "./Post";
import ArrowIcon from "@/components/icons/arrowIcon/ArrowIcon";
import Subtitle from "@/components/subtitle/Subtitle";
import CheckIcon from "@/components/icons/checkIcon/CheckIcon";
import Spinner from "@/components/spinner/Spinner";
import { UseFormHandleSubmit, UseFormReset } from "react-hook-form";
import { PostUploadType } from "@/app/api/upload/route";
import { usePostComponent } from "@/hooks/post/post_hooks";
import { useSidebar } from "@/hooks/sidebar/sidebar_hook";

type ImageFieldProps = {
  setStep: Dispatch<SetStateAction<PostStepEnum>>;
  handleSubmit: UseFormHandleSubmit<PostFormValues>;
  reset: UseFormReset<PostFormValues>;
};

const ImageField = ({ setStep, handleSubmit, reset }: ImageFieldProps) => {
  const postCloseOnPressed = usePostComponent(
    (state) => state.togglePostComponent
  );
  const sidebarCloseOnPressed = useSidebar((state) => state.toggleSideBar);

  const [image, setImage] = useState<{
    previews: string[];
    images: File[] | null;
  }>({
    previews: [],
    images: null,
  });

  const [upload, setUpload] = useState({
    success: false,
    error: "",
    loading: false,
  });

  const router = useRouter();

  const handleImage = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const imageBlobs: string[] = [];

    files.forEach((file) => {
      console.log(files);
      const imgSrc = URL.createObjectURL(file);
      console.log(imgSrc);

      imageBlobs.push(imgSrc);
    });

    setImage({ previews: imageBlobs, images: files! });
  }, []);

  const onSave = useCallback(
    async (data: PostFormValues) => {
      setUpload((prev) => ({ ...prev, loading: true }));

      try {
        const secureUrls = await uploadImageToCloudinary(image.images!);

        setUpload((prev) => ({ ...prev, success: true }));

        const product: PostUploadType = {
          ...data,
          previewImages: secureUrls,
        };

        await Post(JSON.stringify(product), "/api/upload", {
          "Content-Type": "application/json",
        });

        router.refresh();

        postCloseOnPressed(false);
        sidebarCloseOnPressed();
      } catch (e: unknown) {
        if (typeof e === "string") {
          setUpload((prev) => ({ ...prev, error: e as string }));
        }

        setUpload((prev) => ({ ...prev, error: (e as any).toString() }));

        setTimeout(() => {
          setUpload({ error: "", loading: false, success: false });
        }, 2000);
      } finally {
        setUpload((prev) => ({ ...prev, loading: false }));
        reset();
      }
    },
    [image.images, postCloseOnPressed, reset, router, sidebarCloseOnPressed]
  );

  return (
    <>
      <section className="w-screen h-screen pb-10">
        <nav className="flex flex-col justify-center items-center">
          <label
            className="w-[80%] m-auto flex justify-center items-center border-[1px] border-stone-400 rounded-xl p-5"
            htmlFor="gallery"
          >
            {!image.previews.length ? (
              <UploadIcon width={80} height={200} />
            ) : null}

            {image.previews.length ? (
              <nav className="w-[80%] flex flex-auto justify-center items-center gap-2">
                {image.previews.map((preview, idx) => (
                  <div
                    className="border-[1px] shadow-sm border-stone-400 w-[100px] h-[100px]"
                    key={idx}
                  >
                    <img
                      className="object-cover w-full h-full"
                      src={preview}
                      alt="preview image"
                      width={100}
                      height={100}
                    />
                  </div>
                ))}
              </nav>
            ) : null}

            {upload.loading && <Toast message="uploading.." />}
          </label>
          <input
            id="gallery"
            type="file"
            multiple
            min={2}
            max={2}
            onChange={handleImage}
            accept="image/*"
            className="hidden"
          />
        </nav>

        <div className="w-full mt-3 flex justify-around items-center">
          <button
            onClick={() => setStep(PostStepEnum.FieldStep)}
            className="flex justify-around items-center gap-2 bg-stone-800 p-2 rounded-md"
          >
            <ArrowIcon
              rotate="rotate-180"
              color="#ffffff"
              width={12}
              height={12}
            />
            <Subtitle color="text-stone-100" size="text-sm">
              previous
            </Subtitle>
          </button>
          <button
            onClick={handleSubmit(onSave)}
            disabled={upload.loading}
            className="flex justify-around items-center gap-2 bg-stone-200 p-2 rounded-md"
          >
            {!upload.loading ? (
              <CheckIcon width={18} height={18} color="#1f1f1f" />
            ) : (
              <Spinner width={20} height={20} color="#fffff" />
            )}
            <Subtitle color="text-stone-800" size="text-sm">
              submit
            </Subtitle>
          </button>
        </div>
      </section>
    </>
  );
};

export default ImageField;

async function Post(
  body: BodyInit,
  url: string,
  header: Record<string, string>
) {
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: header,
      body,
    });

    if (!resp.ok) {
      throw new Error("error when try to post");
    }

    const data = (await resp.json()) as { message: string };

    return data;
  } catch (e) {
    throw new Error(e as any);
  }
}
