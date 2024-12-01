import { LOCALE, SITE } from "@config";
import type { CollectionEntry } from "astro:content";

interface DatetimesProps {
  pubDatetime: string | Date;
  modDatetime: string | Date | undefined | null;
}

interface EditPostProps {
  editPost?: CollectionEntry<"blog">["data"]["editPost"];
  postId?: CollectionEntry<"blog">["id"];
}

interface Props extends DatetimesProps, EditPostProps {
  size?: "sm" | "lg";
  className?: string;
}

export default function Datetime({
  pubDatetime,
  modDatetime,
  size = "sm",
  className = "",
  editPost,
  postId,
}: Props) {
  return (
    <div
      className={`flex items-center space-x-2 opacity-80 ${className}`.trim()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          size === "sm" ? "scale-90" : "scale-100"
        } inline-block h-6 w-6 min-w-[1.375rem] fill-skin-base`}
        aria-hidden="true"
      >
        <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z" />
        <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z" />
      </svg>
      {modDatetime && modDatetime > pubDatetime ? (
        <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
          Updated:
        </span>
      ) : (
        <span className="sr-only">Published:</span>
      )}
      <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
        <FormattedDatetime
          pubDatetime={pubDatetime}
          modDatetime={modDatetime}
        />
        {size === "lg" && <EditPost editPost={editPost} postId={postId} />}
      </span>
    </div>
  );
}

const FormattedDatetime = ({ pubDatetime, modDatetime }: DatetimesProps) => {
  const myDatetime = new Date(
    modDatetime && modDatetime > pubDatetime ? modDatetime : pubDatetime
  );

  const date = myDatetime.toLocaleDateString([...LOCALE.langTag, 'zh-CN'], {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Shanghai"
  });

  const time = myDatetime.toLocaleTimeString([...LOCALE.langTag, 'zh-CN'], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Shanghai"
  });

  return (
    <>
      <time dateTime={myDatetime.toLocaleString('en', { timeZone: 'Asia/Shanghai' })}>{date}</time>
      <span aria-hidden="true"> | </span>
      <span className="sr-only">&nbsp;at&nbsp;</span>
      <span className="text-nowrap">{time}</span>
    </>
  );
};

const EditPost = ({ editPost, postId }: EditPostProps) => {
  let editPostUrl = editPost?.url ?? SITE?.editPost?.url ?? "";
  const showEditPost = !editPost?.disabled && editPostUrl.length > 0;
  const appendFilePath =
    editPost?.appendFilePath ?? SITE?.editPost?.appendFilePath ?? false;
  if (appendFilePath && postId) {
    editPostUrl += `/${postId}`;
  }
  const editPostText = editPost?.text ?? SITE?.editPost?.text ?? "Edit";

  return (
    showEditPost && (
      <>
        <span aria-hidden="true"> | </span>
        <a
          className="hover:opacity-75"
          href={editPostUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          {editPostText}
        </a>
      </>
    )
  );
};
