import { memo } from "react";

//날짜 변환
function DateText({ value }) {
  if (!value) return;
  return new Date(value).toLocaleDateString('ko-KR');
}

export default memo(DateText);