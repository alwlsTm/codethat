export function filterByKeyword(items, keyword) {
  const lowered = keyword.toLowerCase();  //keyword 소문자화
  return items.filter(({ title }) => title.toLowerCase().includes(lowered));  //items의 title로 필터링
}