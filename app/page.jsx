import CampusLife from './campus-life/page'
import { IT_MAIN_DATA } from "./data/it-main";

export const metadata = {
  title: IT_MAIN_DATA.meta.title,
  description: IT_MAIN_DATA.meta.description,
  keywords: IT_MAIN_DATA.meta.keywords,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <CampusLife
      bodyClass={IT_MAIN_DATA.meta.bodyClass}
      stylesheets={IT_MAIN_DATA.meta.stylesheets}
      fontPreloads={IT_MAIN_DATA.meta.fontPreloads}
    />
  );
}
