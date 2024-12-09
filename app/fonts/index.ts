import localFont from "next/font/local";

export const YSTextWide = localFont({
  src: [
    {
      path: "./YSTextWide-Black.woff",
      weight: "900",
      style: "normal",
    },
    {
      path: "./YSTextWide-BlackItalic.woff",
      weight: "900",
      style: "italic",
    },
    {
      path: "./YSTextWide-Heavy.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "./YSTextWide-HeavyItalic.woff",
      weight: "800",
      style: "italic",
    },
    {
      path: "./YSTextWide-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./YSTextWide-RegularItalic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "./YSText-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./YSTextWide-RegularItalic.woff",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-YS-text-wide",
});

export const YSText = localFont({
  src: [
    {
      path: "./YSText-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./YSText-RegularItalic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "./YSText-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./YSText-LightItalic.woff",
      weight: "300",
      style: "italic",
    },
  ],
  variable: "--font-YS-text",
});
