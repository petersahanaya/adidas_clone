import Spinner from "../spinner/Spinner";
import Subtitle from "../subtitle/Subtitle";

type ToastProps = {
  message: string;
  spinner?: boolean;
};

const Toast = ({ message, spinner = false }: ToastProps) => {
  return (
    <div className="fixed bottom-[20px] sm:w-[370px] p-3 overflow-hidden rounded-md right-[20px] bg-stone-900 flex justify-around items-center gap-3">
      <Subtitle color="text-stone-200 text-ellipsis" size="text-sm sm:text-xl">
        {message}
      </Subtitle>
      {!spinner && (
        <Subtitle
          color="text-stone-400 text-ellipsis"
          size="sm:text-xl text-[.7rem]"
        >
          {`${new Date(Date.now()).getHours()} : ${new Date(
            Date.now()
          ).getMinutes()}`}
        </Subtitle>
      )}
      {spinner && <Spinner width={14} height={14} />}
    </div>
  );
};

export default Toast;
