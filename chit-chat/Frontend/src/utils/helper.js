export function searchPatternMatch(matchThis,toThis) {
  if (matchThis === "") return true;
  else {
    // 'i' is for case insensitive
    const pattern = new RegExp(`${matchThis}`, "i");
    // console.log(item.username.toLowerCase().match(pattern));
    return toThis.toLowerCase().match(pattern);
  }
}
