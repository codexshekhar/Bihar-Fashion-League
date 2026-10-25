import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          width: "100%",
          height: "100%",
          background: "white",
          color: "#0a0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Bihar Fashion League
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
