export async function fetchJSONL(url: string) {
  const jsonArray: object[] = [];
  const response = await fetch(url);
  const reader = response?.body?.getReader();
  const decoder = new TextDecoder("utf-8");
  let chunk = await reader?.read();
  let result = "";

  while (!chunk?.done) {
    const text = decoder.decode(chunk?.value, { stream: true });
    result += text;
    const lines = result?.split("\n") ?? [];
    result = lines.pop() ?? ""; // In case the last chunk ends with an incomplete line
    for (const line of lines) {
      // Process each line as JSON
      try {
        const json = JSON.parse(line.trim());
        typeof json === "object" && jsonArray.push(json);
      } catch (error) {
        console.error("Error parsing JSON: ", error);
      }
    }
    chunk = await reader?.read();
  }

  // Process the remaining chunk
  const text = decoder.decode(chunk.value, { stream: true });
  if (text) {
    result += text;
  }

  return jsonArray;
}
