import { TopLevelCategory } from "./page.interface";
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PageItem {
  alias: string;
  title: string;
  _id: string;
  category: string;
}

export interface MenuItem {
  map: any;
  _id: {
    secondCategory: string;
  };
  isOpened?: boolean;
  pages: PageItem[];
}

export interface FirstLevelMenuItem {
  route: string;
  name: string;
  icon: JSX.Element;
  id: TopLevelCategory;
}
